export default function troopCalculate(player, planets, colour) {
   
    let planetsClaimed = 0;

    for(let i = 0; i < planets.length; i++) {
        if(planets[i].claimed == colour)
        planetsClaimed++;
    }
    
    player.troops += ((Math.floor(planetsClaimed/3))+3);
    return player.troops;
}




