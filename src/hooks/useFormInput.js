import { useState } from "react";

const useFormInput = (inputObject ={}) => {
    const [inputs, setInputs] = useState(inputObject) 

    const changeHandler= (e) => { 
        const { name , value } = e.target

        setInputs({
            ...inputs, 
            [name]: value,
        })
     }

     const resetForm =() => setInputs(inputObject)

    return ({ inputs , onChange: changeHandler , resetForm});
}
 
export default useFormInput;