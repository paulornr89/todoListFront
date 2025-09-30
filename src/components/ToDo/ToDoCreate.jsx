import ToDoTitle from "./ToDoTitle/ToDoTitle"
import ToDoText from "./ToDoText/ToDoText"

export default function ToDoCreate({tituloRef, descricaoRef}) {
    return <>
        <ToDoTitle tituloRef={tituloRef}/>
        <ToDoText descricaoRef={descricaoRef}/>
    </>
}
