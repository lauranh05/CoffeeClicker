'use strict'
//-----------------------------------------------------------------------------------------------------------------
//GLOBAL VAR
//-----------------------------------------------------------------------------------------------------------------

//SCREENS
let screenMenu = document.getElementById('menu');
let screenGame = document.getElementById('game');

//BUTTONS
let btnStart = document.getElementById('btn-start');
let btnClicker = document.getElementById('btn-clicker');
let btnBack = document.getElementById('btn-back');
let btnConfig = document.getElementById('btn-config');
let btnProfile = document.getElementById('btn-profile');
let btnMusic = document.getElementById('btn-music');
let btnStatics = document.getElementById('btn-statics');

//STATE OF GAME
let coffeesCompleted = parseInt(localStorage.getItem('myCoffees')) || 0;
let coinsTotal = parseInt(localStorage.getItem('myCoins')) || 0;
let clicksTotal = parseInt(localStorage.getItem('totalClicks')) || 0;

//MOVEMENT
let coinNormal = 1;
let coinSpecial = 2;
let clicks = 0;
let clickNeeded = 4 //clicks to completed a coffee

//SPECIAL COFFEES
let isSpecial = false;
let randomNumber = getRandomNumber(5,8);

//COFFEE
let normalCup = document.getElementById('cup');

//IMAGES
let plusAnimation = document.createElement('img');
plusAnimation.classList.add('plus-animation');

//AUXILIARS
let clickBtnMusic = 0;

//-----------------------------------------------------------------------------------------------------------------
//BUTTONS
//-----------------------------------------------------------------------------------------------------------------

//FIRST THING: MENU SCREEN
screenGame.classList.add('hidden');
btnStatics.classList.add('hidden');


btnStart.addEventListener('click', function(){
    screenGame.classList.remove('hidden');
    btnStatics.classList.remove('hidden');
    screenMenu.classList.add('hidden');
});

btnBack.addEventListener('click', function(){
    btnStatics.classList.add('hidden');
    screenGame.classList.add('hidden');
    screenMenu.classList.remove('hidden');
});

//FUNCTIONS OF BUTTONS
btnMusic.addEventListener('click',function(){
    if(clickBtnMusic === 0){
        btnMusic.style.backgroundImage = "url('images/musicoff.png')";
        clickBtnMusic = 1;
    }
    else{
        btnMusic.style.backgroundImage = "url('images/music.png')";
        clickBtnMusic = 0;
    }
});

//-----------------------------------------------------------------------------------------------------------------
//FUNCTIONS
//-----------------------------------------------------------------------------------------------------------------

//when appears special coffee??
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//the clicker
btnClicker.addEventListener('click', function(event){

    if(normalCup.classList.contains('animation-out') || normalCup.classList.contains('animation-in')){
        return;
    }

    clicks++;
    clicksTotal++;

    if(clicks >= clickNeeded){
        clicks = 0;
        coffeesCompleted++;
        if(isSpecial){
            plusAnimation.src = 'images/2.png';
            coinsTotal += coinSpecial;
        }
        else{
            plusAnimation.src = 'images/1.png';
            coinsTotal += coinNormal;
        }

        let rect = normalCup.getBoundingClientRect();
        let left = Math.random() < 0.5;
        let randomX;
        let gap = 120;
        let dispersion = 100;

        if (left) {
            randomX = rect.left - gap - (Math.random() * dispersion);
        } 
        else {
            randomX = rect.right + gap + (Math.random() * dispersion);
        }

        let randomY = rect.top + (Math.random() * (rect.height / 2));

        plusAnimation.style.left = randomX + 'px';
        plusAnimation.style.top = randomY + 'px';

        document.body.appendChild(plusAnimation);

        setTimeout(function() {
            plusAnimation.remove();
        }, 1000);

        /*localStorage.setItem('myCoffees', coffeesCompleted);
        localStorage.setItem('myCoins', coinsTotal);
        localStorage.setItem('totalClicks', clicksTotal);*/
 
        normalCup.classList.add('animation-out');
        setTimeout(function(){
            normalCup.classList.add('animation-in');
            normalCup.classList.remove('animation-out');
            if(coffeesCompleted === randomNumber){
                isSpecial = true;
                normalCup.classList.add('special');
                randomNumber = coffeesCompleted + getRandomNumber(5,8);
            }
            else{
                isSpecial = false;
                normalCup.classList.remove('special');
            }
            //reading the position
            normalCup.offsetHeight;
            normalCup.classList.remove('animation-in');

        },500);
    }
    //TEST
    console.log('Numero random: '+ randomNumber);
    console.log('Clicks totales: '+ clicksTotal);
    console.log('Cafes completados: '+coffeesCompleted);
    console.log('Mondeas: '+ coinsTotal);
    console.log('clicks mov: '+ clicks);
});



