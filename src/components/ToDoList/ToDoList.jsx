import './list.css'
import ToDoTask from './ToDoTask'

export default function TodoList({tarefas, excluirTarefa, editarTarefa}) {

    return <>
        <h2>Lista de Tarefas</h2>
        <ul>
            {tarefas.map((tarefa) => (
                <ToDoTask key={tarefa.id} id={tarefa.id} titulo={tarefa.titulo} descricao={tarefa.descricao} excluirTarefa={excluirTarefa} editarTarefa={editarTarefa}/>
            ))}
        </ul>
    </>
}