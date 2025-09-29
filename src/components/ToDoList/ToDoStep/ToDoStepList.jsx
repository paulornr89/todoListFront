import './step.css'
import '../list.css'

export default function ToDoStepList({etapas, removerEtapa, id}) {
    return <>
        <h2>Etapas da Tarefa</h2>
        <ul className='listaEtapas'>
            {etapas.map((etapa) => 
                <li key={etapa.id}><span>{etapa.descricao.toUpperCase()}</span><button className='closeButton' onClick={() => {
                    removerEtapa(id, etapa.id);
                }}>X</button></li>   
            )}
        </ul>
    </>
}