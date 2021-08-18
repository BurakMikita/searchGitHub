import s from './GitHub.module.css'
import {useEffect, useState} from "react";
import { Search} from "./Search";
import {UserDetails} from "./UserDetails";
import {UserList} from "./UserList";





export type SearchUserType = {
    login:string,
    id: number
}
export type  SearchResult = {
    items: SearchUserType []
}
export type UserType = {
    login:string
    id:number
    avatar_url:string
    followers:number
}

export const GitHub = ()=>{

const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
const [searchTerm , setSearchTerm] = useState('it')


    useEffect(()=>{
        if(selectedUser){
            document.title = selectedUser.login
        }
    },[selectedUser])






    return <div>
        <h1 className={s.h1}>Поиск по gitHub</h1>
    <div className={s.Container}>
        <div className={s.item} >
         <Search onSubmit={(fixedValue:string)=>{setSearchTerm(fixedValue)}} value={searchTerm}/>
            <button className={s.button3} onClick={()=>{setSearchTerm('it')}}>скинуть</button>
         <UserList term={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser}/>
        </div>
        <div className={s.item} >
        <UserDetails selectedUser={selectedUser}/>

        </div>
    </div>
    </div>
}