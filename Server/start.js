export default function start(planets, systems) {

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
    }

    let shuffledPlanets = shuffleArray(planets);

    console.log(shuffledPlanets)

    for(let i = 0; i < shuffledPlanets.length; i++) {
      for(let j = 0; j < systems.length; j++) {
          let index = systems[j].find(item => item.planet == shuffledPlanets[i])
            
          if(index != undefined) {
            let planetName = document.getElementById(index.planet);
            if(i%2 == 0) {
              index.claimed = "blue";
              planetName.src = "http://127.0.0.1:5500/images/planets/"+index.planet+"_blue.png"
            } else {
              index.claimed = "red";
              planetName.src = "http://127.0.0.1:5500/images/planets_red/"+index.planet+"_red.png"
            }
            console.log(index);
            break;
          }
      }
    }
   
      


}