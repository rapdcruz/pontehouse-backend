function MinIsGreaterThanMaxException(min, max){
    this.min = min;
    this.max = max;
    
    this.message = "The min value '{min}' cannot be greater than max value '{max}'." ;
    this.toString = function(){
        return this.message.replace("{min}", min).replace("{max}", max);
    }
    }
    
    module.exports = MinIsGreaterThanMaxException
    ;
    