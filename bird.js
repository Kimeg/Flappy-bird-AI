class Bird {
  constructor(x, y, r, range) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.grav = createVector(0, 3);
    
    this.r = r;
    this.range = range;
    this.nn = new NeuralNetwork(4, 8, 2);
    this.nCollision = 0;
    this.collided = false;
    this.lift = createVector(0, -30);
    this.fitness = 0;
  }

  applyForce(force) {
    this.acc = force;
  }

  update() {
    this.applyForce(this.grav);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc = createVector(0, 0);
  }

  think() {
    
    let a = this.cw.pos1.x/WIDTH;
    let b = this.cw.h1/HEIGHT;
    let c = (this.cw.h1+wall_dist)/HEIGHT;
    //let d = this.vel.y/2;
    let e = this.pos.y/HEIGHT;
    var pred = this.nn.predict([a,b,c,e]);
    //console.log(pred[0]);
    if (pred[0] > pred[1]) {
      this.applyForce(this.lift);
      this.vel.add(this.acc);
      this.vel.limit(5);
      this.pos.add(this.vel);
      this.acc = createVector(0, 0);
    }

    
  }

  collision(walls) {
    this.cw = this.closest_wall(walls); 
    //console.log(cw.pos1.x);
    if (this.pos.x+this.r/2 > this.cw.pos1.x && this.pos.x-this.r/2 < this.cw.pos1.x+this.cw.w){
      if (this.pos.y-this.r/2 < this.cw.h1 || this.pos.y+this.r/2 > this.cw.pos2.y){
        //console.log('col');  
        this.nCollision++;
        this.collided = true;
        return;
      }
    }
    this.collided = false;
  }
  
  closest_wall(walls){
    var min_dist = Infinity;
    var cw = null;
    for (var wall of walls){
      if (this.pos.x > wall.pos1.x+2*wall.w){
        this.fitness++;
        continue;
      }
      var d = Math.abs(this.pos.x - wall.pos1.x);
      
      if (d < min_dist){
        min_dist = d;
        cw = wall;
      }
    }
    return cw;
  }

  display() {
    let c = color(255, 255, 255);

    if (this.collided) {
      c = color(255, 0, 0);
    }

    push();
    fill(80);
    stroke(c);
    ellipse(this.pos.x, this.pos.y, this.r);
    pop();
  }
}

