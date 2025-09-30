import editar from '../../assets/edit.png'
import excluir from '../../assets/delete.png'
import etapasIcon from '../../assets/value-chain.png'
import check from '../../assets/marca-de-verificacao.png'
import StepList from './ToDoStep/ToDoStepList'
import { useState, useRef, useEffect } from 'react';
import './task.css'

export default function ToDoTask({titulo, descricao, id, excluirTarefa, editarTarefa, descricaoEtapaRef, adicionarEtapa, etapas, removerEtapa, alteraCorEtapa}) {
    const [novaEtapa, setNovaEtapa] = useState(false);    
    const tarefaCompleta = etapas.length > 0 && etapas.every(etapa => etapa.statusColor === 'success');

    return <>
        <li className={tarefaCompleta ? 'successTask' : 'defaultTask'}> 
            <div className="opcoesDaTarefa">
                <button onClick={() => {editarTarefa(true, id, titulo, descricao)}}><img src={editar} title="editar"/></button>
                <button onClick={() => {excluirTarefa(id)}}><img src={excluir} title="excluir"/></button>
                <button onClick={() => {setNovaEtapa(true)}}><img src={etapasIcon} title='etapas'/></button>
            </div>
            <h3>{titulo}</h3>
            <p>{descricao}</p>
            
            {etapas.length > 0 && <StepList etapas={etapas} removerEtapa={removerEtapa} id={id} alteraCorEtapa={alteraCorEtapa}/>}
        </li>    
        {novaEtapa && (
            <div className='overlay'>
                <div className="modal">
                    <button className='closeButton' onClick={() => setNovaEtapa(false)}>X</button>
                    <h2>Nova Etapa</h2>
                    <span>
                        <input ref={descricaoEtapaRef} type="text" placeholder='Descrição da Etapa'/>
                        <button onClick={() => {
                            adicionarEtapa(id, descricaoEtapaRef.current.value);
                            descricaoEtapaRef.current.value = '';
                            setNovaEtapa(false)
                        }}><img src={check}/></button>
                    </span>
                </div>
            </div>
        )}
    </>
}