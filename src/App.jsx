import { use, useState } from 'react'
import './App.css'
import ToDoCreate from './components/ToDo/ToDoCreate'
import TodoList from './ToDoList/ToDoList' 

function App() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  return (
    <>
      <h1>TodoList</h1>
      <ToDoCreate
        titulo={titulo}
        setTitulo={setTitulo}
        descricao={descricao}
        setDescricao={setDescricao}
      />

      <button className='novaTarefa' onClick={()=>{
        setTitulo
        sessionStorage.setItem(`tarefas`,JSON.stringify({titulo: titulo, descricao: descricao}));
        console.log(sessionStorage.getItem('tarefas'));
      }}>Nova Tarefa</button>
      {/* <TodoList/> */}

    </>
  )
}

export default App
