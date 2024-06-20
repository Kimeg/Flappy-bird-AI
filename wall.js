class Wall{
  constructor(x, y1, y2, w, h1, h2, i){
    this.pos1 = createVector(x, y1);
    this.pos2 = createVector(x, y2);
    this.w = w;
    this.h1 = h1;
    this.h2 = h2;
    this.v = createVector(-2,0);
    this.index = i;
  }
  
  move(){
    this.pos1.add(this.v);
    this.pos2.add(this.v);
  }
  
  shift(walls){
   
    if (this.pos1.x < -this.w){
      var x = walls[(this.index+1)%2].pos1.x + WIDTH/2 + this.w;
      var rand = random(HEIGHT-wall_dist);
      this.pos1 = createVector(x, 0);
      this.h1 = rand;
      this.pos2 = createVector(x, rand+wall_dist);
      this.h2 = HEIGHT-(rand+wall_dist);
    }
  }
  
  update(walls){
    //this.v = createVector(-wall_speed,0);
    this.shift(walls);
    this.move();
    this.display();
  }
  
  display(){
    push();
    fill(0,0,255);
    stroke(255);
    rect(this.pos1.x, this.pos1.y, this.w, this.h1);
    rect(this.pos2.x, this.pos2.y, this.w, this.h2);
    pop();
  }
}