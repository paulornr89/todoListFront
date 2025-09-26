import editar from '../../assets/edit.png'
import excluir from '../../assets/delete.png'
import etapas from '../../assets/value-chain.png'
import './task.css'

export default function ToDoTask({titulo, descricao, id, excluirTarefa, editarTarefa}) {
    return <>
        <li>
            <div className="opcoesDaTarefa">
                <button onClick={() => {editarTarefa(true, id, titulo, descricao)}}><img src={editar} title="editar"/></button>
                <button onClick={() => excluirTarefa(id)}><img src={excluir} title="excluir"/></button>
                <button><img src={etapas} title='etapas'/></button>
            </div>
            <h3>{titulo}</h3>
            <p>{descricao}</p>
        </li>    
    </>
}