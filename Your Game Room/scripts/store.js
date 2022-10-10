//    localStorage.setItem("balance",1000);
var balance = localStorage.getItem("balance");
var balanceText = document.getElementById("balance");
balanceText.innerHTML = balance;

var boughtBacks = [];
var boughtSnakes = [];
var appliedBack = 0;
var appliedSnake = 0;
var x = localStorage.getItem("firstLoad");
if(x == 1){
    boughtBacks = JSON.parse(localStorage.getItem("boughtBacks"));
    boughtSnakes = JSON.parse(localStorage.getItem("boughtSnakes"));
    appliedBack = Number(localStorage.getItem("appliedBack"));
    appliedSnake = Number(localStorage.getItem("appliedSnake"));
    var elements = document.querySelectorAll(".product-back");
    for(var i = 0; i < elements.length; i++){
        if(boughtBacks[i] == 1){
            elements[i].classList.remove('buy');
            elements[i].innerText = "Use";
            elements[i].classList.add("use");
            elements[i].classList.remove("disabled");
            elements[i].classList.remove("applied");
            console.log(elements[i].dataset.index);
        }
        if(i == appliedBack){
            elements[i].innerText="Applied";
            elements[i].classList.add("disabled");
            elements[i].classList.add("applied");
        }
    }
    var elements = document.querySelectorAll(".product-snake");
    for(var i = 0; i < elements.length; i++){
        if(boughtSnakes[i] == 1){
            elements[i].classList.remove('buy');
            elements[i].innerText = "Use";
            elements[i].classList.add("use");
            elements[i].classList.remove("disabled");
            elements[i].classList.remove("appliedSnake");
            console.log(elements[i].dataset.index);
        }
        if(i == appliedSnake){
            elements[i].innerText="Applied";
            elements[i].classList.add("disabled");
            elements[i].classList.add("appliedSnake");
        }
    }
}
else{
    var firstLoad = 1;
    localStorage.setItem("firstLoad",firstLoad);
    appliedBack = 0;
    appliedSnake = 0;
    boughtBacks = [];
    boughtSnakes = [];
    boughtBacks[0] = 1;
    boughtSnakes[0] = 1;
    localStorage.setItem("boughtBacks", JSON.stringify(boughtBacks));
    localStorage.setItem("appliedBack", appliedBack);
    localStorage.setItem("boughtSnakes", JSON.stringify(boughtSnakes));
    localStorage.setItem("appliedSnake", appliedSnake);
}



function applyBackground(el)
{
    if(el.classList.contains('buy')){
        balance = localStorage.getItem("balance");
        if(Number(el.dataset.price) <= Number(balance)){
            el.classList.remove('buy');
            el.innerText = "Use";
            el.classList.add("use");
            var newBalance = Number(balance) - Number(el.dataset.price);
            el.dataset.price = 0;
            localStorage.setItem("balance",newBalance);
            var index = Number(el.dataset.index);
            boughtBacks = JSON.parse(localStorage.getItem("boughtBacks"));
            boughtBacks[index] = 1;
            localStorage.setItem("boughtBacks", JSON.stringify(boughtBacks));
            balanceText.innerHTML = newBalance;
        }
    }
    else{
    // ставим новый фон
    var z = document.querySelector("html");
    background = el.dataset.back;
    var img = `url(${background})`;
    z.style.backgroundImage = img;
    localStorage.setItem("background", img);
    // обозначаем, что старый фон больше не используется
    var y = document.querySelector(".applied");
    y.classList.remove("disabled");
    y.innerText="Use";
    y.classList.add("use");
    y.classList.remove("applied");
    // обозначаем, что данный фон используется
    el.innerText="Applied";
    el.classList.add("disabled");
    el.classList.add("applied");
    appliedBack = el.dataset.index;
    localStorage.setItem("appliedBack",appliedBack);
    }
}

function applySnake(el)
{
    if(el.classList.contains('buy')){
        balance = localStorage.getItem("balance");
        if(Number(el.dataset.price) <= Number(balance)){
            el.classList.remove('buy');
            el.innerText = "Use";
            el.classList.add("use");
            var newBalance = Number(balance) - Number(el.dataset.price);
            el.dataset.price = 0;
            localStorage.setItem("balance",newBalance);
            var index = Number(el.dataset.index);
            boughtSnakes = JSON.parse(localStorage.getItem("boughtSnakes"));
            boughtSnakes[index] = 1;
            localStorage.setItem("boughtSnakes", JSON.stringify(boughtSnakes));
            balanceText.innerHTML = newBalance;
        }
    }
    else{
    // ставим цвет змеи
    var snakeColor = el.dataset.snake;
    var appleColor = el.dataset.apple;
    localStorage.setItem("snakeColor",snakeColor);
    localStorage.setItem("appleColor",appleColor);
    // обозначаем, что старая расцветка змеи больше не используется
    var y = document.querySelector(".appliedSnake"); 
    y.classList.remove("disabled");
    y.innerText="Use";
    y.classList.add("use");
    y.classList.remove("appliedSnake"); 
    // обозначаем, что данная расцветка змеи используется
    el.innerText="Applied";
    el.classList.add("disabled");
    el.classList.add("appliedSnake"); 
    appliedSnake = el.dataset.index;
    localStorage.setItem("appliedSnake",appliedSnake);
    }
    console.log(localStorage.getItem("snakeColor"));
    console.log(localStorage.getItem("appleColor"));
}


function buy()
{
    
}