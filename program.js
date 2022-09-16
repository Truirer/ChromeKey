let timeSettingStatic;
(function() {
    keySetup()
})();

function keySetup(){
    let keyCodeGenerator = {}
    chrome.storage.local.get("dataArray", function (result) {
        keyCodeGenerator = result.dataArray ? result.dataArray:{};
        Object.values(keyCodeGenerator).forEach(function(element,index){
            keyListener(element[0],element[1],element[2],element[4],element[5],element[6])
        })
    });
}

function keyListener(controlKeyBool,keyCodeData,keyUrl,shiftKeyBool,altKeyBool,newTab){
    console.log(newTab)
    document.addEventListener("keydown", function(event){
        let keyCodeNumber = event.which;
        let controlKeyCheck = controlKeyBool == "true" ? event.ctrlKey: !(event.ctrlKey);
        let shiftKeyCheck = shiftKeyBool == "true" ? event.shiftKey: !(event.shiftKey);
        let altKeyCheck = altKeyBool == "true" ? event.altKey: !(event.altKey)
        if(controlKeyCheck && shiftKeyCheck && altKeyCheck && keyCodeNumber == keyCodeData){
            event.preventDefault();
            if(newTab == "true"){
                console.log("55")
                chrome.runtime.sendMessage({loadURLNewTab: keyUrl});
            }
            else{
                console.log("53")

                chrome.runtime.sendMessage({loadURL: keyUrl});
            }
        }
    });
}