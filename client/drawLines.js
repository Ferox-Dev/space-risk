import { planetsArray } from '../serverindex.js';

let tempClick;

export default function drawLines(planet, neighbours) {

    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let planetFind = planetsArray.find(item => item.planet == planet)

    if (tempClick != planet) {
        let x1 = (document.getElementById(planet).width / 2) + (parseInt(document.getElementById(planet).style.left, 10));
        let y1 = (document.getElementById(planet).height / 2) + (parseInt(document.getElementById(planet).style.top, 10));


        for (let i = 0; i < neighbours.length; i++) {

            let neighbourFind = planetsArray.find(item => item.planet == neighbours[i])

            if (planetFind.claimed != neighbourFind.claimed) {
                let x2 = (document.getElementById(neighbours[i]).width / 2) + (parseInt(document.getElementById(neighbours[i]).style.left, 10));
                let y2 = (document.getElementById(neighbours[i]).height / 2) + (parseInt(document.getElementById(neighbours[i]).style.top, 10));

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = "white";
                ctx.lineWidth = '5';
                ctx.stroke();

                tempClick = planet;
            }
        }
    } else {
        tempClick = "";
    }
}