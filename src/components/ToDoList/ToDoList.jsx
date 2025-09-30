import './list.css'
import ToDoTask from './ToDoTask'

export default function TodoList({tarefas, excluirTarefa, editarTarefa, adicionarEtapa, removerEtapa, alteraCorEtapa}) {
    return <>
        <h2>Lista de Tarefas</h2>
        <ul>
            {tarefas.map((tarefa) => (
                <ToDoTask 
                    key={tarefa.id} 
                    id={tarefa.id} 
                    titulo={tarefa.titulo} 
                    descricao={tarefa.descricao} 
                    excluirTarefa={excluirTarefa} 
                    editarTarefa={editarTarefa}
                    adicionarEtapa={adicionarEtapa}
                    etapas={tarefa.etapas}
                    removerEtapa={removerEtapa}
                    alteraCorEtapa={alteraCorEtapa}
                />
            ))}
        </ul>
    </>
}