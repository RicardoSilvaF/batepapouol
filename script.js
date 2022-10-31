let bancodedados = [];
let aux2 = -1;
let nick ={
    name:''
}
nick.name = prompt("Qual o seu nome?");

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
}

setInterval(afk, 5000);
function promessas(){
    const promessaMSG = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessaMSG.then(tratarSucessoMSG); 
    promessaMSG.catch(tratarErroMSG);
}
promessas();
setInterval(promessas, 3000);

function tratarSucessoMSG(resposta) {
    bancodedados = resposta.data;
    let areaG = document.querySelector(".area-geral");
    areaG.innerHTML = '';
    for(let i = 0; i < bancodedados.length ;i++){
        if(bancodedados[i].type == 'message'){
            areaG.innerHTML += `
                <div class="msg msgnormal x${i}">
                    <span style="color:#AAAAAA">(${bancodedados[i].time})</span> <span style="font-weight: 700">${bancodedados[i].from}</span> para <span style="font-weight: 700">${bancodedados[i].to}</span>: ${bancodedados[i].text}
                </div>
            `;
        }
        else if(bancodedados[i].type == 'status'){
            areaG.innerHTML += `
                <div class="msg msgstatus x${i}">
                    <span style="color:#AAAAAA">(${bancodedados[i].time})</span> <span style="font-weight: 700">${bancodedados[i].from}</span> ${bancodedados[i].text}
                </div>
            `;
        }
        else if(bancodedados[i].type == 'private_message' && bancodedados[i].to == nick.name){
            areaG.innerHTML += `
                <div class="msg msgprivada x${i}">
                    <span style="color:#AAAAAA">(${bancodedados[i].time})</span> <span style="font-weight: 700">${bancodedados[i].from}</span> reservadamente para <span style="font-weight: 700">${bancodedados[i].to}</span>: ${bancodedados[i].text}
                </div>
            `;
        }
        if(i == (bancodedados.length - 1)){
            let aux = document.querySelector(`.x${i}`);
            if(aux2.innerHTML !== aux.innerHTML){
                aux2 = document.querySelector(`.x${i}`);
                aux.scrollIntoView();
            }
        }
    }
}

function tratarErroMSG(erro) {
     alert("Deu esse erro aqui ó:" + erro);
}

