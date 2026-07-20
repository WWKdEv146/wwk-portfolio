const commands = [
    "Initializing WWK Framework...",
    "Loading OX Libraries...",
    "Connecting Database...",
    "Validating Security...",
    "Loading NUI...",
    "Starting Resources..."
];

const output = [
    ["✓ Security loaded", "success"],
    ["✓ Database connected", "success"],
    ["✓ OX Inventory detected", "info"],
    ["✓ Resources verified", "success"],
    ["✓ Ready", "warn"]
];

const typing = document.getElementById("terminalTyping");
const terminalOutput = document.getElementById("terminalOutput");

let commandIndex = 0;

function typeCommand(text, callback){

    typing.textContent="";

    let i=0;

    const interval=setInterval(()=>{

        typing.textContent+=text.charAt(i);

        i++;

        if(i>=text.length){

            clearInterval(interval);

            callback();

        }

    },40);

}

function showOutput(){

    terminalOutput.innerHTML="";

    output.forEach((line,index)=>{

        setTimeout(()=>{

            const div=document.createElement("div");

            div.className=`terminal-output ${line[1]}`;

            div.textContent=line[0];

            terminalOutput.appendChild(div);

        },index*250);

    });

}

function nextCommand(){

    typeCommand(commands[commandIndex],()=>{

        showOutput();

        commandIndex++;

        if(commandIndex>=commands.length){

            commandIndex=0;

        }

        setTimeout(nextCommand,5000);

    });

}

nextCommand();