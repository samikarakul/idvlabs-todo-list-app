export const CheckFormValuesNullOrEmpty = (formElements) => {
    if(!formElements) return false;
    for(let i=0; i<formElements.length; i++)
    {
        if(formElements[i].type === "text" || formElements[i].type === "password")
        {
            if(!formElements[i].value) return false;
        }
    }
    return true;
}

export const CreateObjectWithFormValues = (formElements) => {
    let tmpObj = {};
    for(let i=0; i<formElements.length; i++){
        if((formElements[i].type === "text" || formElements[i].type === "password") && formElements[i].name)
        {
            tmpObj[formElements[i].name] = formElements[i].value;
        }
    }
    return tmpObj;
}

export const CheckObjectValuesNullorEmpty = (object) => {
    for (const [key, value] of Object.entries(object)) {
        if(value == null || value == undefined) return false;
    }
    return true;
}

export const IsObjectContainsRequiredProps = (object, requiredProps) => {
    if(Object.keys(object).length){
        for(var i=0; i<requiredProps.length; i++){
            if(!Object.keys(object).includes(requiredProps[i])) return false;
        }
        return true;
    }
    return false;
}