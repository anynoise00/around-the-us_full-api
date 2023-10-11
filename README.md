# Around the US - API Completa

Uma página interativa onde os usuários podem adicionar, remover e curtir fotos.

Este projeto contém o frontend e o backend do site Around the US, que pode ser acessado no pelo seguinte [link](https://aroundus.mooo.com/).

O frontend foi feito usando React.js, deixando o site responsivo e também protegendo certas rotas de usuários não registrados.
O backend utiliza o Express.js para organizar as rotas e a interação com o banco de dados, que foi feito usando o MongoDB e o mongoose.

- Os usuários podem se registrar no site e terão suas senhas criptografadas usando o bcrypt;
- O backend também utiliza CORS e certificações HTTPS para garantir que tudo esteja seguro;
- Ao logar no site, o usuário recebe um token feito com jsonwebtoken para garantir que está tudo certo com ele.
