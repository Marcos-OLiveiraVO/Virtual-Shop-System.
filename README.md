# Virtual-Shop-API

## :memo: Descrição
<h4> Api de uma loja virtual com a aquisição de produtos, atualizações, busca por ID, e a remoção do produto,  
alem da criação da conta de usuário e controle de acesso com autenticação da conta do usuario. </h4>


<h4>A API segue o metodo de desenvolvimento guiado por testes(TDD) e por comportamento (BDD) para ter uma melhor qualidade de codigo e segurança da aplicação com a
utilização do mocha como TesteRunner.</h4>

<h5> O token de autenticação foi feito usando o JWT. </h5>
<h5> A senha foi criptografada usando o modulo Bcript. <h5>
<h5> Para o controle de acesso do usuário foi usado o Express - ACL. </h5>


## 📍 Para os Testes foi utilizado: 


- Mocha foi utilizado para ser o TestRunner
- Chai para asserções 
- Supertest para requisições http 



## :books: Funcionalidades

- Criação do produto 
- Atualizar o produto
- Excluir o produto
- Busca por ID
- Criação da conta de usuario

## :rocket: Rodando o projeto
Para rodar o repositório é necessário clonar o mesmo, dar o seguinte comando para instalar as dependencias:
      
      npm install

<h3>✨ Utilizando os testes:</h3>

<h5> Testes de unidade: </h5>

      npm run test:unit
      
<h5> Testes de integração: </h5>

     npm run test:integration
     
<h5> Testes de unidades + Integração: </h5>     

      npm run test
      
## :soon: Implementação futura
     Finalizado

<h4> 🛠 Projeto foi desenvolvido utilizando as seguintes tecnologias: <h4>

    - Node
    - Express
    - JWT
    - MongoDB 
    - mongoose
    - mocha
    - SuperTest
    - Sinon
    - TDD E BDD
    - Express ACL
    - Bcrypt

