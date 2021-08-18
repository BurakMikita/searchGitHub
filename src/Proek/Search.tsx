import {useEffect, useState} from "react";





type SearchPropsType = {
    value:string
    onSubmit: (fixedValue:string)=>void
}

export const Search = (props:SearchPropsType) => {
    const [tempSearch , setTempSearch ] = useState('')

    useEffect(()=>{
        setTempSearch(props.value)
    },[props.value])
    return  (  <div>
        <input value={tempSearch} onChange={e=>setTempSearch(e.currentTarget.value)} placeholder='serch'/>
        <button  onClick={()=>{
            props.onSubmit(tempSearch)
        }
        }>find</button>
    </div>)
}