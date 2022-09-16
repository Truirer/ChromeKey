
document.addEventListener('DOMContentLoaded', function() {
	document.querySelector("#newPage").addEventListener('click', function() {

		chrome.tabs.create({url:chrome.runtime.getURL("local.html") }, function(tab) {
			
		}); 
	});
    document.querySelector("#checkAll").addEventListener('click', function() {

		chrome.tabs.create({url:chrome.runtime.getURL("allStocks.html") }, function(tab) {
			
		}); 
	});
});







