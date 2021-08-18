import {useEffect, useState} from "react";

type TimerPropsType ={
    second : number
    onChange:(actualSecond:number)=>void
    timerKey: string
}

export const Timer =(props:TimerPropsType) =>{
 const [second , setSecond] = useState(props.second)

useEffect(()=>{
    setSecond(props.second)
},[props.second])

    useEffect(()=>{
        props.onChange(second)
    },[second])

    useEffect(()=>{
    const intervalId = setInterval(()=>{
          setSecond((prev)=>prev-1)
      },1000)
        return ()=>{clearInterval(intervalId)}
    },[props.timerKey])

    return <div>{second}</div>
}