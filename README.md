# Car Shop Api

Para este projeto, foi desenvolvido uma api para aplicar os princípios de Programação Orientada a Objetos (POO) e a construção de uma API com CRUD para gerenciar uma concessionária de veículos. Isso foi realizado utilizando o banco de dados MongoDB através do framework do Mongoose.  

## Stack utilizada 

Back-end: Typescript, Node, Moongose, MongoDB, Docker

## Rodando o Docker
Rode os serviços node e mongodb com o comando ```docker-compose up -d```.

Lembre-se de parar o mongodb se estiver usando localmente na porta padrão (27017), ou adapte, caso queria fazer uso da aplicação em containers. 


Esses serviços irão inicializar um container chamado ```car_shop``` e outro chamado ```car_shop_db```. 

A partir daqui você pode rodar o container ```car_shop``` via CLI ou abri-lo no VS Code. 

Use o comando ```docker exec -it car_shop bash```.

Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano. 

Instale as dependências "Caso existam" com ```npm install``` 

  

:warning: Atenção :warning: Caso opte por utilizar o Docker, TODOS os comandos disponíveis no package.json (npm start, npm test, npm run dev, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec citado acima. 

  

:warning: Atenção :warning: O git dentro do container não vem configurado com suas credenciais. Faça os commits fora do container, ou configure as suas credenciais do git dentro do container. 

  

:warning: Atenção :warning: Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador. 

  

:warning: Atenção :warning: Caso você esteja usando macOS e ao executar o docker-compose up -d se depare com o seguinte erro: 

  

```bash 

The Compose file './docker-compose.yml' is invalid because: 

Unsupported config option for services.db: 'platform' 

Unsupported config option for services.node: 'platform' 

``` 

Foram encontradas 2 possíveis soluções para este problema: 

* Você pode adicionar manualmente a option platform: linux/amd64 no service do banco de dados no arquivo docker-compose.yml do projeto, mas essa é uma solução local e você deverá reproduzir isso para os outros projetos. 

* Você pode adicionar manualmente nos arquivos .bashrc, .zshenv ou .zshrc do seu computador a linha export DOCKER_DEFAULT_PLATFORM=linux/amd64, essa é uma solução global. As soluções foram com base nesta fonte. 

# Rotas Da Api

#### Criar um carro
```http
  POST /cars
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `model` | `string` | **Obrigatório no body**. |
| `year` | `number` | **Obrigatório no body**. |
| `color` | `string` | **Obrigatório no body**. |
| `status` | `boolean` | **Nao e Obrigatório no body**. |
| `buyValue` | `number` | **Obrigatório no body**. |
| `doorsQty` | `number` | **Obrigatório no body**. |
| `seatsQty` | `number` | **Obrigatório no body**. |

#### Criar um motorcycle

```http
  POST /motorcycles
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `model` | `string` | **Obrigatório no body**. |
| `year` | `number` | **Obrigatório no body**. |
| `color` | `string` | **Obrigatório no body**. |
| `status` | `boolean` | **Nao e Obrigatório no body**. |
| `buyValue` | `number` | **Obrigatório no body**. |
| `category` | `string` | **Obrigatório no body**. |
| `engineCapacity` | `number` | **Obrigatório no body**. |

#### Atualizar um carro

```http
  PUT /cars/:id <--(Precisa ser um id mongoID valido)
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `model` | `string` | **Obrigatório no body**. |
| `year` | `number` | **Obrigatório no body**. |
| `color` | `string` | **Obrigatório no body**. |
| `status` | `boolean` | **Nao e Obrigatório no body**. |
| `buyValue` | `number` | **Obrigatório no body**. |
| `doorsQty` | `string` | **Obrigatório no body**. |
| `seatsQty` | `number` | **Obrigatório no body**. |

#### Atualizar um motorcycle

```http
  PUT /motorcycles/:id <--(Precisa ser um id mongoID valido)
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `model` | `string` | **Obrigatório no body**. |
| `year` | `number` | **Obrigatório no body**. |
| `color` | `string` | **Obrigatório no body**. |
| `status` | `boolean` | **Nao e Obrigatório no body**. |
| `buyValue` | `number` | **Obrigatório no body**. |
| `category` | `string` | **Obrigatório no body**. |
| `engineCapacity` | `number` | **Obrigatório no body**. |

#### Buscar carro por ID

```http
  GET /cars/:id
  ```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório no params da rota**.  |


#### Buscar motorcycle por ID

```http
  GET /motorcycles/:id
  ```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório no params da rota**.  |

#### Pegar todos carros da loja

```http
  GET /cars
  ```
#### Pegar todas as motorcycles da loja

```http
  GET /motorcycles
  ```

Qualquer duvida entre em contato comigo:

E-mail: programadorthiagolopes@gmail.com

Linkedin: https://www.linkedin.com/in/thiago-lopes-dev-/
