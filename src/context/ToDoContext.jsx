import { createContext, useState, useEffect, useRef } from 'react';

export const ToDoContext = createContext();

export const ToDoProvider = ({children}) => {
    const tituloRef = useRef(null);
    const descricaoRef = useRef(null);
    const descricaoEtapaRef = useRef(null);
    const [tarefas, setTarefas] = useState(localStorage.length > 0 ? JSON.parse(localStorage.getItem('minhasTarefas')) : []);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [tarefEmEdicao, setTarefEmEdicao] = useState(null);

    useEffect(() => {
        localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
    }, [tarefas]);

    function excluirTarefa(id) {
        const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
        setTarefas(novasTarefas);
    }

    function editarTarefa(modoEdicao, idTarefa, titulo, descricaoTarefa) {
        setModoEdicao(modoEdicao);
        setTarefEmEdicao(idTarefa);
        tituloRef.current.value = titulo;
        descricaoRef.current.value = descricaoTarefa;
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

    function adicionarEtapa(tarefaId) {
        const novaEtapa = {id: Date.now(), descricao: descricaoEtapaRef.current.value, statusColor: 'default'};
        
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

    const contextValue = {
        tituloRef,
        descricaoRef,
        descricaoEtapaRef,
        tarefas,
        modoEdicao,
        tarefEmEdicao,
        setTarefas,
        excluirTarefa,
        editarTarefa,
        alteraCorEtapa,
        adicionarEtapa,
        removerEtapa,
        setModoEdicao,
        setTarefEmEdicao
    }

    return (
        <ToDoContext.Provider value={contextValue}>
            {children}
        </ToDoContext.Provider>
    );
}