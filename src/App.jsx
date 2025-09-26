import { use, useState } from 'react'
import './App.css'
import ToDo from './components/ToDo/ToDoMain'
import TodoList from './ToDoList/ToDoList' 

function App() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  return (
    <>
      <h1>TodoList</h1>
      <ToDo
        titulo={titulo}
        setTitulo={setTitulo}
        descricao={descricao}
        setDescricao={setDescricao}
      />

      <button className='novaTarefa' onClick={()=>{
        sessionStorage.setItem
      }}>Nova Tarefa</button>
      <TodoList/>

    </>
  )
}

export default App
