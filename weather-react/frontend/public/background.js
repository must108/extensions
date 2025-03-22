chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setOptions({
        enabled: true
    });
});

chrome.action.onClicked.addListener(async () => {
    if (chrome.sidePanel.open) {
        chrome.windows.getCurrent(window => {
            chrome.sidePanel.open({ windowId: window.id })
        })
    }
});