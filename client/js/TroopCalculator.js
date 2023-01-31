export default function troopCalculate(player, planets, systemValues, systemTroops) {
   

    for(let i = 0; i < systemValues.length; i++) {
        systemTroops += systemValues[i];
    }
    
    player.troops += ((Math.floor(planets/3))+systemTroops+3);
    return player.troops;
}




