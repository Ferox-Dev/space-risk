export const pointcalc = (territories, armies, battleswon, solarsystemsvaluetotal) => {
    // This function should only be called when the game is finished 
    // has 4 values
    let pointsreturn = 0; 

    pointsreturn = pointsreturn + territories/2;
    pointsreturn = pointsreturn + armies/10;
    pointsreturn = pointsreturn + battleswon/3;
    pointsreturn = pointsreturn + solarsystemsvaluetotal;

    
    return pointsreturn; 
}