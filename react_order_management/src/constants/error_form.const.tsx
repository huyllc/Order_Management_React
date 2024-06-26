import React from "react"

interface Props {
    title:   string,
    type:   "pattern"  |
            "onBlur"   |
            "onChange" |
            "max"      | 
            "min"      |
            "disabled" | "value" | "maxLength" | "minLength" | "required" | "shouldUnregister" | "validate" | "setValueAs" | "deps" | "valueAsNumber" | "valueAsDate" | undefined
}



const Required = (type: string,title: string) => {

    const renderError = () => {
        let name = ''
        // eslint-disable-next-line default-case
        switch(type){
            case 'required' :
                name = title + 'This field cannot be left blank'
                break
            // case 'min' :
            //     name = title + 'This field cannot be left blank'
            //     break
            // case 'max' :
            //     name = title + 'This field cannot be left blank'
            //     break
            // case 'pattern' :
            //     name = title + 'This field cannot be left blank'
            //     break
            default:
            break
        }

        return name
    }

    return(
        <div>
           <p className="p-0 m-0 text-danger mt-1">{renderError()}</p>
        </div>
    )
}
export default Required