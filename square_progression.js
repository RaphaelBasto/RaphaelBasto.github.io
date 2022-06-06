let slider = document.getElementById("ratioSlider");
let Nslider = document.getElementById("NSlider");
let sliderValue = document.getElementById("ratioValue");
let NValue = document.getElementById("NValue");
sliderValue.innerHTML = slider.value;
NValue.innerHTML = Nslider.value;
let desenhoDiv = d3.select("#divDesenho");

let update = () => {
    desenhoDiv.html("");
    const colors = ["red", "yellow", "blue", "green"];
    const angulo = +slider.value * Math.PI / 2;
    let contador = 1;
    desenhoDiv.append("svg")
           .attr("id", "desenho")
           .attr("width", 800)
           .attr("height", 600)
           .attr("style", "border:1px solid gray");

    let desenho = d3.select("#desenho");

    desenho.append("g")
           .attr("id", "g1")
           .attr("transform", "translate(400, 300)");
    for (let i = 0; i < +Nslider.value; i++) {
        let gAtualId = `#g${contador++}`;
        let gAtual = d3.select(gAtualId);
        let translateX = 0;
        let translateY = 0;

        if(document.getElementById("radio1").checked){
            translateX = 80;
        }
        else if(document.getElementById("radio2").checked){
            translateX = 80;
            translateY = 80;
        }
        else if(document.getElementById("radio3").checked){
            translateY = 80;
        }
        

        gAtual.append("rect")
              .attr("fill", colors[i % colors.length])
              .attr("x", "0")
              .attr("y", "0")
              .attr("width", "80")
              .attr("height", "80")
              .attr("opacity", "0.7");
        
        gAtual.append("g")
              .attr("id", `g${contador}`)
              .attr("transform", `translate(${translateX},${translateY}) rotate(${90 * +slider.value}) scale(${1/(+slider.value <= 0.5 ? Math.cos(angulo) : Math.sin(angulo))})`);
    }
};

update();

slider.oninput = () => {
    sliderValue.innerHTML = slider.value;
    update();
};

Nslider.oninput = () => {
    NValue.innerHTML = Nslider.value;
    update();
};

for (let rad of document.getElementsByName("varRadio")) {
    rad.onchange = update;
}

// Local Storage
let savePos = (top, left, id) => {
    var posObject = {
        top: top,
        left: left
    };
    localStorage.setItem(`position ${id}`, JSON.stringify(posObject));
};

let loadPos = () => {
    const posDes = JSON.parse(localStorage.getItem("position divDesenho") || "{}");
    const posVar = JSON.parse(localStorage.getItem("position divVars") || "{}");
    $("#divDesenho").offset(posDes);
    $("#divVars").offset(posVar);
};

$(".draggable").css("display", "inline-block");
$(".draggable").draggable({
    stop: (e, ui) => {
        const {top, left} = ui.offset;
        savePos(top, left, e.target.id);
    }
});

loadPos();
