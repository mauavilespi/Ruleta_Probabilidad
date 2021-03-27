//Variables usadas
var objRuleta;
var winningSegment;
var distnaciaX = 1500;
var distnaciaY = 50;
var ctx;

//Función para despliegue de mensaje de ganador
function Mensaje() {
    winningSegment = objRuleta.getIndicatedSegment();
    swal({
        title: " ¡ "+winningSegment.text+" !",
        showCancelButton: true,
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "Reiniciar",
        cancelButtonText: "Quitar elemento",
        closeOnConfirm: true,
        closeOnCancel: true
    },

    function (isConfirm) {
        if (isConfirm) {} else {
        $('#ListaPremios').val($('#ListaPremios').val().replace(winningSegment.text,""));
        leerElementos();
    }
    objRuleta.stopAnimation(false);
    objRuleta.rotationAngle = 0;
    objRuleta.draw();
    DibujarTriangulo();
});}

//Dibujar el triángulo de elección
function DibujarTriangulo() {
    distnaciaX = 50;
    distnaciaY = -10;
    ctx = objRuleta.ctx;
    ctx.strokeStyle = 'navy';
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(distnaciaX + 170, distnaciaY + 5);
    ctx.lineTo(distnaciaX + 230, distnaciaY + 5);
    ctx.lineTo(distnaciaX + 200, distnaciaY + 40);
    ctx.lineTo(distnaciaX + 171, distnaciaY + 5);
    ctx.stroke();
    ctx.fill();
}

//Función para dibujar la ruleta
function DibujarRuleta(ArregloElementos) {
    objRuleta = new Winwheel({
        'canvasId': 'canvas',
        'numSegments': ArregloElementos.length,
        'outerRadius': 245,
        'innerRadius': 5,
        'segments':ArregloElementos,
        'animation':{
            'type': 'spinToStop',
            'duration':4,
            'spins': 15,
            'callbackFinished': 'Mensaje()',
            'callbackAfter': 'DibujarTriangulo()'
        },
    });
    DibujarTriangulo();
}

//Función para leer elementos de los premios
function leerElementos() {
    txtListaElementos=$('#ListaPremios').val().trim();
    var Elementos = txtListaElementos.split('\n');
    var ElementosRuleta= [];
    Elementos.forEach(function (Elemento) {
        if(Elemento){
        ElementosRuleta.push({ 'fillStyle': "#" + ((1 << 24) * Math.random() | 0).toString(16), 'text': Elemento });
        }
    });
    DibujarRuleta(ElementosRuleta);
}

function generarProbabilidad() {
  var elementos = document.getElementById("ListaPremios").value.split("\n");
  var tirosTotales = parseInt(document.getElementById("tirosTotales").value);
  var probabilidadTotal = 1 - Math.pow((elementos.length-1)/elementos.length,tirosTotales);
  document.getElementById("texto").innerHTML = "La probabilidad de obtener un premio en particular es de " + (1/elementos.length) +
  ".\n La probabilidad de obtener un premio en particar en " + tirosTotales +" tiros es de "+ probabilidadTotal;
}
