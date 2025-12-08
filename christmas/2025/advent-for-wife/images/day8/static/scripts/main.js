
// Canvas
var canvas = jQuery("#canvas")[0];

// Actors
var actors = {};

// Crystal auxiliar data
var CRYSTAL_RADIUS = 208,
    crystal_start_position = {
        x: 108,
        y: 120
    },
    crystal_end_position = {
        x: crystal_start_position.x + CRYSTAL_RADIUS*2,
        y: crystal_start_position.y + CRYSTAL_RADIUS*2
    };


// Snowballs' mask
actors.crystal_mask = new Mask(function(context){
    context.beginPath();
    context.arc(
        crystal_start_position.x + CRYSTAL_RADIUS,
        crystal_start_position.y + CRYSTAL_RADIUS,
        CRYSTAL_RADIUS,
        0.75*Math.PI,
        2.25 * Math.PI,
        false
    );

    context.closePath();

    // context.fillStyle ='green';
    // context.fill();
});

// Snowballs instances
var SNOWBALL_COUNT = parseInt(getUrlParameter('snowballs', 500)),
    SNOWBALL_MIN_SIZE = 2,
    SNOWBALL_MAX_SIZE = 10,
    SNOWBALL_SPEED = 0.3,
    SHAKE_SPEED = 3.0,
    SNOWBALL_BASE_Y_POSITION = crystal_start_position.y + CRYSTAL_RADIUS*1.6;

// Crystal center coordinates
var xc = crystal_start_position.x + CRYSTAL_RADIUS,
    yc = crystal_start_position.y + CRYSTAL_RADIUS;

for(var i = 0; i < SNOWBALL_COUNT; i++){
    var size = Math.random()*(SNOWBALL_MAX_SIZE - SNOWBALL_MIN_SIZE) + SNOWBALL_MIN_SIZE,
        x = crystal_start_position.x + CRYSTAL_RADIUS*2*Math.random(),
        y = SNOWBALL_BASE_Y_POSITION

    // Build (expect generated alpha)
    var temp = new SnowBall(
        {
            x: x,
            y: y
        },
        size
    );

    // Bulk temporal
    actors['snowball_' + i] = temp;

}

// Unmask snowballs instance
actors.unmask_1 = new Unmask();

// Actions / Animations controls
var SHAKE_EXPANSION_FACTOR = 0.025,
    FALLING_FADE_FACTOR = 0.01;

// Scene instance
var my_scene = new Scene(canvas, actors, function(delta_time){

    // If the device is being shaked
    if(this.state.shaked){
        var current = undefined;

        // Move the snowballs from it's current location to the new one
        for(var i = 0; i < SNOWBALL_COUNT; i++){
            current = this.actors['snowball_' + i];

            // A little expansion factor each time
            current.displaceX(SHAKE_EXPANSION_FACTOR * (current.i_position.x - current.position.x), delta_time);
            current.displaceY(SHAKE_EXPANSION_FACTOR * (current.i_position.y - current.position.y), delta_time);

            // When there is at least 
            if(floatsAreEqual(current.position.x, current.i_position.x, 0.1) &&
                floatsAreEqual(current.position.y, current.i_position.y, 0.1)){
                this.state.falling = true;
                this.state.shaked = false;


                for(var j = 0; j < SNOWBALL_COUNT; j++){
                    this.actors['snowball_' + j].speed = 0.0;
                }
            }
        }
    }

    if(this.state.falling){
        for(var i = 0; i < SNOWBALL_COUNT; i++){
            current = this.actors['snowball_' + i];

            if(current.position.y < SNOWBALL_BASE_Y_POSITION){
                current.speed += (SNOWBALL_SPEED*current.alpha - current.speed)*FALLING_FADE_FACTOR;

                current.displaceY(current.speed, delta_time);
            }
        }
    }

});

my_scene.state.shaked = false;
my_scene.state.falling = false;

var my_director = new Director(my_scene);

my_director.action(); // Action!


function shake(e){
    my_scene.state.shaked = true;
    my_scene.state.falling = false;

    var current = undefined;
    for(var i = 0; i < SNOWBALL_COUNT; i++){
        current = my_scene.actors['snowball_' + i];
        current.i_position.x = crystal_start_position.x + CRYSTAL_RADIUS*2*Math.random();
        current.i_position.y = crystal_start_position.y + CRYSTAL_RADIUS*2*Math.random();
    }
}

jQuery(".crystal").click(shake);

//create a new instance of shake.js.
var myShakeEvent = new Shake({
    threshold: 5
});

// start listening to device motion
myShakeEvent.start();

// register a shake event
window.addEventListener('shake', shake, false);