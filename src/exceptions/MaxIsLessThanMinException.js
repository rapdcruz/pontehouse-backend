function MaxIsLessThanMinException(min, max){
this.min = min;
this.max = max;

this.message = "The max value '{max}' cannot be less than min value '{min}'." ;
this.toString = function(){
    return this.message.replace("{min}", min).replace("{max}", max);
}
}

module.exports = MaxIsLessThanMinException
;
