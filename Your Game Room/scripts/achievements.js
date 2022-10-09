var balance = localStorage.getItem("balance");
var balanceText = document.getElementById("balance");
balanceText.innerHTML = balance;

badges = []
for (let i = 0; i < 6; i++) { 
    let name_badge = "badge_" + (i + 1).toString();
    badges.push(document.getElementById(name_badge));
}

scores = [50, 100, 150, 200, 250, 300]
for (let i = 0; i < 5; i++) { 
    if (balance >= scores[i]) {
        badges[i].innerHTML = "ACHIEVED"
        badges[i].classList.remove("badge_new")
        badges[i].classList.remove("badge-secondary")
        badges[i].classList.add("badge_achieved")
        badges[i].classList.add("badge-success")
    }
}
