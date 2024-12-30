
# Lens (API Node.js em desenvolvimento)

**Descrição:**  
API em Node.js integrada com aplicação React no front-end de solução para elaboração de listas de filmes/séries. As listas são feitas a partir de filtragem inicial com parâmetros definidos pelo usuário. Os dados e informações dos filmes e séries são obtidos através de comunicação com a API do The Movie Database (TMDB).

---

## 🛠 Tecnologias Utilizadas

- Node.js
- Express
- BCrypt
- Passport
- Sequelize
- Nodemailer
 
---

## 🚀 Funcionalidades

- Cadastro/Login utilizando Passport (com JSON e Google oAuth)
- Redefinição de senha utilizando Nodemailer com envio de email para redifinição de senha
- Comunicação com banco de dados MySQL utilizando Sequelize
- Comunicação com API da The Movie Database (TMDB) para obtenção de dados (como ficha técnica) de filmes e séries
- Criação de listas de filmes/séries a partir de seleções feitas pelo usuário

---

## ⚙️ Como Rodar o Projeto

1. Clone o repositório:  
   ```
   git clone https://github.com/Grynberg34/lens-api
   ```
2. Instale as dependências:  
   ```
   npm install
   ```
3. Inicie o servidor:  
   ```
   npm start
   ```
4. Acesse em: `http://localhost:8080`