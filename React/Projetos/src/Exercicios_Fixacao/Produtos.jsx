import ListaProdutos from "./ListaProdutos";

export default function Produtos(){
    return(
        <div style={{
                border: '1px solid #ccc', 
                padding: '10px', 
                margin: '10px', 
                borderRadius: '8px'
        }}>
            <h1>Loja de Produtos</h1>
            <ListaProdutos
                nome="Mouse Gamer"
                preco={89.90}
                temEstoque={true}
                categoria="Periféricos"
            />

            <ListaProdutos
                nome="Teclado Mecânico"
                preco={250.00}
                temEstoque={false}
                categoria="Periféricos"
            />

            <ListaProdutos
                nome="Headset USB" 
                preco={180.00} 
                temEstoque={true} 
                categoria="Áudio"
            />
            
        </div>
    )
} 