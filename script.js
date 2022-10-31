let nick ={
    name:''
}
nick.name = prompt("Qual o seu nome?");
console.log(nick);

function login(){
    const requestlogin = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nick);
    requestlogin.then(SucessoLogin);
    requestlogin.catch(ErroLogin);
}

login();

function SucessoLogin(){
    alert("Logado com sucesso");
}

function ErroLogin(){
    nick.name = prompt("Nome já em uso ou inválido, digite outro:");
    login();
}

function afk(){
    const requestAfk = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nick);
    console.log(requestAfk);
}

setInterval(afk, 5000);