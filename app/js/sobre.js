const { ipcRenderer, shell } = require('electron');
const process = require('process');

let linkFechar = document.querySelector('#link-fechar');
let linkTwitter = document.querySelector('#link-twitter');
let electronVersion = document.querySelector('#electron-version');

window.onload = function(){
    electronVersion.textContent = process.versions.electron;
}

linkFechar.addEventListener('click', function(){
    ipcRenderer.send('fechar-janela-sobre');
});

linkTwitter.addEventListener('click', function(){
    shell.openExternal('https://twitter.com');
});
