# Car_Shop_API_POO_Mongoose

Este projeto é uma API Rest com principios de POO e o framework Mogoose.

## 🗯️ Informações Importantes

 A aplicação é referente criação de uma API com um simples crud, o diferencial
 do projeto consiste na implementação de uma camada extra na arquitetura MSC
 que é chamada Domain, ela é responsável por definir os atributos e métodos
 das entidades(carro e moto) e assim manter um padrão (modelagem de dados) 
 focado na regra de negócio da nossa Api.
 
<br />

## ⚙️ Tecnologias

- Node.js
- TypeScript
- Express.js
- Mongoose
- MongoDB
- Zod
- Docker
- Docker Compose

## 🚀 Instalação e execução

### Instalação e execução com Docker

Para rodar está aplicação é necessário ter **Git**, **Node**, **Docker** e o **Docker Compose** instalados no seu computador. O Docker Compose precisa estar na versão **1.29** ou superior e o Node na versão 16.

Para conseguir executar os comandos do abaixo também é necessário que seu sistema operacional tenha um terminal Bash instalado. Caso você esteja utilizando Linux ou macOS, o Bash já vem instalado por padrão. Porém, se o seu sistema for Windows, você pode [aprender como instalar](https://dicasdeprogramacao.com.br/como-instalar-o-git-no-windows/).

### 1 - Na raíz do projeto, suba os containers do backend e o banco de dados (`MongoDB`) com o comando:

    docker-compose up -d --build
   
### 2 - Acesse o container do Node com o comando:

    docker exec -it car_shop bash
    
### 3 - Instale as dependências da aplicação com o comando:
   
    npm install

O container da Api está mapeando a porta:

- car_shop: 3001

Para parar os containers, na pasta raiz do projeto execute o comando:

    docker-compose down
    

## 🔎 Rotas na Api

• Cadastra um novo carro. Rota POST /cars

  <h3>Exemplo de requisição:</h3>
  
```
{
  "model": "Marea",
  "year": 2002,
  "color": "Black",
  "status": true,
  "buyValue": 15.990,
  "doorsQty": 4,
  "seatsQty": 5
}
```

• Cadastra uma nova moto. Rota POST /motorcycle

  <h3>Exemplo de requisição:</h3>
  
```
{
  "model": "Honda Cb 600f Hornet",
  "year": 2005,
  "color": "Yellow",
  "status": true,
  "buyValue": 30.000,
  "category": "Street",
  "engineCapacity": 600
}
```

• Lista todas os carros cadastrados. GET /cars

  <h3>Exemplo de requisição:</h3>

```
[
    {
      "id": "634852326b35b59438fbea2f",
      "model": "Marea",
      "year": 2002,
      "color": "Black",
      "status": true,
      "buyValue": 15.99,
      "doorsQty": 4,
      "seatsQty": 5
    },
    {
      "id": "634852326b35b59438fbea31",
      "model": "Tempra",
      "year": 1995,
      "color": "Black",
      "buyValue": 39,
      "doorsQty": 2,
      "seatsQty": 5
    }
  ]
```

• Lista todas as motos cadastrados. GET /motorcycles

• Retorna o carro cadastrado conforme o Id especificado. Rota GET /car/:id

  <h3>Exemplo de Saída</h3>

```
 {
    "id": "634852326b35b59438fbea2f",
    "model": "Marea",
    "year": 2002,
    "color": "Black",
    "status": true,
    "buyValue": 15.99,
    "doorsQty": 4,
    "seatsQty": 5
  }
```
  
• Retorna a moto cadastrado conforme o Id especificado. Rota GET /motorcycle/:id
  
• Atualiza as informações do carro cadastrado conforme o Id especificado. Rota: PUT /car/:id

• Atualiza as informações da moto cadastrado conforme o Id especificado. Rota: PUT /motorcycle/:id

• Deleta as informações do carro cadastrado conforme o Id especificado. Rota: DELETE /car/:id

• Deleta as informações da moto cadastrado conforme o Id especificado. Rota: DELETE /motorcycle/:id


