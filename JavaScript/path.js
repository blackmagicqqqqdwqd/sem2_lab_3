/* массив точек пути будет иметь следующий вид:
  [
    {x: координата, y: координата},
    {x: координата, y: координата},
    ...
  ]
*/
// создаем массив точек, расположенных буквой "Г"
function createPathG() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")

    let data = [];
    const padding = 100;
    //начальное положение рисунка
    let posX = padding;
    let posY = height - padding;
    const h = 5;
    // координаты y - уменьшаются, x - постоянны
    while (posY > padding) {
        data.push({ x: posX, y: posY });
        posY -= h;
    }
    // координаты y - постоянны, x - увеличиваются
    while (posX < width - padding) {
        data.push({ x: posX, y: posY });
        posX += h;
    }
    return data
}

// создаем массив точек, расположенных по кругу
function createPathCircle() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")
    let data = [];
    // используем параметрическую форму описания круга
    // центр расположен в центре svg-элемента, а радиус равен трети высоты/ширины
    for (let t = 0; t <= Math.PI * 2; t += 0.1) {
        data.push(
            {
                x: width / 2 + width / 3 * Math.sin(t),
                y: height / 2 + height / 3 * Math.cos(t)
            }
        );
    }
    return data
}

let drawPath = (typePath) => {
    // создаем массив точек
    const dataPoints = (typePath == 0) ? createPathG() : createPathCircle();

    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);
    const svg = d3.select("svg")
    // создаем путь на основе массива точек	  
    const path = svg.append('path')
        .attr('d', line(dataPoints))
        .attr('stroke', 'none')
        .attr('fill', 'none');


    return path;
}

function translateAlong(path) {
    const length = path.getTotalLength();
    return function () {
        return function (t) {
            const { x, y } = path.getPointAtLength(t * length);
            return `translate(${x},${y})`;
        }
    }
}