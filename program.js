let timeSettingStatic;
(function() {
    keySetup()
})();

function keySetup(){

    let keyCodeGenerator = {}
    chrome.storage.local.get("dataArray", function (result) {
        keyCodeGenerator = result.dataArray ? result.dataArray:{};
        Object.values(keyCodeGenerator).forEach(function(element,index){
            keyListener(element[0],element[1],element[2])
        })
    });
}


function keyListener(controlKeyBool,keyCodeData,keyUrl){
    console.log(controlKeyBool)
    document.addEventListener("keydown", function(event){
        let keyCodeNumber = event.keyCode;
        let controlKeyCheck = controlKeyBool ? event.ctrlKey: !event.ctrlKey;
        if(controlKeyCheck && keyCodeNumber == keyCodeData){
            console.log(controlKeyCheck,controlKeyBool)

            event.preventDefault();
            chrome.runtime.sendMessage({loadURL: keyUrl});
        }
    });
}