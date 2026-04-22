# YouVisa – Frontend Sprint 3

Plataforma de gestão de vistos com autenticação simulada, controle de sessão e persistência de dados por usuário.

## Stack

- React 19 + Vite
- Styled Components
- Context API
- localStorage

## Como rodar

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

## Contas de teste

| Email | Senha |
|---|---|
| ana@youvisa.com | 123456 |
| joao@youvisa.com | 123456 |
| maria@youvisa.com | 123456 |

## Estrutura do projeto

```
src/
├── context/
│   ├── AuthContext.jsx     # Autenticação e controle de sessão
│   └── VistoContext.jsx    # Dados de vistos persistidos por usuário
├── screens/
│   ├── LoginScreen.jsx     # Tela de login com validação
│   ├── HomeScreen.jsx      # Dashboard com resumo do usuário
│   └── ProcessosScreen.jsx # Listagem e criação de solicitações
├── components/
│   ├── NavBar.jsx          # Barra de navegação com logout
│   └── StatusBadge.jsx     # Badge de status reutilizável
└── App.jsx                 # Raiz com ThemeProvider e renderização condicional
```

## Funcionalidades implementadas

- **Autenticação simulada** – login com array de usuários mockados, validação de email e senha
- **Persistência de sessão** – usuário salvo no `localStorage`, restaurado automaticamente ao abrir o app
- **Logout** – limpa sessão do `localStorage` e retorna à tela de login
- **Renderização condicional** – exibe LoginScreen (não autenticado) ou sistema completo (autenticado)
- **Dados por usuário** – cada usuário possui sua própria chave no `localStorage` (`youvisa_vistos_{id}`)
- **Modelo de dados** – `{ id, tipoVisto, status, dataSolicitacao }`
- **Dashboard** – resumo com total de solicitações, em análise e aprovados
- **Processos** – lista completa com formulário para nova solicitação
