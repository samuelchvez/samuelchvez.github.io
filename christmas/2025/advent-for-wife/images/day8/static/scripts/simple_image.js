SimpleImage.prototype = Object.create(Actor.prototype);
SimpleImage.constructor = SimpleImage;

function SimpleImage(position, width, height, alpha, source){
    Actor.call(this, position);
    this.width = width;
    this.height = height;
    this.alpha = alpha;

    // Load image
    this.image = new Image();
    this.image.src = source;
    this.ready = false;

    var simple_image = this;

    // Callback on load image
    this.image.onload = function(){
        simple_image.ready = true;
    }
}

SimpleImage.prototype.draw = function(context){
    if(this.ready){
        var tmp_alpha = context.globalAlpha;
        context.globalAlpha = this.alpha;
        context.drawImage(this.image, this.position.x, this.position.y);
        context.globalAlpha = tmp_alpha;
    }
}