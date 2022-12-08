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
            "price": 40
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
        "id": 1,
        "title": "Call of Duty MW",
        "year": 2019,
        "price": 60
    }
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
        "id": 5,
        "title": "Age of Empires",
        "price": 100,
        "year": 2018
    }
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
    "changes": 1
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
        "price": 80
    },
    "changes": 1
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0ZTFAdGVzdGUuY29tIiwiaWF0IjoxNjcwNDUyODQ0LCJleHAiOjE2NzA0NTY0NDR9.M__9QqSg0947Ia7-TXaOBP2vGO6-_sNv-6aDVPO2UPI"
}``

    **400**: Erro na requisição
	 