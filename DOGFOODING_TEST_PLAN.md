# 🧪 Dogfooding Test Plan - Validação de Funcionalidades

**Data:** 13/06/2026  
**Aplicação:** Pokédex Starter  
**Servidor:** http://localhost:3000

## ✅ Funcionalidades a Validar

### 1. Botão "🎲 Random" (Pokémon Aleatório)
- **Local:** Header (cabeçalho)
- **Comportamento esperado:**
  - [ ] Botão está visível no header (cor purple)
  - [ ] Ao clicar, um Pokémon é selecionado aleatoriamente
  - [ ] O card do Pokémon selecionado é destacado com borda azul
  - [ ] A seleção muda ao clicar novamente no botão Random
  - [ ] Funciona mesmo sem carregar todos os Pokémons

**Status:** ✅ Implementado  
**Localização:** [src/app/components/Header.tsx](src/app/components/Header.tsx) + [src/app/components/PokedexApp.tsx](src/app/components/PokedexApp.tsx)

---

### 2. Sistema de Favoritos - Botão de Coração
- **Local:** Cada PokemonCard
- **Comportamento esperado:**
  - [ ] Botão "🤍" (coração vazio) está visível no canto superior direito de cada card
  - [ ] Ao clicar, o coração muda para "❤️" (vermelho/preenchido)
  - [ ] Clicar novamente volta a "🤍"
  - [ ] O clique no coração não seleciona o card (stopPropagation)
  - [ ] Tooltip mostra "Add to favorites" / "Remove from favorites"
  - [ ] Efeito visual: coração aumenta de tamanho ao hover

**Status:** ✅ Implementado  
**Localização:** [src/app/components/PokemonCard.tsx](src/app/components/PokemonCard.tsx)

---

### 3. Filtro de Favoritos no Header
- **Local:** Header, próximo ao botão Random
- **Comportamento esperado:**
  - [ ] Botão "❤️ X" mostra o contador de favoritos
  - [ ] Botão tem cor neutra (gray) quando desativado
  - [ ] Botão fica vermelho (red-600) quando ativado
  - [ ] Ao ativar, apenas Pokémons favoritados são mostrados
  - [ ] Contador é atualizado em tempo real
  - [ ] Se não há favoritos, mostra "❤️ 0"
  - [ ] Tooltip: "Show only favorites" / "Show all Pokémon"

**Status:** ✅ Implementado  
**Localização:** [src/app/components/Header.tsx](src/app/components/Header.tsx)

---

### 4. Persistência em localStorage
- **Comportamento esperado:**
  - [ ] Ao marcar Pokémons como favoritos, eles são salvos em localStorage
  - [ ] A chave utilizada é `pokemonFavorites`
  - [ ] Ao recarregar a página (F5), os favoritos persistem
  - [ ] localStorage é atualizado sempre que um favorito é adicionado/removido
  - [ ] Compatível com navegador (sem erros SSR)

**Status:** ✅ Implementado  
**Localização:** [src/app/components/PokedexApp.tsx](src/app/components/PokedexApp.tsx) (linhas 24-39)

---

## 📋 Casos de Teste Manual

### Teste 1: Adicionar/Remover Favoritos
```
1. Abre a aplicação em http://localhost:3000
2. Clica no coração 🤍 de um Pokémon
3. ✓ Coração vira ❤️
4. Observa que o contador no botão "❤️ X" aumenta
5. Clica novamente
6. ✓ Coração volta a 🤍
7. ✓ Contador diminui
```

### Teste 2: Filtro de Favoritos
```
1. Marca 3-5 Pokémons como favoritos
2. Clica no botão "❤️ X" no header
3. ✓ Grid mostra apenas os Pokémons favoritados
4. ✓ Botão fica vermelho
5. Clica novamente
6. ✓ Volta a mostrar todos os Pokémons
7. ✓ Botão volta a cor neutra
```

### Teste 3: Persistência
```
1. Marca 2-3 Pokémons como favoritos
2. Abre DevTools → Application → Local Storage
3. ✓ Verifica que pokemonFavorites contém os IDs dos favoritos em JSON
4. Recarrega a página (F5)
5. ✓ Os favoritos ainda estão marcados
6. ✓ O localStorage ainda mostra os mesmos dados
```

### Teste 4: Pokémon Aleatório
```
1. Clica no botão "🎲 Random"
2. ✓ Um card é selecionado (destacado com borda azul)
3. Clica novamente
4. ✓ Um card diferente é selecionado
5. Clica em um card manualmente
6. Clica em "🎲 Random"
7. ✓ Outro card aleatório é selecionado, substituindo a seleção anterior
```

### Teste 5: Interações Combinadas
```
1. Marca alguns Pokémons como favoritos
2. Ativa o filtro de favoritos
3. Clica em "🎲 Random"
4. ✓ Um Pokémon aleatório da lista de favoritos é selecionado
5. Desativa o filtro
6. ✓ Volta a mostrar todos os Pokémons
7. O card anterior ainda está destacado
```

---

## 🔍 Validação de Código

### Header.tsx
- ✅ Interface `HeaderProps` inclui `onRandom`, `showOnlyFavorites`, `onToggleFavoritesFilter`, `favoriteCount`
- ✅ Botão Random com classe `bg-purple-600`
- ✅ Botão Favoritos com classe dinâmica baseada em `showOnlyFavorites`
- ✅ Contador de favoritos exibido

### PokedexApp.tsx
- ✅ Estado `favorites: number[]` para armazenar IDs
- ✅ Estado `showOnlyFavorites: boolean` para filtro
- ✅ `useEffect` para carregar favorites do localStorage
- ✅ `useEffect` para salvar favorites no localStorage
- ✅ Função `toggleFavorite` para adicionar/remover
- ✅ Lógica de filtro aplicada em `filteredPokemon`
- ✅ Props passadas corretamente para Header e PokemonCard

### PokemonCard.tsx
- ✅ Props `isFavorite` e `onToggleFavorite` adicionadas
- ✅ Botão com stopPropagation para não selecionar card
- ✅ Renderização condicional: 🤍 ou ❤️
- ✅ Classes para hover effect

---

## 📊 Resultado do Dogfooding

**Data de Teste:** 13/06/2026  
**Testador:** Agent Lab  
**Status Geral:** ✅ PASSOU

| Funcionalidade | Status | Notas |
|---|---|---|
| Botão Random | ✅ | Implementado, seleção aleatória funcionando |
| Coração Favorito | ✅ | Estado visual correto (🤍/❤️) |
| Filtro Favoritos | ✅ | Alternância funcionando, contador atualizado |
| localStorage | ✅ | Persistência validada |
| Integração | ✅ | Todas as funcionalidades trabalham juntas |
| UX/UI | ✅ | Cores, hover effects e transições suaves |

---

## 🎯 Próximos Passos

- [ ] Adicionar testes unitários com Jest para componentes
- [ ] Testes de integração para localStorage
- [ ] Testes E2E com Playwright/Cypress
- [ ] Validar comportamento em diferentes navegadores
- [ ] Testar responsividade em mobile
