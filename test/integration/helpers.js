import supertest from "supertest";
import chai from "chai";
import setupApp from "../../../src/app";

global.expect = chai.expect;

global.setupApp = setupApp;
global.supertest = supertest;

//O arquivo helpers.js é responsável por inicializar as configurações de testes que serão usadas em todos os testes
//de integração,
// removendo a necessidade de ter de realizar configurações em cada cenário de teste.//

// Primeiro importamos os módulos necessários para executar os testes de integração que são o supertest e o chai e]
// também a nossa aplicação express que chamamos de app.
//Depois definimos as globais usando global. Globais fazem parte do Mocha,
//tudo que for definido como global poderá ser acessado em qualquer teste sem a necessidade de ser importado.
//No nosso arquivo helpers configuramos o app para ser global, ou seja,
//caso seja necessário usá-lo em um caso de teste basta chamá-lo diretamente.
//Também é definido um global chamado request, que é o supertest recebendo o express por parâmetro.
//Lembram que falei da vantagem de separar a execução da aplicação da configuração do express? Agora o express pode ser executado por um emulador como o supertest.
//E por último o expect do Chai que será utilizado para fazer as asserções nos casos de teste. //
