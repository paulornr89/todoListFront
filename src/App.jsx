import { use, useState } from 'react'
import './App.css'
import ToDoCreate from './components/ToDo/ToDoCreate'
import TodoList from './ToDoList/ToDoList' 

function App() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tarefas, setTarefas] = useState([]);

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
        sessionStorage.setItem(`tarefas`,JSON.stringify({titulo: titulo, descricao: descricao}));
        if(titulo !== '' && descricao !== '') {
          setTarefas([...tarefas, {id: tarefas.length + 1, titulo: titulo, descricao: descricao}]);
        } else {
          alert('Por favor, preencha todos os campos antes de adicionar uma nova tarefa.');
        }
      }}>Nova Tarefa</button>
      <TodoList tarefas={tarefas}/>

    </>
  )
}

export default App
