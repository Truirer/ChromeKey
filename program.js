let timeSettingStatic;
(function() {
    keyListener()
})();
	
function keyListener(){
    document.addEventListener("keydown", function(event){
        let keyCodeNumber = event.keyCode;
        console.log(keyCodeNumber, event.ctrlKey)
        if(event.ctrlKey && keyCodeNumber == 88){
            event.preventDefault();
            chrome.runtime.sendMessage({loadURL: true});
        }
    });
}