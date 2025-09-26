import './list.css'
import ToDoTask from './ToDoTask'

export default function TodoList({tarefas}) {

    return <>
        <h2>Lista de Tarefas</h2>
        <ul>
            {tarefas.map((tarefa) => (
                <ToDoTask key={tarefa.id} titulo={tarefa.titulo} descricao={tarefa.descricao}/>
            ))}
        </ul>
    </>
}