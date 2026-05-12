export default function MapsExe(){
    const frutas = ["Maçã", "Banana", "Pera", "Uva", "Uva", "Limão"];

    const listaEstilo = {
        display: 'flex',           // Ativa o Flexbox
        flexDirection: 'row',      // Alinha os itens em linha (horizontal)
        gap: '15px',               // Espaçamento entre os itens
        padding: '20px',
        backgroundColor: '#e3f2fd',
        borderRadius: '10px',
        listStylePosition: 'inside' // Garante que o número da lista apareça
      };
    
      const itemEstilo = {
        backgroundColor: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontWeight: '600'
      };
    return(
        <div style={{padding: '20px', fontSize:'sanz-serif '}}>
          <ol style ={listaEstilo}>
            {frutas.map((fruta, index)=> (
               <li key ={index} style={itemEstilo}> 
                {fruta}
                </li>
            ))}
            </ol>
        </div>
    )
} 