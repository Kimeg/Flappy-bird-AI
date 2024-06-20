let N = 300;
const nWall = 80;
const radius = 20;
const range = 80;
const WIDTH = 600;
const HEIGHT = 600;
const start_x = 30;
const start_y = HEIGHT/2;
const wall_dist = 160;

let wall_speed;
let _timer = 0;
let nGeneration = 1;
let birds = [];
let walls = [];
let slider;
let nDead = 0;
let train_mode = true;
let best_bird = null;
let bestfit = 0;
let saved = null;
function keyPressed() {
  if (key == 'S') {
    
    if (best_bird!=null){
      console.log('saved');
      
      //saveJSON(best_bird.nn, 'bird.json');
      saved = best_bird.nn;
    }else{
      console.log('nulll');
    }
  }else if (key == 'L'){
    if (best_bird==null){
      return;
    }
    train_mode = false;
    genWalls();
    nGeneration++;
    nDead = 0;
    bestfit = 0;
    _timer = 0;
    N=1;
    
    console.log('loaded');
    var the_best_bird = new Bird(start_x, start_y, radius, range);
    //best_bird.nn = loadJSON('bird.json');
    the_best_bird.nn = saved;
    birds = [the_best_bird];
  }
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  
  slider = createSlider(1, 50, 1);
  slider.position(WIDTH/2, HEIGHT+30);
  slider.style('width', '80px');
  
  for (let i = 0; i < N; i++) {
    //vehicles[i] = new Vehicle(random(WIDTH), random(HEIGHT), random(5,radius));
    birds[i] = new Bird(start_x, start_y, radius, range);
  }
  genWalls();
}

function genWalls(){
  var wall_width = WIDTH/10;
  walls = [];
  for (let i=0; i<2; i++){
    rand = random(HEIGHT-wall_dist);
    walls.push(new Wall((i+1)*WIDTH/2, 0, rand+wall_dist, wall_width, rand, HEIGHT-(rand+wall_dist), i));
  }
}

function draw() {
  _timer++;
  for (let i=0; i<slider.value(); i++){
    if (nDead==N){
      if (train_mode){
        birds = nextGen(birds, N, start_x, start_y, radius, range);
        nDead = N;
        genWalls();
        nGeneration++;
        nDead = 0
        _timer = 0;
        
      }else{
        best_bird = new Bird(start_x, start_y, radius, range);
        //best_bird.nn = loadJSON('bird.json');
        best_bird.nn = saved;
        birds = [best_bird];
        
        nDead = 1;
        genWalls();
        nGeneration++;
        nDead = 0
        _timer = 0;
      }
    }

    // All the drawing stuff
    background(0);
    nDead = 0
    bestfit = 0;
    for (var bird of birds){
      bird.update();
      if (!bird.collided){

        bird.collision(walls);
        bird.think();
        bird.display();
      }

      if (bird.collided){
        nDead++;
      }

      if (bird.fitness > bestfit){
        bestfit = bird.fitness;
      }
    }
    for (var wall of walls) {
      wall.update(walls);
    }
  }
  fill(255);
  textSize(10);
  text("Generation : "+nGeneration.toString(), 30, 30);
  text("Best Score : "+bestfit.toString(), 30, 50);
  text("Survived : "+(N-nDead).toString(), 30, 70);
  
  
}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }
