var scoresStorage = Number(localStorage.getItem("scores"));
var scoresText = document.getElementById("scores");
scoresText.innerHTML = scoresStorage;

if (JSON.parse(localStorage.getItem("achievedList") == null)){
    achieved = ["false", "false", "false", "false", "false", "false"];
    localStorage.setItem("achievedList", JSON.stringify(achieved));
}
console.log("dgvs")

achievedList = JSON.parse(localStorage.getItem("achievedList"))
console.log("dsdgvs")
console.log(JSON.parse(localStorage.getItem("achievedList")) + "DSv")


badges = [] 
for (let i = 0; i < 6; i++) { 
    let name_badge = "badge_" + (i + 1).toString();
    badges.push(document.getElementById(name_badge));
}

scores = [100, 200, 300, 400, 600, 800]

for (let i = 0; i < 5; i++) { 
    console.log(achievedList[i])
    if (achievedList[i] == "false")
        {
            
            if (scoresStorage >= scores[i]) {
                badges[i].innerHTML = "ACHIEVED"
                badges[i].classList.remove("badge_new")
                badges[i].classList.remove("badge-secondary")
                badges[i].classList.add("badge_achieved")
                badges[i].classList.add("badge-success")

                achievedList[i] = "true"
                localStorage.setItem("achievedList", JSON.stringify(achievedList));
            }
        } 
    else
    {
        badges[i].innerHTML = "ACHIEVED"
        badges[i].classList.remove("badge_new")
        badges[i].classList.remove("badge-secondary")
        badges[i].classList.add("badge_achieved")
        badges[i].classList.add("badge-success")

        achievedList[i] = "true"
        localStorage.setItem("achievedList", JSON.stringify(achievedList));      
    } 
}
