let textarea = document.querySelector("textarea")
        let encryptButton = document.querySelector(".encrypt")
        let decryptButton = document.querySelector(".decrypt")
        let noMessageDiv = document.querySelector('.withoutMessage')
        let messageDiv = document.querySelector('.message')
        let copy = document.querySelector(".copy")
        // console.log(messageDiv);
        let messageShowed
        // Valores para encriptar y desencriptar
        const a = "ai"
        const e = "enter"
        const i = "imes"
        const o = "ober"
        const u = "ufat"
        
        function controlText () {
            let value = textarea.value
            // let encryptValue = ""
            for (let i = 0; i < value.length; i++) {
                const j = value[i];
                // console.log(j ===   j.toUpperCase() );
                // console.log(["á", "é", "ó", "í", "ú"].includes(j));
                // console.log([" ", "?", ".", ",", "!", ":", ";"].includes(j));
                // console.log(j);
                if( (j ===   j.toUpperCase() && ![" ", "?", ".", ",", "!", ":", ";", ")", "("].includes(j)) ||  ["á", "é", "ó", "í", "ú"].includes(j)){  
                    console.log("error control text: ", i +" ----> "  + j  +" <---------");
                    alert("No se admiten mayusculas, solo minusculas y sin asentos")
                    return '404'
                }
            }
        }

        //  Funcion de  encriptar y desencriptar
        function encrypting(action ) {
            const data = textarea.value
            const result = controlText()
            textarea.value = ''
            if(result === '404'){
                return console.log("404"); 
            }      
            if(data === ""){
                noMessageDiv.style.display = "block"
                messageDiv.style.display= "none"
                return copy.style.display = "none"
            }
            // logica encriptar
            if(action === 'encriptar' && data){
                let encryptMessage = ''
                for (let j = 0; j < data.length; j++) {
                const el= data[j];
                    if(el === "a"){
                        encryptMessage += a
                    }else if(el === "e"){   
                        encryptMessage += e
                    }else if(el === "i"){
                        encryptMessage += i
                    }else if(el === "o"){
                        encryptMessage += o
                    }else if(el === "u"){
                        encryptMessage += u
                    }else{
                        encryptMessage += el
                    }
                }
                noMessageDiv.style.display = "none"
                messageDiv.style.display= "block"
                copy.style.display = "block"
                messageShowed = encryptMessage
                return messageDiv.innerHTML = encryptMessage    
            }
            // ---- logica desencriptar
            if(action === 'desencriptar'){
                let decryptMessage = ''
                let fragmentMsg = ''
                for (let j = 0; j < data.length ; j++) {
                    const el= data[j];
                    // console.log("-------------------------")
                    // console.log(el)
                    if(j === 0 && !["a", "e", "i", "o",  "u"].includes(el)){
                        decryptMessage += el
                    }
                    else if(fragmentMsg +el === a ){
                        decryptMessage += "a"
                        fragmentMsg = ""
                    }else if(fragmentMsg +el === e){
                        decryptMessage += "e"
                        fragmentMsg = ""
                    }else if(fragmentMsg +el === o){
                        decryptMessage += "o"
                        fragmentMsg = ""
                    }else if(fragmentMsg +el  === i){
                        decryptMessage += "i"
                        fragmentMsg = ""
                    }else if(fragmentMsg +el  === u){
                        decryptMessage += "u"
                        fragmentMsg = ""
                    }else if( !fragmentMsg.length && !["a", "e",  "i", "o",  "u"].includes(el)){
                        decryptMessage += el
                    }
                    else if(el === " "){
                        decryptMessage += el
                    }
                    else{
                        fragmentMsg += el
                    }
                }
                noMessageDiv.style.display = "none"
                messageDiv.style.display= "block"
                copy.style.display = "block"
                return messageDiv.innerHTML = decryptMessage    
            }
        }
        
        function coping(){
            let seleccion = document.createRange(); // For mobile devices
            seleccion.selectNodeContents(messageDiv);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(seleccion);
            document.execCommand('copy');
            window.getSelection().removeRange(seleccion);
            // navigator.clipboard.readText() //leer el texto copiado
            // .then( res => alert(res))
        }

        encryptButton.onclick = () =>encrypting("encriptar")
        decryptButton.onclick = () =>encrypting("desencriptar")
        copy.onclick = () =>coping()

        //------------codigo dark/light Mode
        let containerTheme = document.querySelector(".theme") 
        let indicator = document.querySelector(".indicator")
        let alura = document.querySelector("#alura")
        var root = document.documentElement;
        
        // root.style.setProperty('--color', colores[n % colores.length]);
        // console.log(background);
        containerTheme.addEventListener("click", event=>{
            if(containerTheme.classList.contains("light-mode")){
                containerTheme.classList.replace("light-mode","dark-mode" )
                alura.src = "./imgs/alura-white.svg"
                document.querySelector("#person").src = "./imgs/person_two.svg"
                root.style.setProperty("--background", "rgb(14, 8, 37)")
            }else if(containerTheme.classList.contains("dark-mode")){
                containerTheme.classList.replace("dark-mode", "light-mode")
                alura.src= "./imgs/alura.png"
                root.style.setProperty("--background", "rgb(235, 239, 255)")
                document.querySelector("#person").src = "./imgs/person.svg"
            }
            // console.log(containerTheme.classList);
        })
