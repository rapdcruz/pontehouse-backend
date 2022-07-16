function InvalidMinValueException(value){
    this.value = value;
    this.message = "The value '{value}' is invalid. The min value need to be greater or equal than zero." ;
    this.toString = function(){
        return this.message.replace("{value}", value);
    }
    }
    
    module.exports = InvalidMinValueException;