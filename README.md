# 🍽️ PedeAí

> Aplicativo mobile para pedidos antecipados na cantina da FIAP — sem fila, sem espera.

---

## 📌 Sobre o Projeto

O **PedeAí** é um aplicativo mobile desenvolvido com **React Native + Expo** que permite que alunos façam pedidos na cantina com antecedência, escolham o horário de retirada e acompanhem o status em tempo real.

🎯 **Objetivo:** reduzir filas e melhorar a experiência no intervalo.

---

## 👨‍💻 Equipe

* Djalma Moreira de Andrade Filho
* Felipe Paes de Barros Muller Carioba
* Lucas Rodrigues de Queiroz
* Matheus Gushi Morioka
* Victor Hugo de Paula

---

## ⚙️ Funcionalidades

* 🏠 Tela inicial de boas-vindas
* 🍔 Cardápio com imagens, preço e status de disponibilidade
* 🛒 Carrinho com controle de quantidade
* 📝 Observações personalizadas por item
* ⏰ Seleção do horário de retirada
* 💳 Pagamento (Pix, Cartão e Dinheiro)
* 📊 Acompanhamento do pedido em tempo real
* ✅ Finalização com opção de novo pedido

---

## 📱 Capturas de Tela

| Tela Inicial                              | Cardápio                               |
| ----------------------------------------- | -------------------------------------- |
| ![Tela Inicial](./assets/screenshots/telainicial.jpg) | ![Cardápio](./assets/screenshots/cardapio.jpg) |

| Carrinho                               | Status do Pedido                             |
| -------------------------------------- | -------------------------------------------- |
| ![Carrinho](./assets/screenshots/carrinho.jpg) | ![Status](./assets/screenshots/statusDoPedido.jpg) |

| Pedido Concluído                              |
| --------------------------------------------- |
| ![Pedido Concluído](./assets/screenshots/pedidoConcluido.jpg) |

---

## 🔄 Fluxo do App

```text
Início → Cardápio → Carrinho → Status do Pedido
                           ↓
                  Retirada no balcão
                           ↓
                    Novo pedido
```

---

## 🗂️ Estrutura do Projeto

```bash
├── app/
│   ├── _layout.js        # Configuração de navegação (expo-router)
│   ├── cart.js           # Carrinho de compras
│   ├── index.js          # Tela inicial
│   ├── menu.js           # Cardápio digital
│   └── status.js         # Acompanhamento do pedido
│
├── components/
│   ├── BadgeStatus.js   # Badge disponível / esgotado
│   ├── BarraProgressoPedido.js    # Barra de progresso das etapas do pedido
│   ├── BotaoCustomizado.js    # Botão reutilizável com variantes
│   └── CardProduto.js    # Card de produto do cardápio
│
├── theme.js              # Design tokens: cores, espaçamentos, tamanhos
├── assets/               # Ícones e imagens do app
├── app.json              # Configuração do Expo
└── package.json

```

---

## 🧩 Componentes

### BotaoCustomizado
Botão padronizado com suporte a variantes de cor e estado desativado.

```jsx
<BotaoCustomizado label="Ver Cardápio" onPress={() => router.push('/menu')} />
<BotaoCustomizado label="Carrinho" variant="secondary" onPress={irParaCarrinho} />
<BotaoCustomizado label="Indisponível" disabled />
```

### CardProduto
Card completo de produto, com imagem, nome, descrição, preço, badge de status e botão de adicionar.

```jsx
<CardProduto item={item} onAdd={(item) => adicionar(item)} />
```

### BadgeStatus
Badge de disponibilidade para uso em listagens.

```jsx
<BadgeStatus available={true} />   // → "Disponível" (verde)
<BadgeStatus available={false} />  // → "Esgotado" (cinza)
```

### BarraProgressoPedido
Barra de progresso com as etapas do pedido destacadas visualmente.

```jsx
<BarraProgressoPedido currentStatus="Preparando..." />
``` 

---

## 🎨 Design System

Todas as cores, espaçamentos e tamanhos de fonte estão centralizados em `theme.js`.

```js
import { colors, spacing, fontSize, radius } from '../theme';

// Exemplos de uso
colors.primary    // '#3d13f6' — roxo principal
colors.secondary  // '#f769b2' — rosa
colors.success    // '#6ad408' — verde
spacing.xl        // 20
fontSize.lg       // 18
```

---

## 🔄 Fluxo de uso


[Início] → [Cardápio] → [Carrinho] → [Status do Pedido]
                                           ↓
                                    [Pronto! Retirar no balcão]
                                           ↓
                                    [Fazer novo pedido]


---

## 🚀 Como rodar

```bash
# Clone o projeto
git clone <https://github.com/djxlma/fiap-mdi-cp1-pedeai.git>

# Entre na pasta
cd pede-ai

# Instale dependências
npm install

# Rode o projeto
npx expo start
```

---

## 📲 Execução

* Use o app **Expo Go** no celular
* Ou pressione `w` para abrir no navegador

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React Native | 0.81 | Base do app mobile |
| Expo | ~54 | Plataforma de desenvolvimento |
| expo-router | ~6 | Navegação entre telas |
| React | 19 | Interface declarativa |
---

## 🔮 Próximos passos

* [ ] Login de usuários
* [ ] Backend integrado
* [ ] Pagamento via API
* [ ] Notificações push
* [ ] Painel administrativo

---

## 📄 Licença

MIT © FIAP
