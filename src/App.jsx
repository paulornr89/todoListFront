import { use, useState } from 'react'
import './App.css'
import ToDoCreate from './components/ToDo/ToDoCreate'
import TodoList from './components/ToDoList/ToDoList'

function App() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [tarefEmEdicao, setTarefEmEdicao] = useState(null);

  function excluirTarefa(id) {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novasTarefas);
  }

  function editarTarefa(modoEdicao, idTarefa, tituloTarefa, descricaoTarefa) {
    setModoEdicao(modoEdicao);
    setTarefEmEdicao(idTarefa);
    setTitulo(tituloTarefa);
    setDescricao(descricaoTarefa);
  }

  function adicionarEtapa(tarefaId, descricaoEtapa) {
    const novaEtapa = {id: Date.now(), descricao: descricaoEtapa};
    
    const tarefasAtualizadas = tarefas.map((tarefa) => {
      if(tarefa.id === tarefaId) {
        return { ...tarefa, etapas: [...tarefa.etapas, novaEtapa] };
      }
      return tarefa;
    });
    setTarefas(tarefasAtualizadas);
  }

  function removerEtapa(tarefaId, etapaId) {
    const tarefasAtualizadas = tarefas.map((tarefa) => {
      if(tarefa.id == tarefaId) {
        const etapasAtualizadas = tarefa.etapas.filter((etapa) => etapa.id !== etapaId);
        return { ...tarefa, etapas: etapasAtualizadas };
      }
      return tarefa;
    });
    setTarefas(tarefasAtualizadas);
  }

  return (
    <>
      <h1>TodoList</h1>
      <ToDoCreate
        titulo={titulo}
        setTitulo={setTitulo}
        descricao={descricao}
        setDescricao={setDescricao}
      />

      {
        !modoEdicao ?
          <button className='actionButton' onClick={()=>{
            sessionStorage.setItem(`tarefas`,JSON.stringify({titulo: titulo, descricao: descricao}));
            if(titulo !== '' && descricao !== '') {
              setTarefas([...tarefas, {id: tarefas.length + 1, titulo: titulo, descricao: descricao, etapas:[]}]);
              setTitulo('');
              setDescricao('');
            } else {
              alert('Por favor, preencha todos os campos antes de adicionar uma nova tarefa.');
            }
          }}>Nova Tarefa</button>
          :
          <button className='actionButton' onClick={() => {
            const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== tarefEmEdicao);
            const etpas = tarefas.find((tarefa) => tarefa.id === tarefEmEdicao).etapas;
            setTarefas([...novasTarefas, {id: tarefEmEdicao, titulo: titulo, descricao: descricao, etapas: etpas}]);
            setModoEdicao(false);
            setTarefEmEdicao(null);
            setTitulo('');
            setDescricao('');
          }}>Editar Tarefa</button>
      }
      <TodoList tarefas={tarefas} excluirTarefa={excluirTarefa} editarTarefa={editarTarefa} adicionarEtapa={adicionarEtapa} removerEtapa={removerEtapa}/>
    </>
  )
}

export default App
