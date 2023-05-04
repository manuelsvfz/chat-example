var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', function (msg) {
    console.log("Lo recibo en el cliente");
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

function cargaContextoCanvas(idCanvas) {///obtenir el context de canvas
    var elemento = document.getElementById(idCanvas);
    if (elemento && elemento.getContext) {
        var contexto = elemento.getContext('2d');
        if (contexto) {
            return contexto;
        }
    }
    return false;
}

function panelcolor() {///crea el panel de colors
    let can = document.getElementById('micanvas')
    let pan = document.getElementById("panel");
    pan.style.top = can.offsetTop - 2 + 'px';
    pan.style.left = (can.offsetLeft + can.width) + 'px';
    let elem = document.getElementById("colores");
    to = can.offsetTop - 24;
    lef = can.offsetLeft + 45;
    for (let j = 0; j < 2; j++) {
        let dic = document.createElement("div");
        let con = document.createTextNode("");
        dic.appendChild(con);
        dic.style.backgroundColor = color[0];
        dic.id = 'muestra' + j;
        dic.classname = "col";
        dic.style.border = "1px solid black";
        dic.style.width = "33px";
        dic.style.height = "20px";
        dic.style.position = "absolute";
        dic.style.top = (to - 5) + "px";
        if (j == 0)
            dic.style.left = (lef - 45) + "px";
        else
            dic.style.left = (lef + 9) + "px";
        dic.style.marginLeft = "1px";
        elem.appendChild(dic);
    }
    for (var i = 10; i < color.length; i++) {
        var dic = document.createElement("div");
        var con = document.createTextNode("");
        dic.appendChild(con);
        dic.style.backgroundColor = color[i];
        dic.id = i
        dic.classname = "col";
        dic.style.border = "1px solid black";
        dic.style.width = "15px";
        dic.style.height = "15px";
        dic.style.position = "absolute";
        ///dic.onclick=/////////Crida a la funcio de canvi de color al fer click
        if (i % 5 == 0) {
            to += 18;
            lef = can.offsetLeft;
        }
        dic.style.top = to + "px";
        dic.style.left = lef + "px";
        lef += 18;
        dic.style.marginLeft = "1px";
        elem.appendChild(dic);
        dic.onclick = function (e) {
            let mostra = document.getElementById('muestra' + document.getElementById('relleno').value)
            mostra.style.backgroundColor = color[e.currentTarget.id]
        }
    }
}


let actualPintar = 0;

let actualRelleno = 0;

let selectorForma = document.querySelector('select[name="seleccion"]');

let selectorPintado = document.querySelector('select[name="relleno"]');

let imagen = document.querySelector('input[name="imagen"]');

let reset = document.getElementById('reset');

let myImg = null;


reset.addEventListener('click', () => {
    imagen.value = null;
})

selectorForma.addEventListener('change', (e) => {
    changeFormaData(e.currentTarget.value);
})

selectorPintado.addEventListener('change', (e) => {
    changePintadoData(e.currentTarget.value);
})

function changeFormaData(value) {
    actualPintar = value;
    console.log(actualPintar);
}

function changePintadoData(value) {
    actualRelleno = value;
    console.log(actualRelleno);
}

function cleanPositions() {
    primeraPosicion = [];
    ultimaPosicion = [];
}

let primeraPosicion = [];
let ultimaPosicion = [];

let canvas = document.getElementById('micanvas');

let dibujar = false;
canvas.addEventListener('mousedown', (e) => {
    let context = cargaContextoCanvas('micanvas');
    switch (Number(actualPintar)) {

        case 1:
            dibujar = true;
            primeraPosicion.push(e.offsetX);
            primeraPosicion.push(e.offsetY);
            console.log(primeraPosicion);
            break;
        case 2:
            primeraPosicion.push(e.offsetX);
            primeraPosicion.push(e.offsetY);
            console.log(primeraPosicion);
            break;
        case 3:
            primeraPosicion.push(e.offsetX);
            primeraPosicion.push(e.offsetY);
            console.log(primeraPosicion);
            break;
        case 4:
            primeraPosicion.push(e.offsetX);
            primeraPosicion.push(e.offsetY);
            console.log(primeraPosicion);
            break;
        case 5:
            primeraPosicion.push(e.offsetX);
            primeraPosicion.push(e.offsetY);
            console.log(primeraPosicion);
            break;

        case 6:
            primeraPosicion.push(e.offsetX);
            primeraPosicion.push(e.offsetY);
            console.log(myImg);

            let escaladoX = 300; // = myImg.width
            let escaladoY = 300; // = myImg.height
            let newX = primeraPosicion[0] - escaladoX / 2;
            let newY = primeraPosicion[1] - escaladoY / 2;
            let newImage = new Image();
            newImage.src = myImg.src;
            context.drawImage(newImage, newX, newY, escaladoX, escaladoY);
            context.closePath();
            cleanPositions();

            break;
    }
});

canvas.addEventListener('mousemove', (e) => {
    let context = cargaContextoCanvas('micanvas');
    switch (Number(actualPintar)) {
        case 1:
            if (dibujar) {
                context.beginPath();
                context.moveTo(primeraPosicion[0], primeraPosicion[1]);
                cleanPositions();
                primeraPosicion.push(e.offsetX);
                primeraPosicion.push(e.offsetY);
                context.lineTo(primeraPosicion[0], primeraPosicion[1]);
                context.stroke();
                context.closePath();
            }


            break;

        default:
            break;
    }
});

canvas.addEventListener('mouseup', (e) => {
    let ancho = 0;
    let alto = 0;
    let context = cargaContextoCanvas('micanvas');
    ultimaPosicion.push(e.offsetX);
    ultimaPosicion.push(e.offsetY);
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = getCurrentColor();
    context.fillStyle = getCurrentColor();
    switch (Number(actualPintar)) {

        case 1:
            dibujar = false;
            context.moveTo(primeraPosicion[0], primeraPosicion[1]);
            cleanPositions();
            primeraPosicion.push(e.offsetX);
            primeraPosicion.push(e.offsetY);
            context.lineTo(primeraPosicion[0], primeraPosicion[1]);
            context.stroke();
            context.closePath();
            cleanPositions();

            break;
        case 2:
            context.moveTo(primeraPosicion[0], primeraPosicion[1]);
            context.lineTo(ultimaPosicion[0], ultimaPosicion[1]);
            context.stroke();
            context.closePath();
            cleanPositions();
            break;
        case 3:
            ancho = ultimaPosicion[0] - primeraPosicion[0];
            alto = ultimaPosicion[1] - primeraPosicion[1];

            if (actualRelleno == 0) {
                context.strokeRect(primeraPosicion[0], primeraPosicion[1], ancho, alto);
            } else {
                context.fillRect(primeraPosicion[0], primeraPosicion[1], ancho, alto);
            }
            context.closePath();
            cleanPositions();
            break;

        case 4:
            ancho = ultimaPosicion[0] - primeraPosicion[0];
            alto = ultimaPosicion[1] - primeraPosicion[1];
            context.clearRect(primeraPosicion[0], primeraPosicion[1], ancho, alto);
            context.closePath();
            cleanPositions();
            break;
        case 5:
            ancho = ultimaPosicion[0] - primeraPosicion[0];
            alto = ultimaPosicion[1] - primeraPosicion[1]
            let radio = Math.sqrt(ancho ** 2 + alto ** 2);
            context.arc(primeraPosicion[0], primeraPosicion[1], radio, Math.PI / 180 * 0, Math.PI / 180 * 360);
            if (actualRelleno == 0) {
                context.stroke();
            } else {
                context.fill();
            }
            context.closePath();
            cleanPositions();
            
            
            break;
    }
});



window.onload = function () {
    color = new Array('#000000', '#000080', '#00008B', '#0000CD', '#0000FF',
        '#006400', '#008000', '#008B8B', '#00BFFF', '#00FF00',
        '#00FF7F', '#00FFFF', '#1E90FF', '#20B2AA', '#228B22',
        '#2E8B57', '#2F4F4F', '#32CD32', '#3CB371', '#40E0D0',
        '#4169E1', '#4682B4', '#483D8B', '#48D1CC', '#4B0082',
        '#556B2F', '#5F9EA0', '#6495ED', '#66CDAA', '#696969',
        '#6A5ACD', '#6B8E23', '#708090', '#778899', '#7B68EE',
        '#7CFC00', '#7FFF00', '#7FFFD4', '#800000', '#800080',
        '#808000', '#808080', '#87CEFA', '#8A2BE2', '#8B0000',
        '#8B008B', '#8B4513', '#8FBC8F', '#90EE90', '#9370DB',
        '#9400D3', '#98FB98', '#9932CC', '#9ACD32', '#A0522D',
        '#A52A2A', '#A9A9A9', '#ADD8E6', '#ADFF2F', '#AFEEEE',
        '#B0C4DE', '#B0E0E6', '#B22222', '#B8860B', '#BA55D3',
        '#BC8F8F', '#BDB76B', '#C0C0C0', '#C71585', '#CD5C5C',
        '#CD853F', '#D2691E', '#D2B48C', '#D3D3D3', '#D8BFD8',
        '#DA70D6', '#DAA520', '#DB7093', '#DC143C', '#DCDCDC',
        '#DDA0DD', '#DEB887', '#E0FFFF', '#E6E6FA', '#E9967A',
        '#EE82EE', '#EEE8AA', '#F08080', '#F4A460', '#FA8072',
        '#FC0FC0', '#FF0000', '#FF6347', '#FF69B4', '#FF7F50',
        '#FF8C00', '#FFA07A', '#FFA500', '#FFB6C1', '#FFD700');


    //Colors
    panelcolor();


    //Carrega d'imatges
    let input = document.getElementById("img")
    if (input.value != '') {
        let reader = new FileReader();
        reader.addEventListener("loadend", function (e) {
            let src_image = new Image();
            src_image.src = e.target.result;
            src_image.onload = function () {
                selectImageTrigger(src_image)
            }
        });
        reader.readAsDataURL(input.files[0]);
    }


    input.addEventListener("change", function () {
        let reader = new FileReader();
        reader.addEventListener("loadend", function (e) {
            let src_image = new Image();
            src_image.src = e.target.result;
            src_image.onload = function () {
                selectImageTrigger(src_image)
            }
        });
        reader.readAsDataURL(this.files[0]);
    });

    changeFormaData(selectorForma.value);
    changePintadoData(selectorPintado.value)
}
function getCurrentFill() {
    return document.getElementById('relleno').value == 0 ? 'stroke' : 'fill'
}
function getCurrentColor() {
    let mostra = document.getElementById('muestra' + document.getElementById('relleno').value)
    return mostra.style.backgroundColor
}
function selectImageTrigger(img) {
    myImg = img;
}



