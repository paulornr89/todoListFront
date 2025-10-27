import { useContext } from 'react';
import { ToDoContext } from './context/ToDoContext';
import './App.css'
import ToDoCreate from './components/ToDo/ToDoCreate';
import TodoList from './components/ToDoList/ToDoList';

function App() {
  const {tituloRef, descricaoRef, tarefas, modoEdicao, tarefEmEdicao, setTarefas, setModoEdicao, setTarefEmEdicao} = useContext(ToDoContext);


  return (
    <>
      <h1>TodoList</h1>
      <ToDoCreate
        tituloRef={tituloRef}
        descricaoRef={descricaoRef}
      />

      {
        !modoEdicao ?
          <button className='actionButton' onClick={()=>{

            if(tituloRef.current.value !== '' && descricaoRef.current.value !== '') {
              const novaTarefa =  {id: Date.now(), titulo: tituloRef.current.value, descricao: descricaoRef.current.value, etapas:[], statusColor: 'default'};
              setTarefas([...tarefas, novaTarefa]);
              descricaoRef.current.value = '';
              tituloRef.current.value = '';
            } else {
              alert('Por favor, preencha todos os campos antes de adicionar uma nova tarefa.');
            }
          }}>Nova Tarefa</button>
          :
          <button className='actionButton' onClick={() => {
            const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== tarefEmEdicao);
            const etapas = tarefas.find((tarefa) => tarefa.id === tarefEmEdicao).etapas;
            console.log('Etapas da tarefa em edição:', etapas);
            setTarefas([...novasTarefas, {id: tarefEmEdicao, titulo: tituloRef.current.value, descricao: descricaoRef.current.value, etapas: etapas}]);
            setModoEdicao(false);
            setTarefEmEdicao(null);
            tituloRef.current.value = '';
            descricaoRef.current.value = '';
          }}>Editar Tarefa</button>
      }
      <TodoList/>
    </>
  )
}

export default App
