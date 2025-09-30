import './text.css'

export default function ToDoText({descricaoRef}) {
    return <>
        <h2>Descrição</h2>
        <textarea ref={descricaoRef} placeholder="Digite a descrição da tarefa"></textarea>
    </>
}