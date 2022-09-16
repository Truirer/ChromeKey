let timeSettingStatic;
(function() {
    keySetup()
})();

function keySetup(){
    let keyCodeGenerator = {}
    chrome.storage.local.get("dataArray", function (result) {
        keyCodeGenerator = result.dataArray ? result.dataArray:{};
        Object.values(keyCodeGenerator).forEach(function(element,index){
            keyListener(element[0],element[1],element[2],element[4])
        })
    });
}

function keyListener(controlKeyBool,keyCodeData,keyUrl,shiftKeyBool){
    console.log(controlKeyBool)
    document.addEventListener("keydown", function(event){
        let keyCodeNumber = event.which;
        let controlKeyCheck = controlKeyBool == "true" ? event.ctrlKey: !(event.ctrlKey);
        let shiftKeyCheck = shiftKeyBool == "true" ? event.shiftKey: !(event.shiftKey);
        if(controlKeyCheck && shiftKeyCheck && keyCodeNumber == keyCodeData){
            event.preventDefault();
            chrome.runtime.sendMessage({loadURL: keyUrl});
        }
    });
}