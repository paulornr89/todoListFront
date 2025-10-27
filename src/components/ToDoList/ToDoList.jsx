import './list.css'
import ToDoTask from './ToDoTask'
import { useContext } from 'react';
import { ToDoContext } from '../../context/ToDoContext';

export default function TodoList() {
    const { tarefas } = useContext(ToDoContext);
    return <>
        <h2>Lista de Tarefas</h2>
        <ul>
            {tarefas.map((tarefa) => (
                <ToDoTask 
                    key={tarefa.id} 
                    id={tarefa.id} 
                    titulo={tarefa.titulo} 
                    descricao={tarefa.descricao} 
                    etapas={tarefa.etapas}
                />
            ))}
        </ul>
    </>
}