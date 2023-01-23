export default function start(planets) {

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

      for(let i = 0; i < shuffledPlanets.length/2; i++) {
        
    }

      


}