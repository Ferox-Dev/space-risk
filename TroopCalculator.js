let playerTroops = 30;
let territories = 18;
let systemValues = [];
let systemTroops = 0;

for(let i = 0; i < systemValues.length; i++) {
    systemTroops += systemValues[i];
}

playerTroops += ((Math.floor(territories/3))+systemTroops+3);
console.log(playerTroops);
