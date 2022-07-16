function InvalidStockValueException(value){
    this.value = value;
    this.message = "The value '{value}' is invalid. The stock value need to be greater or equal than zero." ;
    this.toString = function(){
        return this.message.replace("{value}", value);
    }
    }
    
    module.exports = InvalidStockValueException;