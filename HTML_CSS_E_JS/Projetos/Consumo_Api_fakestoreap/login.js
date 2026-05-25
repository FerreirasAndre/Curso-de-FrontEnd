//exemplos de logins válidos

//Usuário: mor_2314
// Senha: 83r5^_

// Usuário: fmesut
// Senha: mypasst

// Usuário: kevinryan
// Senha: kev02937@

// Usuário: donero
// Senha: ewedon

// Usuário: derek
// Senha: jklg*_56

async function fazerLogin(){
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    try{

        const resposta = await fetch("https://fakestoreapi.com/users");
        const usuarios = await resposta.json();
        const usuarioValido = usuarios.find(user =>
            user.username === usuario
        );

        if(usuarioValido){
            localStorage.setItem("usuario", usuario);
            window.location.href = "index.html";

        }else{
            document.getElementById("mensagem").innerText =
            "Usuário inválido";
        }

    }catch(erro){
        console.log("Erro:", erro);
    }

}