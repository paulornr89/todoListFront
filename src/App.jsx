import { useState, useEffect, useRef } from 'react'
import './App.css'
import ToDoCreate from './components/ToDo/ToDoCreate'
import TodoList from './components/ToDoList/ToDoList'

function App() {
  const tituloRef = useRef(null);
  const descricaoRef = useRef(null);
  const descricaoEtapaRef = useRef(null);
  const [tarefas, setTarefas] = useState(localStorage.length > 0 ? JSON.parse(localStorage.getItem('minhasTarefas')) : []);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [tarefEmEdicao, setTarefEmEdicao] = useState(null);

  useEffect(() => {
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  function excluirTarefa(id) {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novasTarefas);
  }

  function editarTarefa(modoEdicao, idTarefa, titulo, descricaoTarefa) {
    setModoEdicao(modoEdicao);
    setTarefEmEdicao(idTarefa);
    tituloRef.current.value = titulo;
    descricaoRef.current.value = descricaoTarefa;
  }

  function alteraCorEtapa(idEtapa) {
    const tarefasAtualizadas = tarefas.map((tarefa) => {
      const etapasAtualizadas = tarefa.etapas.map((etapa) => {
        if(etapa.id === idEtapa) {
          const novaCor = etapa.statusColor === 'default' ? 'success' : 'default';
          return { ...etapa, statusColor: novaCor };
        }
        return etapa;
      });
      return { ...tarefa, etapas: etapasAtualizadas };
    });
    setTarefas(tarefasAtualizadas);
  }

  function adicionarEtapa(tarefaId) {
    const novaEtapa = {id: Date.now(), descricao: descricaoEtapaRef.current.value, statusColor: 'default'};
    
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
      <TodoList tarefas={tarefas} excluirTarefa={excluirTarefa} editarTarefa={editarTarefa} descricaoEtapaRef={descricaoEtapaRef} adicionarEtapa={adicionarEtapa} removerEtapa={removerEtapa} alteraCorEtapa={alteraCorEtapa}/>
    </>
  )
}

export default App
