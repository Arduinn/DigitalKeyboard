const keyboard = {
    keyboardSection: {
        main: null,
        keysContainer: null,
        keys: [],       
    },

    keyValues: {
        value: "",
        caps: false,
    },
    
    _keysofKeyboard () {

        // Icons keyboard from Googleapis
        
        const iconInput = (iconHTML) => {
            return `<i class="material-icons">${iconHTML}</i>`;
        };

        const keyFragement = document.createDocumentFragment();
        const keylayout = [
                        "1","2","3","4","5","6","7","8","9","0","backspace",
                        "q","w","e","r","t","y","u","i","o","p","enter",
                        "caps","a","s","d","f","g","h","j","k","l",";",
                        "dropdown","z","x","c","v","b","n","m",",",".","?",
                        " " 
                    ];
        
        keylayout.forEach(element => {
            const keyElement = document.createElement("button");
            const lineBreak = ["backspace","enter",";","?"].indexOf(element) !== -1;
            
            // Add Class for the Keys
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard_keys");
            
            switch(element){
                // Special Cases
                case "backspace":
                    keyElement.classList.add("keyboard_key-wide")
                    keyElement.innerHTML = iconInput("backspace")
                    break;
                
                case "enter":
                    keyElement.classList.add("keyboard_key-wide")
                    keyElement.innerHTML = iconInput("keyboard_return")
                    break;

                case "caps":
                    keyElement.classList.add("keyboard_key-wide")
                    keyElement.innerHTML = iconInput("keyboard_capslock")
                    break;

                case "dropdown":
                    keyElement.classList.add("keyboard_key-wide")
                    keyElement.innerHTML = iconInput("list")
                    keyElement.onclick = function () {
                        var x = document.getElementById("drop-content");
                        if (x.style.display === "none") {
                            x.style.display = "block";
                          } else {
                            x.style.display = "none";
                          }
                    }

                    // Adding dropdown list
                    
                    divMenu = document.createElement("div")
                    divMenu.id = "drop-content" 

                    listFragment = document.createDocumentFragment()

                    item1 = document.createElement('a')
                    item1.innerHTML = iconInput("arrow_right") + "Algebra";
                    item2 = document.createElement('a')
                    item2.innerHTML = iconInput("arrow_right") + "Calculos";
                    item3 = document.createElement('a')
                    item3.innerHTML = iconInput("arrow_right") + "Statistics";

                    listFragment.appendChild(item1)
                    listFragment.appendChild(item2)
                    listFragment.appendChild(item3)

                    
                    divMenu.appendChild(listFragment)

                    keyElement.appendChild(divMenu)


                    break;    

                case "space":
                    keyElement.classList.add("keyboard_key-extra-wide");
                    keyElement.innerHTML = iconInput("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.keyValues.value = element;
                        this._triggerEvent(this.keyValues.value)
                    })
                
                // Default
                default:
                    keyElement.textContent = element.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        this.keyValues.value += this.keyValues.caps ? element.toUpperCase : element.toLowerCase();
                        this._triggerEvent(this.keyValues.value);
                     });
            };

            keyFragement.appendChild(keyElement);

            if(lineBreak){
                keyFragement.appendChild(document.createElement("br"))
            }


        });

        return keyFragement;
    },

    _triggerEvent( ){
        console.log( );
        this.keyValues.value
    },

    _writeValue(inicialValue){
        this.keyValues.value = inicialValue; 
    },


    init() {
        // Creating Elements
        this.keyboardSection.main = document.createElement("div");
        this.keyboardSection.keysContainer = document.createElement("div");

        // Classes and Elements
        this.keyboardSection.keysContainer.classList.add("keyboardLayout");
        this.keyboardSection.keysContainer.appendChild(this._keysofKeyboard());

        // Add Elements to DOM
        this.keyboardSection.main.appendChild(this.keyboardSection.keysContainer);
        document.body.appendChild(this.keyboardSection.main);

        // Automatically use Keyboard for elements with
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                element.value = this.keyValues.value;
                this._writeValue(element.value);
                });        
        }); 
        
    },


}

window.addEventListener("DOMContentLoaded", function() {
        keyboard.init();
      });