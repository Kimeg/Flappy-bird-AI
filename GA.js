

function fitBird(birds){
  let fitness = 0;
  let best = null;
  
  for (var bird of birds){
    var f = bird.fitness;
    
    if (f > fitness){
      fitness = f;
      best = bird;
      
    }
  }
  return best;
}

function nextGen(birds, N, start_x, start_y, radius, range){
  let v = [];
  let best = fitBird(birds);
  if (best!=null){
    best_bird = best;
  }
  
  for (let i=0; i<N;i++){
    let rand = random();
    
    v[i] = new Bird(start_x, start_y, radius, range);
    if (rand < 0.9 && best!=null){
      v[i].nn = new NeuralNetwork(best.nn);   
    }
  }
  return v;
}