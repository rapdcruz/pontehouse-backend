function UpdateRoleNotAllowException(id){
    this.id = id;
    this.message = "It's not possible update the role of user: {id}, because is the same user logged in." ;
    this.toString = function(){
        return this.message.replace("{id}", id);
    }
    }
    
    module.exports = UpdateRoleNotAllowException;
    