import {SearchUserType, UserType} from "./GitHub";
import {useEffect, useState} from "react";
import axios from "axios";
import {Timer} from "./Tiemer";
import Preloader from "../components/common/Preloader/Preloader";
import s from './GitHub.module.css'

const TimerSecond =27

type UserDetailsPropsType ={
    selectedUser: SearchUserType | null
}

export const UserDetails =(props:UserDetailsPropsType)=>{
    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    const [second, SetSecond] = useState(TimerSecond)
    const [spinner, SetSpinner] = useState(false)

    useEffect(()=>{
        if(second<1){
            setUserDetails(null)
        }
    },[second])

    useEffect(()=>{
        if(!!props.selectedUser){
            SetSpinner(true)
            axios.get<UserType>(`https://api.github.com/users/${props.selectedUser.login}`)
                .then(res=>{
                    SetSecond(TimerSecond)
                    setUserDetails(res.data)
                    SetSpinner(false)
                    })
        }

    },[props.selectedUser])

    if(spinner){
        return <Preloader/>
    }

return <div>

                       { userDetails && <div className={s.username}>
                           <Timer second={second} onChange={SetSecond} timerKey={userDetails.id.toString()}/>
                           <h2>{userDetails.login}</h2>
                           <img src={userDetails.avatar_url}/>
                           <br/>
                            <b>id:</b> {userDetails.id}
                           <br/>
                           <b>followers: </b>{userDetails.followers}

                       </div>
                       }
                   </div>
}