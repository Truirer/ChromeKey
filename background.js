


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){

});



// chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//         chrome.tabs.executeScript(tab.id, {file: "program.js"});    
// });
chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if(message.loadURLNewTab){
        let newUrl = message.loadURLNewTab;
        chrome.tabs.create({ url: newUrl });
    }
    else if (message.loadURL) {
        let newUrl = message.loadURL;
        chrome.tabs.update(sender.tab.id, {url: newUrl})
    }

});


