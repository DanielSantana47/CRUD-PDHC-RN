# Task Manager App

Aplicação mobile desenvolvida com React Native utilizando Expo, com o objetivo de gerenciar tarefas de forma simples e eficiente. O usuário pode criar, editar, excluir e marcar tarefas como concluídas, além de filtrá-las por prioridade e status.

---

## Funcionalidades

- Criação de tarefas com título, descrição e prioridade  
- Edição de tarefas existentes  
- Exclusão de tarefas com gesto de swipe  
- Marcação de tarefas como concluídas  
- Alternância entre tarefas concluídas e pendentes  
- Filtro por prioridade (Alta, Média, Baixa)  
- Filtro por status (Todas ou Concluídas)  
- Feedback visual com toasts para ações do usuário  
- Interface responsiva e organizada  

---

## Estrutura do Projeto

O projeto segue uma organização baseada em separação de responsabilidades:

components/
├── CRUD/
├── general/
services/
types/
app/


- `components/` → Componentes reutilizáveis  
- `components/CRUD/` → Componentes utilizados para o projeto  
- `services/` → Comunicação com API (Axios)  
- `types/` → Tipagens globais  
- `app/` → Telas usando Expo Router  

---

## Tecnologias Utilizadas

- React Native  
- Expo  
- TypeScript  
- Expo Router  
- Axios  
- Zod  
- React Native Gesture Handler  
- React Native Reanimated  

---

## API

A aplicação consome a seguinte API:

https://crud-pdhc-node.vercel.app/tasks


---

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado  
- Expo CLI (opcional):

```bash
npm install -g expo-cli
```
Instalação

Clone o repositório:
```bash
git clone <url-do-repositorio>
```
Acesse a pasta:
```bash
cd <nome-do-projeto>
```
Instale as dependências:
```bash
npm install
```
Executando com Expo
```bash
npx expo start
```
Como testar o aplicativo

Após rodar o comando acima, você pode testar de três formas:

1. Dispositivo físico
- Instale o app Expo Go
- Escaneie o QR Code exibido no terminal ou navegador
2. Emulador Android
- Tenha o Android Studio configurado
- Inicie um emulador
Pressione:
```bash
a
```
3. Simulador iOS (macOS)
- Tenha o Xcode instalado
- Pressione:
```bash
i
```
Fluxo da aplicação
O usuário acessa a lista de tarefas
Pode criar uma nova tarefa
Cada tarefa permite:
Edição ao clicar
Exclusão com swipe para a esquerda
Conclusão com swipe para a direita
Tarefas concluídas são separadas visualmente
Filtros permitem refinar a lista
Validações

Validações feitas com Zod:

Título obrigatório (máx. 20 caracteres)
Descrição obrigatória (máx. 100 caracteres)
Prioridade obrigatória
