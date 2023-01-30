export default function colourLoad(shuffledPlanets, planets) {

    console.log(shuffledPlanets);
    console.log(planets);

      for (let i = 0; i < shuffledPlanets.length; i++) {

        let planetName = document.getElementById(planets[i].planet);
        let planetTroops = document.getElementById("troops_" + planets[i].planet);
        
        if (planets[i].claimed == "blue") {
            planetName.src = "./images/planets/" + planets[i].planet + "_blue.png"
        } else {
            planetName.src = "./images/planets_red/" + planets[i].planet + "_red.png"
        }
        planetTroops.innerHTML = planets[i].troopcount;
    }
}