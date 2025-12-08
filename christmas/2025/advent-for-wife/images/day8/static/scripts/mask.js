Mask.prototype = Object.create(Actor.prototype);
Mask.constructor = Mask;

function Mask(shape_function){
    this.shape_function = shape_function;
}

Mask.prototype.draw = function(context){
    context.save();
    this.shape_function(context);
    context.clip();
}

Unmask.prototype = Object.create(Actor.prototype);
Unmask.constructor = Unmask;

function Unmask(){}

Unmask.prototype.draw = function(context){
    context.restore();
}