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

- ✅ **4 Algoritmos de Alocação** implementados: *First Fit*, *Best Fit*, *Worst Fit* e *Next Fit*.
- ✅ **Geração aleatória de processos** com tamanhos variados.
- ✅ **Simulação de ciclo de vida completo** de alocação e desalocação de processos.
- ✅ Múltiplas execuções para **resultados estatisticamente significativos**.
- ✅ **Métricas detalhadas de desempenho** para comparar os algoritmos.
- ✅ Arquitetura **modular e extensível** para facilitar manutenções e atualizações.
- ✅ **100% TypeScript** com tipagem forte para maior confiabilidade.

---

## 🧩 Algoritmos Implementados

| Algoritmo   | Descrição                                            | Complexidade |
|-------------|------------------------------------------------------|--------------|
| **First Fit**  | Aloca no primeiro bloco livre que seja suficiente.   | O(n)         |
| **Best Fit**   | Aloca no menor bloco livre que seja suficiente.      | O(n)         |
| **Worst Fit**  | Aloca no maior bloco livre disponível.              | O(n)         |
| **Next Fit**   | Similar ao First Fit, mas começa a busca na última alocação. | O(n)    |

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
1#- Instalação

Para rodar o projeto em sua máquina, siga as instruções abaixo:
``` bash 
Clone o repositório:
git clone https://github.com/Hyaguiin/memalloc-simulator-alloc4-.git
cd memalloc-simulator-alloc4-
```

2#- Instale as dependências com pnpm:

Certifique-se de ter o pnpm
 instalado. Se ainda não tiver, pode instalar com o seguinte comando:
 ```bash
 npm install -g pnpm
 ```
 Depois, instale as dependências do projeto:
  ```bash
 pnpm install
 ```

 3# Compile o projeto:

O projeto é desenvolvido em TypeScript, então compile o código com:
 ```bash
 pnpm run dev
 ```

