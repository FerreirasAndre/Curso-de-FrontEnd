import Produtos from "./Produtos"


export default function ListaProdutos(props){
    return( 
        <div>
            <h3 style={{margin:'5px 0', color:'blue'}}>{props.nome}</h3>
            <h3 style={{margin:'5px 0', color:'blue'}}>{props.preco}</h3>
            <h3 style={{margin:'5px 0', color:'blue'}}>{props.categoria}</h3>
            <br></br>
        </div>
    )
}