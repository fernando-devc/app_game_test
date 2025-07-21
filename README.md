# Games Wiki Test App

Aplicação Angular com Electron para pesquisar e visualizar informações de jogos.

## Tecnologias

- Angular 19
- Electron 
- Angular Material
- Node.js

## Como executar

### Desenvolvimento
```bash
npm install
npm start
```

### Electron
```bash
npm run electron
```

### Build
```bash
npm run build
```

### Distribuição
```bash
npm run dist
npm run dist:linux
npm run dist:win
npm run dist:mac
```

### Testes
```bash
npm test
```

## Funcionalidades

- ✅ Listagem de jogos
- ✅ Busca por jogos
- ✅ Detalhes do jogo
- ✅ Integração com Wikipedia
- ✅ Interface responsiva

## Estrutura

```
src/
├── app/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/         # Páginas da aplicação
│   └── services/      # Serviços
├── main.js            # Processo principal Electron
└── preload.js         # Script de preload
```

## API

Base URL: `http://localhost:3000`

- `GET /games` - Lista jogos
- `GET /games/:id` - Detalhes do jogo
- Query params: `search`, `page`, `limit`
