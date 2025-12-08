SnowBall.prototype = Object.create(Actor.prototype);
SnowBall.constructor = SnowBall;

function SnowBall(position, size){
    Actor.call(this, position);
    this.size = size;
    this.alpha = (this.size - 2)/8.0;
    this.i_alpha = this.alpha; // SNOWBALL_MIN_SIZE, SNOWBALL_MAX_SIZE
}

SnowBall.prototype.draw = function(context){
    context.beginPath();
    context.arc(
        this.position.x,
        this.position.y,
        this.size/2.0,
        0,
        2 * Math.PI,
        false
    );

    context.fillStyle= "rgba(255, 255, 255, " + this.alpha + ")";
    context.fill();
}