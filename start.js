export default function start(planetNames) {

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  let shuffledPlanets = shuffleArray(planetNames);

  return shuffledPlanets;

  console.log(shuffledPlanets)

//   for (let i = 0; i < shuffledPlanets.length; i++) {

//     let index = planets.find(item => item.planet == shuffledPlanets[i])

//     if (index != undefined) {
//       let planetName = document.getElementById(index.planet);
//       if (i % 2 == 0) {
//         index.claimed = "blue";
//         planetName.src = "./images/planets/" + index.planet + "_blue.png"
//       } else {
//         index.claimed = "red";
//         planetName.src = "./images/planets_red/" + index.planet + "_red.png"
//       }
//       console.log(index);
//     }
//   }
}