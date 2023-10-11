# Around the US Auth

Um lugar onde você pode compartilhar fotos com o resto do mundo!

O projeto foi feito usando React.js para deixar o site responsivo e também para proteger certas rotas de usuários não registrados.
A autenticação e obtenção dos cartões é feita usando a API feita pela TripleTen.

Os métodos atualmente sendo utilizados na API/autenticação são:

- getUserInfo, para obter as informações do usuário;
- setUserInfo, para atualizar as informações do usuário;
- setUserAvatar, para atualizar o avatar do usuário;
- getInitialCards, para obter os cartões iniciais;
- addCard, para adicioanr um cartão novo;
- deleteCard, para deletar um cartão;
- changeCardLikeStatus, para dar like ou dislike num cartão;
- register, para registrar um usuário novo;
- login, para realizar a autenticação do usuário;
- authorize, para checar se o token obtido no login é válido.
