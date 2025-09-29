import ToDoTitle from "./ToDoTitle/ToDoTitle"
import ToDoText from "./ToDoText/ToDoText"

export default function ToDoCreate({titulo, setTitulo, descricao, setDescricao}) {
    return <>
        <ToDoTitle titulo={titulo} setTitulo={setTitulo}/>
        <ToDoText descricao={descricao} setDescricao={setDescricao}/>
    </>
}
