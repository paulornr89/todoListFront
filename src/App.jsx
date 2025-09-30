import { useState, useEffect } from 'react'
import './App.css'
import ToDoCreate from './components/ToDo/ToDoCreate'
import TodoList from './components/ToDoList/ToDoList'

function App() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tarefas, setTarefas] = useState(localStorage.length > 0 ? JSON.parse(localStorage.getItem('minhasTarefas')) : []);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [tarefEmEdicao, setTarefEmEdicao] = useState(null);

  useEffect(() => {
    console.log("Estado de tarefas mudou, salvando no sessionStorage...");
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
  }, [tarefas]);

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

  function adicionarEtapa(tarefaId, descricaoEtapa) {
    const novaEtapa = {id: Date.now(), descricao: descricaoEtapa, statusColor: 'default'};
    
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
            if(titulo !== '' && descricao !== '') {
              const novaTarefa =  {id: Date.now(), titulo: titulo, descricao: descricao, etapas:[], statusColor: 'default'};
              setTarefas([...tarefas, novaTarefa]);
              setTitulo('');
              setDescricao('');
            } else {
              alert('Por favor, preencha todos os campos antes de adicionar uma nova tarefa.');
            }
          }}>Nova Tarefa</button>
          :
          <button className='actionButton' onClick={() => {
            const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== tarefEmEdicao);
            const etapas = tarefas.find((tarefa) => tarefa.id === tarefEmEdicao).etapas;
            setTarefas([...novasTarefas, {id: tarefEmEdicao, titulo: titulo, descricao: descricao, etapas: etapas}]);
            setModoEdicao(false);
            setTarefEmEdicao(null);
            setTitulo('');
            setDescricao('');
          }}>Editar Tarefa</button>
      }
      <TodoList tarefas={tarefas} excluirTarefa={excluirTarefa} editarTarefa={editarTarefa} adicionarEtapa={adicionarEtapa} removerEtapa={removerEtapa} alteraCorEtapa={alteraCorEtapa}/>
    </>
  )
}

export default App
