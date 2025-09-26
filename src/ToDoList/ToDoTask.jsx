export default function ToDoTask({titulo, descricao}) {
    return <>
        <li>
            <h3>{titulo}</h3>
            <p>{descricao}</p>
        </li>    
    </>
}