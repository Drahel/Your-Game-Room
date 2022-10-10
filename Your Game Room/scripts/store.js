//    localStorage.setItem("balance",1000);
var balance = localStorage.getItem("balance");
var balanceText = document.getElementById("balance");
balanceText.innerHTML = balance;

// var productsList = document.querySelectorAll(".buy");
// var productsArray = [...productsList];
// productsArray.forEach(el => {
//     if(el.dataset.price == "0"){
//         el.innerText = "Use";
//     }
// })

var boughtBacks = [];
var appliedBack = 0;
var x = localStorage.getItem("firstLoad");
if(x == 1){
    boughtBacks = JSON.parse(localStorage.getItem("boughtBacks"));
    appliedBack = Number(localStorage.getItem("appliedBack"));
    var elements = document.querySelectorAll(".product");
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
}
else{
    var firstLoad = 1;
    localStorage.setItem("firstLoad",firstLoad);
    appliedBack = 0;
    boughtBacks = [];
    boughtBacks[0] = 1;
    localStorage.setItem("boughtBacks", JSON.stringify(boughtBacks));
    localStorage.setItem("appliedBack", appliedBack);
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


function buy()
{
    
}