var tabButtons = document.querySelectorAll(".tabContainer .buttonContainer button");
var tabPanels = document.querySelectorAll(".tabContainer .tabPanel");

function showPanel(panelIndex, colorcode, borderStyle) {
    tabButtons.forEach(function (node) {
        node.style.border = ""
        node.style["border-bottom"] = "1px solid rgba(0,0,0,.35)";
        node.style.backgroundColor = "";
        node.style.color = "";
    });
    tabButtons[panelIndex].style.border = borderStyle;
    tabButtons[panelIndex].style["border-bottom"] = "";
    tabButtons[panelIndex].style.color = "black";

    tabPanels.forEach(function (node) {
        node.style.display = "none";
    });
    tabPanels[panelIndex].style.display = "block";

}
showPanel(0, '#d7d4d4', '1px solid rgba(0,0,0,.35)');