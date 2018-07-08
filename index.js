var canvas = document.querySelector('canvas') 
var ctx = canvas.getContext('2d')
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var balls = []; 
var projects = $('#projhead')
 
projects.click(function(){
    $('#projcontent').fadeToggle()
})
function getTime(){
  var $date = $("#time")
  var now = new Date(); //sets now to = current date&time
  var dateOnly =now.toString() // converts now obj to str
  dateOnly = dateOnly.slice(0,dateOnly.indexOf('G')) // take away the pacific standard time information, starting at GMT 
  $date.text(dateOnly) // change the text to display date string.
 
}

setInterval(getTime,10)
 

function random(min,max) {
    return Math.floor(Math.random() * (max -min + 1)+ min)
}
 

function Ball(x,y,velX,velY,color,size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color; 
    this.size = size;
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI); 
    ctx.fill(); 
}


Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
/*Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].velX = -1*(balls[j].velX);
        balls[j].velY = -1*(balls[j].velY); 
      }
      
      }
    }
  }
 */
 
 function loop() {
      ctx.fillStyle = 'rgba(121, 121, 121, 0.4)';
       ctx.fillRect(0, 0, width, height);
       while (balls.length <50) {
           var size = random(10,20)
           var ball = new Ball(random(size,width-size), random(size,height-size), random(-10,10),random(-10,10),`rgb(${random(0,255)},${random(0,255)},${random(0,255)}`,size)
             balls.push(ball)
       }
     for (var i=0;i<balls.length;i++) {
         balls[i].draw();
         balls[i].update(); 
        // balls[i].collisionDetect();
     }
      requestAnimationFrame(loop);



 
 }

 loop()
  
let texts = ['Kathleen','a Designer','a Problem Solver','a Thinker','passionate for programming', 'an aspiring developer','a Dreamer','a Creator','a Gamer','a life-long learner','always up for a challenge']

function randText(texts) {
return texts[Math.floor(Math.random()*texts.length)]
 
}

setInterval(function(){ 
$('h4').html(`Hi, I'm <span>${randText(texts)}</span>.`)
},1000)
