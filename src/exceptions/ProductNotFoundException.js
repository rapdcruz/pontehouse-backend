function ProductNotFoundException(id){
this.id = id;
this.message = "The product with id: '{id}' does not exist." ;
this.toString = function(){
    return this.message.replace("{id}", id);
}
}

module.exports = ProductNotFoundException;
