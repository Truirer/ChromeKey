


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){

});



chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    let expression  = /tradingview\.com\/chart\/ze5GXbpb\//
    let regex = new RegExp(expression);
    let currentTabUrl = tab.url;
    if (changeInfo.status == 'complete') {
        chrome.tabs.executeScript(tab.id, {file: "program.js"});    
    }
    
});
chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if (message.loadURL) {
        let newurl = "https://www.youtube.com/"
        chrome.tabs.update(sender.tab.id, {url: newurl})     
    }
});


