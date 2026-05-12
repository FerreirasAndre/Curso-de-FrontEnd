import React, {useState, useEffect} from 'react';

export default function ApiViaCep(){
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [loaddind, setLoading] = useState(false);
    const [error, setError]=useState(null);

    useEffect(()=>{
        if (cep.length ===8){
            const buscaCep = async ()=> {
                setLoading(true);
                setError(null);
                setEndereco(null);

                try{
                    const response = await fetch (`https://viacep.com.br/ws/${cep}/json/`);
                    const data = await response.json();

                    if (data.erro){
                        setError("CEP não encontrado");
                    } else {
                        setEndereco(data);
                    }
                    }catch(err){
                        setError("Falha ao comunicar com a API");
                    } finally{
                        setLoading(false)
                    }
                };               
           buscaCep();     
        }else{
            setEndereco(null)
            setError(null)
        }
    },[cep]); 

    return (
        <div>
            <h1>API Via CEP</h1>
            <p>Digite o CEP desejado</p>

            <input
            type='text'
            placeholder='CEP'
            maxLength={8}
            value={cep}
            onChange={(e) =>setCep(e.target.value.replace(/\D/g,''))}  
            />

            <hr />
            {loaddind && <p>Buscando dados...</p>}

            {error && <p style={{color:'red'}}>{error}</p>}

            {endereco &&(
                <div>
                    <h3>Resultado da busca</h3>
                    <p><strong>Rua</strong>{endereco.logradouro}</p>
                    <p><strong>Bairro</strong>{endereco.bairro}</p>
                    <p><strong>Cidade</strong>{endereco.localidade} - {endereco.uf}</p>
                </div>
            )}

            {!cep &&<p>Aguardando entrada...</p>}

        </div>
    )
}