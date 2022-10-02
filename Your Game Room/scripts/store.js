//    localStorage.setItem("balance",300);
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
    }
}


function buy()
{
    
}