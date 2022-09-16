import '../scss/main.scss';

// uncomment the lines below to enable PWA
import {registerSW} from './pwa.js';
registerSW();

/* place your code below */

let isDark = false;

const button = document.querySelector('.mode--js');

button.addEventListener('click', () => {
    if (isDark == false) {
        document.documentElement.style.setProperty('--background-color', 'black');
        document.documentElement.style.setProperty('--block-color', 'rgb(11, 12, 46)');
        document.documentElement.style.setProperty('--text-color', 'white');
        isDark = true;
        button.innerHTML="lightmode";
    } else {
        document.documentElement.style.setProperty('--background-color', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--block-color', 'rgb(212, 212, 212)');
        document.documentElement.style.setProperty('--text-color', 'black');
        isDark = false;
        button.innerHTML="darkmode";
    };
});

/*-----------------------------------------------------*/
const entry = localStorage.getItem('entry');

let result = '';

if (entry) {
    result = entry;
}

const textData = document.querySelector('.form__textarea--js');
textData.value = result;

const loadData = document.querySelector('.load--js');
const saveData = document.querySelector('.save--js');
const clearData = document.querySelector('.clear--js');


saveData.addEventListener('click', () => {
    localStorage.setItem('entry', textData.value);
});

loadData.addEventListener('click', () => {
    const loadedData = localStorage.getItem('entry');
    textData.value = loadedData;
    console.log(textData.innerHTML);
});

clearData.addEventListener('click', () => {
    localStorage.removeItem('entry');
    textData.value = '';
});


fetch("https://api.github.com/users/dawidmajewski1991/repos")
.then(resp => resp.json())
.then(resp => {
    for (let repo of resp) {
        const {name, html_url} = repo;
        const repositoryList = document.querySelector('.repobox__placeholder--js');
        const repoTemplate = `<li class="repobox__item">${name}<a href="${html_url}" class="repobox__link"> [link]</a></li>`;

        repositoryList.innerHTML += repoTemplate;
    }
})
.catch(error => {
    console.log('brak odpowiedzi.')
})

let glassCounter = document.querySelector('.hydrapp__digit--js');
const glassAdd = document.querySelector('.hydrapp__button--js');
const glassRemove = document.querySelector('.hydrapp__remove--js');
glassCounter.innerHTML = 0;


const key = new Date(). toISOString().slice(0, 10);
console.log(key);
 
if (localStorage.getItem(key)) {
} else {
    localStorage.setItem(key, '0');
}

glassAdd.addEventListener('click', () => {
    glassCounter.innerHTML ++;
    localStorage.setItem(key, glassCounter.innerHTML);
    console.log('Glass added.');
});

glassRemove.addEventListener('click', () => {
    if (glassCounter.innerHTML > 0) {
    glassCounter.innerHTML --;
    localStorage.setItem(key, glassCounter.innerHTML);
    console.log('Glass removed.');
    } else {
        console.log(`Can't be less than 0.`);
    };
});