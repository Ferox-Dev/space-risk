export default function troopCalculate(playerTroops, territories, systemValues, systemTroops) {
   

    for(let i = 0; i < systemValues.length; i++) {
        systemTroops += systemValues[i];
    }
    
    playerTroops += ((Math.floor(territories/3))+systemTroops+3);
    console.log(playerTroops);
    
}




