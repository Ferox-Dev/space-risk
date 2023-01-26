export default function colourLoad(shuffledPlanets) {

      for (let i = 0; i < shuffledPlanets.length; i++) {

        let index = planets.find(item => item.planet == shuffledPlanets[i])

        if (index != undefined) {
          let planetName = document.getElementById(index.planet);
          if (i % 2 == 0) {
            index.claimed = "blue";
            planetName.src = "./images/planets/" + index.planet + "_blue.png"
          } else {
            index.claimed = "red";
            planetName.src = "./images/planets_red/" + index.planet + "_red.png"
          }
          console.log(index);
        }
      }
}