const tipTextBody = document.getElementById("tip-body");

const adminTips = [
    "Cheat and you're ass is bacon.",
    "Be nice to other players.",
    "Focus on having fun."
];

function showRandomAdminTip() {
    let index = Math.round(Math.random() * (adminTips.length - 1));
    tipTextBody.innerText = adminTips[index];
}

showRandomAdminTip();