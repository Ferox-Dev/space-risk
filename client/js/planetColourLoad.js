export default function colourLoad(shuffledPlanets, planets) {

    console.log(shuffledPlanets);
    console.log(planets);

      for (let i = 0; i < shuffledPlanets.length; i++) {

        let index = planets.find(item => item.planet == shuffledPlanets[i])
        console.log(index);

        let planetName = document.getElementById(index.planet);

        if (i % 2 == 0) {
            index.claimed = "blue";
            planetName.src = "./images/planets/" + index.planet + "_blue.png"
        } else {
            index.claimed = "red";
            planetName.src = "./images/planets_red/" + index.planet + "_red.png"
        }
        
    }
}