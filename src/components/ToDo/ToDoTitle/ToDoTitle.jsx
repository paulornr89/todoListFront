import './title.css'

export default function ToDoTitle({titulo, setTitulo, tituloRef}) {
    return <>
        <h2>Título</h2>
        <input ref={tituloRef} type="text" placeholder="Digite o título da tarefa" value={titulo} onChange={(e) => {setTitulo(e.target.value)}}/>
    </>
}