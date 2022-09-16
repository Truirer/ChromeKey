chromePainter()
eventClicker()
    
let currentElement;
let cacheArray;

// (function() {
//     chrome.storage.local.set({dataArray: {}}, function () {
    
//         chrome.storage.local.get('dataArray', function (result) {
//         });
//     });
// })();

function eventClicker(){
    document.querySelector(".adder").addEventListener("click",function(){
        keyAdder();
    })

    document.querySelector(".overlay").addEventListener("click",function(){
        document.querySelector(".overlay").style.opacity="0";
        document.querySelector(".overlay").style.zIndex="-1";
        eventRemover()
        chromeSaver()
    })
}

function localKeyListener(){
    document.addEventListener("keydown", keyDownListener);
    document.addEventListener("keyup", keyUpListener);
}
function eventRemover(){
    document.removeEventListener("keydown", keyDownListener);
    document.removeEventListener("keyup", keyUpListener);

}

function keyDownListener(event){
        event.preventDefault();
        let keyCodeNumber = event.keyCode;
        let keyCodeName = event.key.toUpperCase()
        let controlKeyCheck = false;
        if(keyCodeNumber == 17){
            keyCodeName = "";
        }
        if(event.ctrlKey){
            controlKeyCheck = true;
        }
        console.log(currentElement)
        document.querySelector(".overlayText").innerText = controlKeyCheck ? "CTRL "+ keyCodeName: keyCodeName;
        currentElement.innerText = controlKeyCheck ? "CTRL "+ keyCodeName: keyCodeName;
        currentElement.parentElement.dataset.jsControlKey = controlKeyCheck
        currentElement.parentElement.dataset.jsKey = keyCodeNumber;
        currentElement.parentElement.dataset.jsKeyName = keyCodeName;
}
function keyUpListener(){
    document.querySelector(".overlay").click();
}
function chromeSaver(){
    let objectGenerator;
    let keyIndex;
    let keyObject;
    let dataArray;

    chrome.storage.local.get("dataArray", function (result) {
        dataArray = result.dataArray ? result.dataArray:{} ;
        
        document.querySelectorAll(".shortcut").forEach(function(element,index){
            console.log(index,element)
            keyIndex = index;
            dataArray[keyIndex] = [element.dataset.jsControlKey,element.dataset.jsKey,element.dataset.jsUrl,element.dataset.jsKeyName];
            
        })
        console.log(dataArray)
        chrome.storage.local.set({dataArray: dataArray}, function () {
    
            chrome.storage.local.get('dataArray', function (result) {
            });
        });
    
    
    });
}

function chromePainter(){
    chrome.storage.local.get("dataArray", function (result) {
        console.log(result.dataArray)
        document.querySelector(".shortcutContainer").innerHTML = "";
        let objLength = Object.values(result.dataArray).length;
        for(let i = 0; i< objLength; i++){
            let element = Object.values(result.dataArray)[i];
            let shortcut = document.createElement("div");
            let shortcutKeyDiv = document.createElement("div");
            let shortcutUrlDiv = document.createElement("input");
            let shortcutDelete = document.createElement("button");

            shortcut.className = "shortcut";
            shortcutKeyDiv.className = "shortcutKey";
            shortcutUrlDiv.className = "shortcutUrl";
            shortcutDelete.className = "shortcutDelete";

            shortcutKeyDiv.innerText = element[0] == "true" ? "CTRL "+ element[3]: element[3];
            shortcutUrlDiv.value = element[2];
            shortcutUrlDiv.type = "url";
            


            shortcutKeyDiv.addEventListener("click",function(){
                document.querySelector(".overlay").style.opacity="1";
                document.querySelector(".overlay").style.zIndex="1";
                document.querySelector(".overlayText").innerText = this.innerText
                currentElement = this;
                localKeyListener()
            })


            shortcutUrlDiv.addEventListener("change",function(){
                this.parentElement.dataset.jsUrl = this.value
                chromeSaver()
            })

            shortcutDelete.addEventListener("click",function(){
                keyRemover(Object.keys(result.dataArray)[i])

            })


            shortcut.dataset.jsControlKey = element[0];
            shortcut.dataset.jsKey = element[1];
            shortcut.dataset.jsUrl = element[2];
            shortcut.dataset.jsKeyName = element[3];

            shortcut.appendChild(shortcutKeyDiv)
            shortcut.appendChild(shortcutUrlDiv)
            shortcut.appendChild(shortcutDelete)
            document.querySelector(".shortcutContainer").appendChild(shortcut);
        }

    });
}

function keyAdder(){
    let dataArray;
    chrome.storage.local.get("dataArray", function (result) {
        dataArray = result.dataArray ? result.dataArray:{} ;
        let dataArrayLength = Object.values(dataArray).length;
        dataArray[dataArrayLength] = [];
        chrome.storage.local.set({dataArray: dataArray}, function () {
    
            chromePainter()
        });
    });
}
function keyRemover(indexKey){
    let dataArray;
    chrome.storage.local.get("dataArray", function (result) {
        dataArray = result.dataArray ? result.dataArray:{};
        let dataArrayLength =  Object.keys(dataArray).length - 1;
        Object.keys(dataArray).forEach(function(element,index){
            if(index > indexKey){
                dataArray[index-1] = Object.values(dataArray)[index]
            }
        })
        delete dataArray[dataArrayLength] 
        console.log(dataArray)
        chrome.storage.local.set({dataArray: dataArray}, function () {
            chromePainter()
        });
    });
}