import { Simulador } from "../simulador/simulador.ts";
import type { Algoritmo } from "../types/algoritmo.ts";
import { prompt } from "../prompt/prompt.ts";

/**
 * Exibe o menu principal de opções para o usuário.
 */
function mostrarMenu(): void {
  console.log("\n****************************************");
  console.log("* SIMULADOR DE ALOCAÇÃO DE MEMÓRIA     *");
  console.log("****************************************");
  console.log("1. First Fit");
  console.log("2. Best Fit");
  console.log("3. Worst Fit");
  console.log("4. Next Fit");
  console.log("5. Todos os algoritmos");
  console.log("0. Sair");
  console.log("****************************************");
}

/**
 * Função principal que gerencia o loop do programa,
 * interagindo com o usuário e iniciando as simulações.
 */
async function main(): Promise<void> {
  // Loop principal do menu.
  while (true) {
    mostrarMenu();

    const opcao = (await prompt("> ")).trim();

    if (opcao === "0") {
      console.log("Encerrando o simulador.");
      break;
    }

    // Valida a opção do menu.
    if (!["1", "2", "3", "4", "5"].includes(opcao)) {
      console.log("Opção inválida! Tente novamente.");
      continue;
    }

    // Coleta as configurações da simulação do usuário.
    const memoriaInput = (await prompt("Tamanho da Memória [padrão: 1024]: ")) || "1024";
    const repeticoesInput = (await prompt("Número de Repetições [padrão: 100]: ")) || "100";
    const tempoInput = (await prompt("Duração da Simulação (tempo) [padrão: 100]: ")) || "100";

    // Converte inputs para números, usando valores padrão se a conversão falhar.
    const memoria = parseInt(memoriaInput) || 1024;
    const repeticoes = parseInt(repeticoesInput) || 100;
    const tempo = parseInt(tempoInput) || 100;

    const simulador = new Simulador(memoria);
    const algoritmos: Algoritmo[] = ["firstFit", "bestFit", "worstFit", "nextFit"];

    if (opcao === "5") {
      // Executa a simulação para todos os algoritmos em sequência.
      for (const alg of algoritmos) {
        simulador.executar(alg, repeticoes, tempo);
      }
    } else {
      // Executa para o algoritmo escolhido.
      const alg = algoritmos[parseInt(opcao) - 1];
      if (alg) {
        simulador.executar(alg, repeticoes, tempo);
      }
    }

    // Pergunta ao usuário se deseja continuar.
    const continuar = (await prompt("\nDeseja realizar outra simulação? (s/n): ")).toLowerCase();
    if (continuar !== "s") {
      console.log("Encerrando o simulador.");
      break;
    }
  }
}

export default main;
