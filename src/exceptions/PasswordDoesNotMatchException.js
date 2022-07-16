function PasswordDoesNotMatch(){

this.message = "The current Password and the old Password does not match." ;
this.toString = function(){
    return this.message;
}
}

module.exports = PasswordDoesNotMatch;
