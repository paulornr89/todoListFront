import ToDoTitle from "./ToDoTitle/ToDoTitle"
import ToDoText from "./ToDoText/ToDoText"
import { useRef, useEffect } from "react"

export default function ToDoCreate({titulo, setTitulo, descricao, setDescricao}) {
    const tituloRef = useRef(null);

    useEffect(() => {
        if (tituloRef.current) {
            tituloRef.current.focus();
        }
    }, []);
    return <>
        <ToDoTitle titulo={titulo} setTitulo={setTitulo} tituloRef={tituloRef}/>
        <ToDoText descricao={descricao} setDescricao={setDescricao}/>
    </>
}
