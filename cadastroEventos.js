let dataAtual = new Date()
let nomePalestrante = []
let idadeParticipante
let listaDatas = []
let listaMaster = []
let listaMasterPart = new Array([])
let limiteParticipantes = 99
let listaFlag = 0
let partFlag = 0
let dataFlag = 0

//função para converter string de data para o formato ISO
function toISOFormat(dateTimeString)
{
const [date] = dateTimeString.split(" ");
const [DD, MM, YYYY] = date.split('/');
return `${YYYY}-${MM}-${DD}`;
}

//função readline para leitura da entrada na linha de comando
var rl = require('readline');
var leitor = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

var recursiveAsyncReadLine = function () 
{
    leitor.question("Escolha uma opção:\n\n"
        + "1) Cadastro de evento\n"
        + "2) Cadastro de participante\n"
        + "3) Lista de eventos\n\n"
        , function (line) {

            switch (line) 
            {
                case "1":
                    leitor.question("Favor informar a data do evento (DD/MM/AAAA)\n", function(answer) 
                    {
                        let dia = toISOFormat(answer);
                        var resp = new Date(dia);
                        leitor.pause();
                        let numero = (dia.split('-',3)); // divida da data em 3 numeros para validação posterior
                        //console.log(numero)

                            let adataeValida = Date.parse(resp);
                                             
                            if (isNaN(adataeValida))  // valida se a string é uma data 
                            {
                            console.log("data inválida, recomece")
                            recursiveAsyncReadLine(); //retorna ao menu principal
                            }

                            else if (dataAtual > resp) //valida se a data informada é menor que a atual
                            {
                            console.log("A data é menor que a data atual, recomece")
                            recursiveAsyncReadLine();//retorna ao menu principal
                            }    
                                                     
                            else if                          
                              (numero[0].length < 4| numero[1].length < 2 | numero[2].length < 2) //valida se a data está no formato AAAA/MM/DD(ISO)   
                           {
                              console.log("data inválida, recomece");
                              recursiveAsyncReadLine();//retorna ao menu principal
                            }

                            else  
                            {
                                for(let contador=0; contador < listaDatas.length; contador++)
                                {
                                    if (listaDatas[contador] == answer)
                                    {
                                        console.log("Data já cadastrada, recomece")
                                        listaFlag = 1 //seta flag para valor 1 
                                    }
                                    else
                                    {  
                                        //nada faça                    
                                    }
                                }  

                                if (listaFlag == 1)
                                {
                                    listaFlag = 0 //volta flag para  valor 0
                                    recursiveAsyncReadLine();//retorna ao menu principal
                                }
                                else
                                {
                                listaFlag = 0 //volta flag para  valor 0
                                listaDatas.push(answer)
                                        listaMaster[0] = listaDatas //lista de datas salva na lista Master
                                        listaMasterPart[listaDatas.length] = [] //cria nova lista na lista de Participantes
                                        console.log("Cadastro do evento iniciado")
                                        leitor.resume();
                                        leitor.question("Favor informar o nome do palestrante\n", function(answer) 
                                        {   
                                                nomePalestrante.push(answer)
                                                listaMaster[1] = nomePalestrante
                                                leitor.pause();
                                                recursiveAsyncReadLine();//retorna ao menu principal
                                        });
                                }
                            }            
                        });
                    break;
                               
                case "2":
                console.log(listaDatas.length)    
                if (listaDatas.length == 0) //verifica se há eventos cadastrados
                {
                    console.log("Não há datas cadastradas no momento");
                    recursiveAsyncReadLine();//retorna ao menu principal
                }  

                else    
                {
                    console.log(listaDatas); //exibe a lista de eventos disponíveis para cadastro de participantes
                    leitor.question("Entre com a data do evento\n", function(answer) 
                        {
                            leitor.pause();
                            var dataResp = answer
                            let validaData = listaDatas.indexOf(dataResp)
                            if(validaData == -1) // verifica se a data estiver incorreta
                            {
                                console.log("Data inválida, recomece")
                                recursiveAsyncReadLine();//retorna ao menu principal
                            }
                            
                            else
                            {
                            var asyncReadLineRecursiva = function () //chama o menu para cadastro de participante
                            {
                            leitor.question("Escolha uma opção:\n"
                            + "1) Cadastrar participante\n"
                            + "2) Sair\n"
                            , function (line) {
                    
                                switch (line) 
                                {
                                    case "1":
                                        leitor.question("Favor informar a idade do participante\n", function(answer) 
                                        {
                                        idadeParticipante = parseInt(answer) //converte resposta em numero inteiro
                                        leitor.pause();
                                      
                                         if (idadeParticipante < 18)  //verifica se a idade do participante é maior que 18 anos
                                          {  
                                             console.log("Idade menor que 18 anos, recomece");
                                             asyncReadLineRecursiva();//chama o menu para cadastro de participante
                                          }

                                           else if (isNaN(answer))  // verifica se a resposta não for número 
                                           {
                                               console.log("Valor não é numérico, recomece")
                                               asyncReadLineRecursiva()//chama o menu para cadastro de participante
                                            }

                                            else if (listaMasterPart[validaData].length > limiteParticipantes)
                                            {
                                            
                                            console.log("Limite máximo de participantes atingido para o evento");
                                            recursiveAsyncReadLine(); //retorna ao menu principal
                                            }

                                            else 
                                            {
                                                console.log("Cadastro iniciado")
                                                console.log("A lista está com " + listaMasterPart[validaData].length + " participantes")
                                                leitor.question("Favor informar o nome do participante\n", function(answer) 
                                                {
                                                let nomeParticipante = answer
                                                leitor.pause();
                                                
                                                    for (let contadorLista = 0;  contadorLista <  listaMasterPart[validaData].length  ; contadorLista++)
                                                    {
                                                        if ([listaMasterPart[validaData][contadorLista]] == nomeParticipante) //verifica se o participante já está na lista do evento
                                                        {
                                                        console.log("Participante já está cadastrado");
                                                        partFlag = 1
                                                                                                                                         
                                                        }
                                                        else 
                                                        {
                                                            //nada faça
                                                        }
                                                    }
                                                   
                                                    if (partFlag == 1)
                                                    {
                                                        asyncReadLineRecursiva(); //chama o menu para cadastro de participante
                                                    }
                                                    else 
                                                    {
                                                        partFlag = 0 
                                                        listaMasterPart[validaData].push(nomeParticipante)
                                                        console.log("Cadastro efetuado");
                                                        asyncReadLineRecursiva(); //chama o menu para cadastro de participante
                                                    }

                                                });
   
                                            }

                                        });
                                     break

                                    case "2":
                                        recursiveAsyncReadLine(); //retorna ao menu principal
                                        break;
 
                                }        
                                        
                            });
                            
                    }
                    asyncReadLineRecursiva();
                            } //chama o menu para cadastro de participante
                            });

                
                }
                break;

                case "3":
                    console.log(listaDatas); //mostra as datas para pesquisa
                    leitor.question("Escolha a data do evento\n", function(answer) 
                    {

                            leitor.pause();
                            var dataEscolha = answer
                            for(let contadorListaDatas=0; contadorListaDatas < listaDatas[0].length; contadorListaDatas++)
                                {
                                    if (listaDatas[contadorListaDatas] == dataEscolha)
                                    {
                                        var temp = listaDatas.indexOf(dataEscolha); 
                                        console.log("Data do evento:" + listaDatas[temp]); //exibe a data do evento
                                        console.log("Palestrante: " + listaMaster[1][temp]); // exibe nome do palestrante da data
                                        console.log("Participantes: " + listaMasterPart[temp]); // exibe nomes dos participantes
                                        dataFlag = 1

                                        
                                    }
                                    else
                                    {
                                        //nada faça 
                                    }
                                   
                                }
                                if (dataFlag == 1)
                                {
                                    recursiveAsyncReadLine();//retorna ao menu principal
                                }
                                else {

                                    console.log("Data não encontrada, recomece");
                                    recursiveAsyncReadLine();//retorna ao menu principal
                                }

                    });   

                    break;         

                default:
                    console.log("Opção inválida, escolha outra opção: ");
                    
            }
    recursiveAsyncReadLine(); //retorna ao menu principal
    });
};

recursiveAsyncReadLine(); //retorna ao menu principal