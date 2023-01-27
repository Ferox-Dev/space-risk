export default function colourLoad(shuffledPlanets, planets) {

    console.log(shuffledPlanets);
    console.log(planets);

      for (let i = 0; i < shuffledPlanets.length; i++) {

        let planetName = document.getElementById(planets[i].planet);

        console.log(planets[i]);

        if (planets[i].claimed == "blue") {
            planetName.src = "./images/planets/" + planets[i].planet + "_blue.png"
        } else {
            planetName.src = "./images/planets_red/" + planets[i].planet + "_red.png"
        }
        
    }
}