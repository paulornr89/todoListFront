import './text.css'

export default function ToDoText({descricao, setDescricao}) {
    return <>
        <h2>Descrição</h2>
        <textarea placeholder="Digite a descrição da tarefa" onChange={(e) => setDescricao(e.target.value)} value={descricao}></textarea>
    </>
}