chrome.runtime.onMessage.addListener(
  function(message, sender, response) {
    clearNotifications(response);

    return true;
  }
)

function clearNotifications(response) {
  let foundStuff = false;
  let items = document.querySelectorAll('li.notifications-list-item');
  
  items.forEach((item) => {
    if (
      item.querySelector('a.avatar-user img[alt="@dependabot-preview"]') ||
      item.querySelector('a.avatar-user img[alt="@dependabot"]') ||
      item.querySelector('a.avatar-user img[alt="@renovate"]')
    ) {
      console.log('did find one');
      foundStuff = true;
      item.querySelector('input[type="checkbox"]').click();
    }
  });
  
  if (foundStuff) {
    foundStuff = false;
    console.log('found some stuff - refresh');
    document.querySelector('button[Title="Done"]').click();
    setTimeout(() => {
      clearNotifications(response)
    }, 2000);
  } else {
    console.log('found nothing, next page');
    setTimeout(() => {
      const nextButton = document.querySelector('a[aria-label="Next"]');
      if(!nextButton) {
        response('done!');
        return;
      }
      nextButton.click();
      setTimeout(() => {
        clearNotifications(response);
      }, 2000)
    }, 2000);
  }
}