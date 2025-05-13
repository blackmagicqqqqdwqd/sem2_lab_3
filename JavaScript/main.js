d3.select(window).on("load", function () {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);
});

let draw = (dataForm) => {
    const svg = d3.select("svg");
    let pict = drawSmile(svg);
    pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) 
         rotate(${dataForm.rotate.value},0, 0) scale(${dataForm.scaleX.value},${dataForm.scaleY.value})`);
}
function clear2() {
    const svg = d3.select("svg");
    svg.selectAll('*').remove();
}

function includeAnimation() {
    if (d3.select('#animation2').property('checked') == true) {
        d3.select('#cx2').classed('inVisible', false);
        d3.select('#cy2').classed('inVisible', false);
        d3.select('#scaleX2').classed('inVisible', false);
        d3.select('#scaleY2').classed('inVisible', false);
        d3.select('#rotate2').classed('inVisible', false);

        d3.select('#buttonDraw').classed('inVisible', true);
        d3.select('#typeAnimation').classed('inVisible', false);
        d3.select('#buttonAnimation').classed('inVisible', false);
        d3.select('#alongOption').classed('inVisible', false);
    } else {
        d3.select('#cx2').classed('inVisible', true);
        d3.select('#cy2').classed('inVisible', true);
        d3.select('#scaleX2').classed('inVisible', true);
        d3.select('#scaleY2').classed('inVisible', true);
        d3.select('#rotate2').classed('inVisible', true);

        d3.select('#buttonDraw').classed('inVisible', false);
        d3.select('#typeAnimation').classed('inVisible', true);
        d3.select('#buttonAnimation').classed('inVisible', true);
        d3.select('#alongOption').classed('inVisible', true);
    }

}

function includeAnimationType() {

    if (d3.select('#alongPath').property('checked') == true) {
        d3.select('#Rotate').classed("inVisible", true);
        d3.select('#Scale').classed("inVisible", true);
        d3.select('#alongType').classed("inVisible", false);
        d3.select('p').classed("inVisible", true); //мб накажет но первый p - это блок координат
    } else {
        d3.select('#alongType').classed("inVisible", true);
        d3.select('#Rotate').classed("inVisible", false);
        d3.select('#Scale').classed("inVisible", false);
        d3.select('p').classed("inVisible", false);
    }

}

let runAnimation = (dataForm) => {
    
    const anim_type = d3.select("#typeAnimation").property('value');
    const svg = d3.select("svg")
    let pict = drawSmile(svg);
    if (d3.select("#alongPath").property("checked") == false) {
        if (anim_type == 'linear') {
            pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) 
                rotate(${dataForm.rotate.value},0, 0) scale(${dataForm.scaleX.value},${dataForm.scaleY.value})`)
                .transition()
                .duration(6000)
                .ease(d3.easeLinear)
                .attr("transform", `translate(${dataForm.cx_finish.value}, ${dataForm.cy_finish.value}) 
                    rotate(${dataForm.rotate_finish.value},0, 0) scale(${dataForm.scaleX_finish.value},${dataForm.scaleY_finish.value})`);

        }
        else if (anim_type == 'bounce') {
            pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) 
                rotate(${dataForm.rotate.value},0, 0) scale(${dataForm.scaleX.value},${dataForm.scaleY.value})`)
                .transition()
                .duration(6000)
                .ease(d3.easeBounce)
                .attr("transform", `translate(${dataForm.cx_finish.value}, ${dataForm.cy_finish.value}) 
                    rotate(${dataForm.rotate_finish.value},0, 0) scale(${dataForm.scaleX_finish.value},${dataForm.scaleY_finish.value})`);

        }
        else if (anim_type == 'elastic') {
            pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) 
                rotate(${dataForm.rotate.value},0, 0) scale(${dataForm.scaleX.value},${dataForm.scaleY.value})`)
                .transition()
                .duration(6000)
                .ease(d3.easeElastic)
                .attr("transform", `translate(${dataForm.cx_finish.value}, ${dataForm.cy_finish.value}) 
                    rotate(${dataForm.rotate_finish.value},0, 0) scale(${dataForm.scaleX_finish.value},${dataForm.scaleY_finish.value})`);

        }
    } else {
        let path = drawPath(d3.select('#typeMoveAlong').property("value"));
        pict.transition()
            .ease(d3.easeLinear) // установить в зависимости от настроек формы
            .duration(6000)
            .attrTween('transform', translateAlong(path.node()));
    }
}