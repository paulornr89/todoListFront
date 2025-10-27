import './step.css'
import '../list.css'
import { useContext } from 'react';
import { ToDoContext } from '../../../context/ToDoContext';

export default function ToDoStepList({etapas, id}) {
    const { alteraCorEtapa, removerEtapa } = useContext(ToDoContext);
    return <>
        <h2>Etapas da Tarefa</h2>
        <ul className='listaEtapas'>
            {etapas.map((etapa) => 
                <li className={etapa.statusColor} key={etapa.id} onClick={()=> {alteraCorEtapa(etapa.id)
                    
                }}><span>{etapa.descricao.toUpperCase()}</span><button className='closeButton' onClick={(e) => {
                    e.stopPropagation();
                    removerEtapa(id, etapa.id);
                }}>X</button></li>   
            )}
        </ul>
    </>
}