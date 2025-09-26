# Simulador de Alocação de Memória

Um simulador completo de algoritmos de alocação de memória, desenvolvido em **TypeScript**, que permite comparar o desempenho de diferentes estratégias de alocação de memória em um ambiente controlado.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Características](#características)
- [Algoritmos Implementados](#algoritmos-implementados)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Uso](#uso)
- [Resultados e Métricas](#resultados-e-métricas)
- [Exemplo de Saída](#exemplo-de-saída)
- [Configuração](#configuração)
- [Tecnologias](#tecnologias)

---

## 🎯 Visão Geral

Este projeto simula o comportamento de diferentes algoritmos de alocação de memória em um sistema operacional, permitindo a análise e comparação do seu desempenho com base em várias métricas de eficiência, como:

- Ocupação média de memória
- Taxa de descarte
- Eficiência geral dos algoritmos

---

## ✨ Características

- ✅ **4 Algoritmos de Alocação** implementados: _First Fit_, _Best Fit_, _Worst Fit_ e _Next Fit_.
- ✅ **Geração aleatória de processos** com tamanhos variados.
- ✅ **Simulação de ciclo de vida completo** de alocação e desalocação de processos.
- ✅ Múltiplas execuções para **resultados estatisticamente significativos**.
- ✅ **Métricas detalhadas de desempenho** para comparar os algoritmos.
- ✅ **100% TypeScript** com tipagem forte para maior confiabilidade.

---

## 🧩 Algoritmos Implementados

| Algoritmo     | Descrição                                                    | Complexidade |
| ------------- | ------------------------------------------------------------ | ------------ |
| **First Fit** | Aloca no primeiro bloco livre que seja suficiente.           | O(n)         |
| **Best Fit**  | Aloca no menor bloco livre que seja suficiente.              | O(n)         |
| **Worst Fit** | Aloca no maior bloco livre disponível.                       | O(n)         |
| **Next Fit**  | Similar ao First Fit, mas começa a busca na última alocação. | O(n)         |

---

## 📁 Estrutura do Projeto

```bash
src/
├── main/
│   └── config/
│       └── main.ts                # Ponto de entrada da aplicação
├── simulator/
│   └── simulador.ts              # Classe principal de simulação
├── memory/
│   └── memoria.memory.ts         # Gerenciador de memória
├── algorithm/
│   ├── types/
│   │   └── algorithm.types.ts    # Tipos dos algoritmos
│   ├── firstFit.algorithm.ts
│   ├── bestFit.algorithm.ts
│   ├── worstFit.algorithm.ts
│   └── nextFit.algorithm.ts
└── process/
    ├── Processo.process.ts        # Classe Processo
    └── ProcessoGerador.process.ts # Gerador de process
```

🛠️

### 1- Instalação

Para configurar o projeto em sua máquina local, siga os passos abaixo. É necessário ter o [Node.js](https://nodejs.org/en), o [npm](https://www.npmjs.com/) e o [TypeScript](https://www.typescriptlang.org/) instalados.

Para rodar o projeto em sua máquina, siga as instruções abaixo:

```bash
Clone o repositório:
git clone https://github.com/Hyaguiin/memalloc-simulator-alloc4-.git
cd memalloc-simulator-alloc4-
```

### 2- Build:

Para compilar o código TypeScript para JavaScript, execute o comando de build. Isso irá transpilar os arquivos .ts para .js em um diretório de saída (geralmente dist/).

```bash
npm run build
```

### 3 Start:

Após a compilação, você pode iniciar o simulador com o comando start. Ele executará o código JavaScript a partir do diretório de build.

```bash
npm start
```

## Desenvolvimento

Para executar o projeto em modo de desenvolvimento (que compila e executa o código automaticamente), utilize o comando dev:

```bash
npm run dev
```
