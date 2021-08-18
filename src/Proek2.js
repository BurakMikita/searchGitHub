import s from './Proekt2/style.module.css'
import {Todolist} from "./Proekt2/Todolist";
import {useEffect, useState} from "react";
import React from "react";
import Context from "./Proekt2/context";
import TodoForm from "./Proekt2/todoForma";
import Preloader from "./components/common/Preloader/Preloader";
import {Modal} from "./Proekt2/modal";









const AppTwo = ()=>{

    let [todos,setTodos]= useState(  [])
    const [loding, setLoging]= useState(true)

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos=>{
                setTimeout(()=>{
                    setTodos(todos)
                    setLoging(false)
                },1500)
            })


    },[])

   const onCreate = (title)=>{
       setTodos(todos.concat([{
           title,
           id: Date.now(),
           completed:false
       }]))
   }


    const onChange = (id)=>{
        setTodos(todos.map(todo=>{
            if(todo.id ===id){
                todo.completed = !todo.completed
            }
            return todo
            }

        ))
    }

     const removeTodo = (id)=>{
         setTodos(todos.filter(c=> c.id !== id))
    }

    return(
        <Context.Provider value={{removeTodo}}>
            <div className={s.wrapper}>
                <h1>React</h1>
                <Modal/>
                <TodoForm onCreate={onCreate}/>
                {loding && <Preloader/>}
                {todos.length ? <Todolist onChange={onChange} todos={todos}/>: loding ? null : <p> нет текста  </p> }

            </div>
        </Context.Provider>


    )

}




export default AppTwo