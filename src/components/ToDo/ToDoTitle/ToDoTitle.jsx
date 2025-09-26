import './title.css'

export default function ToDoTitle({titulo, setTitulo}) {
    return <>
        <h2>Título</h2>
        <input type="text" placeholder="Digite o título da tarefa" value={titulo} onChange={(e) => {setTitulo(e.target.value)}}/>
    </>
}