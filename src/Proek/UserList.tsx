
import s from "./GitHub.module.css";
import {SearchResult, SearchUserType} from "./GitHub";
import {useEffect, useState} from "react";
import axios from "axios";
import Preloader from "../components/common/Preloader/Preloader";



type UserListPropsType = {
    term:string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType)=>void
}



export const UserList = (props:UserListPropsType) => {
    const [users , SetUsers] = useState<SearchUserType []>([])
    const [spinner, SetSpinner] = useState(false)

    useEffect(()=>{
        SetSpinner(true)
        axios.get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res=>{
                SetUsers(res.data.items)
                SetSpinner(false)})
    },[props.term])

  if(spinner){
      return <Preloader/>
  }
    return (
        <div>
        <ul>{ users.map((u:any)=><li  className={props.selectedUser ===u ? s.selector : ''}
                               onClick={()=>{props.onUserSelect(u)}
                               }
                               key={u.id}
            >{u.login}</li>)
            }
        </ul>
</div>
    )
}