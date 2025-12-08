// Next animation frame pollyfill
window.nextFrame = (function(callback) {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        }
    );
})();

function Director(scene){
    this.scene = scene;
}

Director.prototype = {
    action: function(){
        var start_time = (new Date()).getTime();
        this.roll(start_time);
    },
    roll: function(last_time){
        // Update
        var time = (new Date()).getTime();
        var delta_time = (time - last_time)/1000.0;

        // Clear scene
        this.scene.clear();

        // Update scene
        this.scene.update(delta_time);

        // Draw scene
        this.scene.draw();

        // Request and roll next frame
        var director = this;
        nextFrame(function(){
            director.roll(time);
        });
    },
    cut: function(){},
    step: function(){}
};

function Scene(canvas, actors, update_function){
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.actors = actors;
    this.update = update_function;
    this.state = {};
}

Scene.prototype = {
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    draw: function(){
        for(var key in this.actors){

            if(typeof this.actors[key].draw === 'function'){
                this.actors[key].draw(this.context);
            }
        }
    }
};

function Actor(position){
    this.i_position = {
        x: position.x,
        y: position.y
    };

    this.position = {
        x: position.x,
        y: position.y
    };
}

Actor.prototype = {
    draw: function(context){}
};

Actor.prototype.displaceX = function(distance, delta_time){
    this.position.x += distance * delta_time / (1.0/60.0);
}

Actor.prototype.displaceY = function(distance, delta_time){
    this.position.y += distance * delta_time / (1.0/60.0);
}