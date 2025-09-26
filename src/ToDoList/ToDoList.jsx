import './list.css'

export default function TodoList({tarefa}) {
    return <>
        <h2>Lista de Tarefas</h2>
        <ul>
            <li>
                <h3>{tarefa.titulo}</h3>
                <p>{tarefa.descricao}</p>
            </li>    
        </ul>
    </>
}