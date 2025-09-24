import { Simulador } from "../../simulator";
import { Algoritmo } from "../../algorithm/types/algorithm.types";
import promptSync from "prompt-sync";

const prompt = promptSync();

function main() {
  console.log("🚀 Simulador de Alocação de Memória");

  const algoritmosDisponiveis: Algoritmo[] = ["firstFit", "bestFit", "worstFit", "nextFit"];

  console.log("\nAlgoritmos disponíveis:");
  algoritmosDisponiveis.forEach((alg, i) => {
    console.log(`${i + 1}. ${alg}`);
  });

  const escolha = parseInt(prompt("\nEscolha um algoritmo (1-4): "));
  const algoritmoSelecionado = algoritmosDisponiveis[escolha - 1];

  if (!algoritmoSelecionado) {
    console.log("❌ Algoritmo inválido. Encerrando.");
    return;
  }

  const memoria = parseInt(prompt("Tamanho da memória (ex: 1000): "));
  const numSimulacoes = parseInt(prompt("Número de simulações (ex: 100): "));
  const processosPorSimulacao = parseInt(prompt("Número de processos por simulação (ex: 100): "));

  console.log(`\n🧠 Executando ${numSimulacoes} simulações com o algoritmo "${algoritmoSelecionado}"...\n`);

  const simulador = new Simulador(memoria);
  simulador.rodarSimulacoes(algoritmoSelecionado, numSimulacoes, processosPorSimulacao);

  console.log("\n✅ Simulação concluída!");
}

main();
