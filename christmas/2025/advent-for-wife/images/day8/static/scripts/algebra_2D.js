Algebra2D = {
    sum: function(v1, v2){
        return {
            x: v1.x + v2.x,
            y: v1.y + v2.y
        };
    },
    diff: function(v1, v2){
        return {
            x: v1.x - v2.x,
            y: v1.y - v2.y
        };
    },
    norm: function(v){
        return Math.sqrt(v.x*v.x + v.y*v.y);
    },
    normalize: function(v){
        return {
            x: v.x / Math.sqrt(v.x*v.x + v.y*v.y),
            y: v.y / Math.sqrt(v.x*v.x + v.y*v.y)
        };
    },
    byScalar: function(v, s){
        return {
            x: v.x * s,
            y: v.y * s
        };
    }
};