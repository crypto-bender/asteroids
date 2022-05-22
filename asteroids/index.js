const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;


class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
//
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  shoot() {

  }
}

class Projectile {
  constructor(x, y, radius, color, velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
  }
//update projectile position as animate recurses
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//coordinates to center player in the center of canvas
const x = canvas.width/2;
const y = canvas.height/2;
const player = new Player(x, y, 30, 'blue');
player.draw();

//create array to hold all created projectile objects
const projectiles = [];

var animate = function() {
  requestAnimationFrame(animate);
  c.fillStyle = 'black';
  //clear projectile paths and keep player figure visible on canvas
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectiles.forEach((projectile) => {
    projectile.update();
  });
}


addEventListener('click', (event) => {
  //create new projectiles on click that move in direction of click event
  const angle = Math.atan2(
    event.clientY - canvas.height /2,
    event.clientX - canvas.width / 2);
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle)
  };

  projectiles.push(
    new Projectile(
      canvas.width / 2,
      canvas.height / 2,
      5,
      'red',
      velocity
  ));
});

animate();
