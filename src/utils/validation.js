
    export const emptyCheck=(value)=>{
        if(value==""){
            return false
        }
        else{
            return true
        }
    }
    
   export const emailValidation=(email)=>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(email.match(emailRegex)){
        return true
    }
    return false
    }


    export const passwordValidation=(password)=>{
        if(password.length<8){
            return false
        }
        return true
    }

