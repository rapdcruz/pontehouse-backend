function UserNotFoundException(userId){
this.userId = userId;
this.message = "The user with id: '{userId}' does not exist." ;
this.toString = function(){
    return this.message.replace("{userId}", userId);
}
}

module.exports = UserNotFoundException;
