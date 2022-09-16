


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){

});



// chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//         chrome.tabs.executeScript(tab.id, {file: "program.js"});    
// });
chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if (message.loadURL) {
        let newurl = message.loadURL;
        chrome.tabs.update(sender.tab.id, {url: newurl})     
    }
});


