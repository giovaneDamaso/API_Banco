# :moneybag: **API: Banco** :moneybag:
API de banco construída em decorrer do curso de desenvolvimento **Back-End** oferecido pela [Cubos Academy](https://cubos.academy/).  

## :desktop_computer: Linguagem:  
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  

## :globe_with_meridians: Framework:  
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)  

## :books: Bibliotecas:  
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)  

## :wrench: Ferramenta de teste:
![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)

## :rocket: Como utilizar:
Primeiro deve-se fazer o fork do projeto, e em seguida clonar o reposítório do fork para sua máquina. Após o clone, as dependências devem ser instaladas através do npm. Para que o servidor seja iniciado na máquina, é necessário acessar a pasta do projeto /API_Banco e no terminal, rodar o comando `npm run dev`.

## :briefcase: Funções e Endpoints da API:
- ### :telescope: Listar contas bancárias de usuários - GET  `localhost:3000/contas?senha_banco=Cubos123Bank`
  
   Para acessar esta funcionalidade, deve-se criar um HTTP Request com o verbo GET no Insmonia e utilizar a senha informada no arquivo bancodedados.js como parâmetro na rota.
  
   ![Listar Contas Bancárias](https://github.com/giovaneDamaso/API_Banco/assets/127995277/ec3fcaf1-38a9-4798-ba0f-b9daed2edbde)
  
  
- ### :heavy_check_mark: Criar conta de usuário - POST  `localhost:3000/contas`
  
   Para acessar esta funcionalidade, deve-se criar um HTTP Request com o verbo POST no Insmonia. Logo abaixo, na aba Body, selecionar o formato JSON e inserir um objeto no formato JSON preenchendo os campos:
  
  ```json
  {
        "nome": "",
        "cpf": "",
        "data_nascimento": "",
        "telefone": "", "email": "",
        "senha": ""
  }
  ```
 
   ![Criar conta de usuário](https://github.com/giovaneDamaso/API_Banco/assets/127995277/7adaf447-c681-427b-8184-239da754f0dd) <br>
  
- ### :recycle: Atualizar informações da conta de um usuário - PUT  `localhost:3000/contas/:numeroConta/usuario`
  
  Para atualizar a conta, deve-se criar um HTTP Request com o verbo PUT no Insmonia. Após isso, o procedimento é similar ao acima, de criação de conta. Entretanto, lembre-se que duas contas não podem possuir o mesmo CPF.
  
- ### :x: Remover conta bancária de um usuário - DELETE `localhost:3000/contas/:numeroConta`

  Para remover uma conta, deve-se criar um HTTP Request com o verbo DELETE, passando como parâmatro o número da conta a ser excluída.

  ![Remover conta bancária de um usuário](https://github.com/giovaneDamaso/API_Banco/assets/127995277/46ddfa3b-e14f-43d4-a3f4-d7a100b7e558)

- ### :dollar: Depositar valor - POST  `localhost:3000/transacoes/depositar`

  Para acessar esta funcionalidade, deve-se criar um HTTP Request com o verbo POST no Insmonia. Logo abaixo, na aba Body, selecionar o formato JSON e inserir um objeto no formato JSON preenchendo os campos numero da conta e valor a ser depositado:
  ```json
  {
	    "numero_conta": "",
	    "valor": 0
  }
  ```
  ![Depositar valor](https://github.com/giovaneDamaso/API_Banco/assets/127995277/b73d8b53-4d69-44ac-9567-cc32664fab61)

- ### :money_with_wings: Sacar valor - POST `localhost:3000"/transacoes/sacar`
  Semelhante depósito, para acessar esta funcionalidade, deve-se criar um HTTP Request com o verbo POST no Insmonia. Logo abaixo, na aba Body, selecionar o formato JSON e inserir um objeto no formato JSON preenchendo os campos numero da conta, valor a ser sacado e agora uma senha é necessária:
  
  ```json
  {
	    "numero_conta": "",
	    "valor": 0,
        "senha": ""
  }
  ```
  ![Sacar valor](https://github.com/giovaneDamaso/API_Banco/assets/127995277/ee9b4a11-0ee6-469f-a0b7-c54c4866fe70)

- ### :outbox_tray: Transferir valor entre contas - POST `localhost:3000/transacoes/transferir`
  
  Para acessar esta funcionalidade, deve-se criar um HTTP Request com o verbo POST no Insmonia. Logo abaixo, na aba Body, selecionar o formato JSON e inserir um objeto no formato JSON preenchendo os campos numero da conta de origem, numero da conta destino, valor a ser sacado e senha da conta de origem:
  ```json
  {
	    "numero_conta_origem": "",
	    "numero_conta_destino": "",
	    "valor": 0,
	    "senha": ""
  }
  ```
  ![Transferir valor entre contas](https://github.com/giovaneDamaso/API_Banco/assets/127995277/c6260b7f-e83b-418e-bbe3-3b77b6213de8)

- ### :chart: Exibir saldo da conta - GET `localhost:3000/contas/saldo`
  Para acessar esta funcionalidade, deve-se criar um HTTP Request com o verbo GET no Insmonia e utilizar o numero da conta a ser acessada e sua respectiva senha como parâmetros na rota:
  
  ![Exibir saldo da conta](https://github.com/giovaneDamaso/API_Banco/assets/127995277/eb157605-e34e-47e8-b052-6a474f38ef83)

- ### :receipt: Retirar extrato da conta - GET `localhost:3000/contas/extrato`
  Assim como na funcionalidade de exibir saldo, deve-se criar um HTTP Request com o verbo GET no Insmonia e utilizar o numero da conta a ser acessada e sua respectiva senha como parâmetros na rota:
  ![Retirar extrato da conta](https://github.com/giovaneDamaso/API_Banco/assets/127995277/e3042e3d-1f23-468d-a013-4d4385467859)


