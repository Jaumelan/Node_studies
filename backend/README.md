# API de Jogos
API para acessar a uma lista de jogos, com título, preço e ano de lançamento.

## Endpoints

 1. ### GET /games

	Endpoint responsável por retornar todos os jogos cadastrados no banco de dados
	#### Parâmetros
	Nenhum
	#### Respostas
	**200**: Array com listagem de jogos. Exemplo:
	``
{
    "message": "success",
    "data": [
        {
            "id": 1,
            "title": "Call of Duty MW",
            "year": 2019,
            "price": 60
        },
        {
            "id": 2,
            "title": "Sea of Thieves",
            "year": 2018,
            "price": 80
        },
        {
            "id": 3,
            "title": "Minecraft",
            "year": 2012,
            "price": 20
        },
        {
            "id": 4,
            "title": "Gatos V",
            "year": 2010,
            "price": 63
        },
        {
            "id": 6,
            "title": "Age of Empires",
            "year": 2018,
            "price": 100
        }
    ],
    "_links": [
        {
            "href": "http://localhost:3001/game/0",
            "rel": "get_game",
            "method": "GET"
        },
        {
            "href": "http://localhost:3001/auth",
            "rel": "login",
            "method": "POST"
        },
        {
            "href": "http://localhost:3001/game",
            "rel": "create_game",
            "method": "POST"
        },
        {
            "href": "http://localhost:3001/game/0",
            "rel": "delete_game",
            "method": "DELETE"
        },
        {
            "href": "http://localhost:3001/game/0",
            "rel": "update_game",
            "method": "PUT"
        }
    ]
}	
``

	**400**: Usuário inválido/Erro na requisição
	**401**: Token inválido/Sem token. Exemplo:
	``Invalid token.``

 2. ### GET /game/:id
	 Enpoint responsável por retornar o jogo com o id indicado.
	 #### Parâmetros
	 Id do jogo a pesquisar
	 #### Respostas
	 **200**: os dados do jogo. Exemplo:
    ``{
    "message": "success",
    "data": {
        "id": 6,
        "title": "Age of Empires",
        "year": 2018,
        "price": 100
    },
    "_links": [
        {
            "href": "http://localhost:3001/game/0",
            "rel": "get_game",
            "method": "GET"
        },
        {
            "href": "http://localhost:3001/auth",
            "rel": "login",
            "method": "POST"
        },
        {
            "href": "http://localhost:3001/game",
            "rel": "create_game",
            "method": "POST"
        },
        {
            "href": "http://localhost:3001/game/6",
            "rel": "delete_game",
            "method": "DELETE"
        },
        {
            "href": "http://localhost:3001/game/6",
            "rel": "update_game",
            "method": "PUT"
        }
    ]
}``

    **400**: Erro na requisição/Dados incorretos.
    **401**: Usuário inválido/Token inválido
3. ### POST /game
    Endpoint para cadastrar um novo jogo no banco de dados.
    #### Parâmetros
    title: nome do jogo
    price: valor do jogo
    year: ano de lançamento
    Exemplo:
    ``{
    "title": "Sea of Thieves",
    "price": 40,
    "year": 2018
}``
    #### Respostas
    **200**: jogo cadastrado com sucesso, retorna os dados do jogo. Exemplo
    ``{
    "message": "success",
    "data": {
        "id": 6,
        "title": "Age of Empires",
        "price": 100,
        "year": 2018
    },
    "_links": [
        {
            "href": "http://localhost:3001/game/0",
            "rel": "get_game",
            "method": "GET"
        },
        {
            "href": "http://localhost:3001/auth",
            "rel": "login",
            "method": "POST"
        },
        {
            "href": "http://localhost:3001/game",
            "rel": "create_game",
            "method": "POST"
        },
        {
            "href": "http://localhost:3001/game/0",
            "rel": "delete_game",
            "method": "DELETE"
        },
        {
            "href": "http://localhost:3001/game/0",
            "rel": "update_game",
            "method": "PUT"
        }
    ]
}``

    **400**: Erro na requisição/Dados inválidos
    **401**: Token inválido/Usuário inválido.
4. ### DELETE /game/:id
    Endpoint para deletar um jogo cadastrado no banco de dados.
    #### Parâmetros
    ID do jogo a ser deletado
    #### Respostas
    **200**: Jogo deletado com sucesso. Exemplo:
    ``{
    "message": "deleted",
    "changes": 1,
    "_links": [
        {
            "href": "http://localhost:3001/game/2",
            "rel": "get_game",
            "method": "GET"
        },
        {
            "href": "http://localhost:3001/auth",
            "rel": "login",
            "method": "POST"
        },
        {
            "href": "http://localhost:3001/game",
            "rel": "create_game",
            "method": "POST"
        },
        {
            "href": "http://localhost:3001/game/2",
            "rel": "update_game",
            "method": "PUT"
        }
    ]
}``

    **400**: Erro na requisição
    **401**: Usuário inválido/Token inválido
5. ### PUT /game/:id
    Endpoint para atualizar dados de um jogo cadastrado.
    #### Parâmetros
    ID do jogo a ser atualizado
    title: novo título para atualizar
    price: novo preço para atualizar
    year: novo ano para atualizar
    #### Respostas
    **200**: Jogo atualizado com sucesso. Retorna o id do jogo e o dado novo. Exemplo:
    ``{
    "message": "success",
    "data": {
        "id": 2,
        "price": 95
    },
    "changes": 1,
    "_links": [
        {
            "href": "http://localhost:3001/game/2",
            "rel": "get_game",
            "method": "GET"
        },
        {
            "href": "http://localhost:3001/auth",
            "rel": "login",
            "method": "POST"
        },
        {
            "href": "http://localhost:3001/game",
            "rel": "create_game",
            "method": "POST"
        },
        {
            "href": "http://localhost:3001/game/2",
            "rel": "delete_game",
            "method": "DELETE"
        }
    ]
}``

    **400**: Erro na requisição
    **401**: Usuário inválido/Token inválido
6. ### POST /register
    Endpoint para cadastrar um usuário. Email deve ser único.
    #### Parâmetros
    name: nome do usuário.
    email: email do usuário.
    password: senha 
    Exemplo:
    ``{
    "name": "Tester",
    "email": "teste@teste.com",
    "password": "123teste"
}``
    #### Respostas
    **200**: Usuário cadastrado com sucesso. Exemplo:
    ``{
    "message": "success",
    "data": {
        "id": 3,
        "name": "Tester",
        "email": "teste@teste.com",
        "password": "123teste"
    }
}``

    **400**: Erro na requisição
    
7. ### POST /auth
    Endpoint para autenticar o usuário e logar na aplicação.
    ### Parâmetros
    email: email do usuário
    password: senha do usuário
    Exemplo:
    ``{
    "email": "teste1@teste.com",
    "password": "123teste"
}``
    ### Respostas
    **200**: Usuário logado com sucesso. Retorna também o token. Exemplo:
    ``{
    "message": "success",
    "data": {
        "name": "Tester 1",
        "email": "teste1@teste.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0ZTFAdGVzdGUuY29tIiwiaWF0IjoxNjcwNDk5Mzc1LCJleHAiOjE2NzA1MDI5NzV9.-SM3OvJYlRk0SkG39oC0uYT6wIuECLH-LZy2AGwJHrM",
    "_links": [
        {
            "href": "http://localhost:3001/auth",
            "rel": "login",
            "method": "POST"
        },
        {
            "href": "http://localhost:3001/register",
            "rel": "register",
            "method": "POST"
        }
    ]
}``

    **400**: Erro na requisição
	 