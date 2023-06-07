const notificationsUrl = 'https://github.com/notifications';

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "IDLE",
  });

  chrome.action.onClicked.addListener(async (tab) => {
    console.log('clicked');

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: 'RUNNING',
    });

    const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: 'IDLE',
    });
  })
});

