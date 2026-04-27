# Portfolio Full-Stack

Portfolio pessoal de desenvolvedor full-stack com backend Node.js, API REST e frontend dinamico responsivo.

## Funcionalidades

- Perfil com nome, titulo, bio, localizacao, email e WhatsApp
- Lista de skills exibida com chips visuais
- Projetos em destaque com stack tecnologica e destaques
- Links para GitHub e LinkedIn
- Formulario de contato com persistencia local via JSON
- API REST propria servindo todos os dados

## Tecnologias

- Node.js 18+
- Express 4
- HTML5
- CSS3 (layout responsivo, animacoes)
- JavaScript ES6+
- Google Fonts (Space Grotesk, IBM Plex Mono)
- JSON (persistencia local)
- Nodemon (desenvolvimento)

## Onde personalizar

| O que mudar                        | Arquivo                        |
|------------------------------------|--------------------------------|
| Nome, bio, skills, projetos, links | `data/content.json`            |
| Layout e estrutura HTML            | `public/index.html`            |
| Cores, fontes, visual              | `public/styles.css`            |
| Regras da API                      | `server.js`                    |

## Endpoints da API

| Metodo | Rota              | Descricao                   |
|--------|-------------------|-----------------------------|
| GET    | /api/health       | Status da API               |
| GET    | /api/profile      | Dados do perfil             |
| GET    | /api/projects     | Lista de projetos           |
| POST   | /api/messages     | Envia mensagem de contato   |

Exemplo de body para POST /api/messages:

```json
{
  "name": "Fulano",
  "email": "fulano@exemplo.com",
  "message": "Quero conversar sobre um projeto."
}
```

## Estrutura do projeto

```
portfolio/
  server.js           - Servidor Express e API
  data/
    content.json      - Dados do portfolio (perfil, projetos, mensagens)
  public/
    index.html        - Pagina principal
    styles.css        - Estilos
    app.js            - Logica do frontend
```

## Como rodar

1. Entre na pasta do projeto:

```bash
cd /home/xl/Codes/portfolio
```

2. Instale as dependencias:

```bash
npm install
```

3. Inicie em modo desenvolvimento:

```bash
npm run dev
```

Ou em modo normal:

```bash
npm start
```

4. Abra no navegador:

```text
http://localhost:3000
```

## Endpoints da API

- `GET /api/health`
- `GET /api/profile`
- `GET /api/projects`
- `POST /api/messages`

Exemplo de body para contato:

```json
{
  "name": "Seu nome",
  "email": "voce@exemplo.com",
  "message": "Quero conversar sobre um projeto."
}
```

## Onde personalizar

- Conteudo principal: `data/content.json`
- Layout e visual: `public/styles.css`
- Estrutura da pagina: `public/index.html`
- Regras da API: `server.js`
