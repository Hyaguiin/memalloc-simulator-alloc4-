import { Simulador } from '../../simulator';
import { Algoritmo } from '../../algorithm/types/algorithm.types';
import { prompt } from '../../prompt/prompt.prompt';

function mostrarMenu(): void {
  console.log("\n****************************************");
  console.log("*      MEMORY ALLOCATION SIMULATOR     *");
  console.log("****************************************");
  console.log("1. First Fit");
  console.log("2. Best Fit"); 
  console.log("3. Worst Fit");
  console.log("4. Next Fit");
  console.log("5. All algorithms");
  console.log("0. Exit");
  console.log("****************************************");
}

async function main(): Promise<void> {
  const simulador = new Simulador();

  while (true) {
    mostrarMenu();
    
    const opcao = (await prompt("> ")).trim();
    
    if (opcao === '0') break;
    
    if (!['1','2','3','4','5'].includes(opcao)) {
      console.log("Opcao invalida!");
      continue;
    }

    // Pega configs
    const memoria = parseInt(await prompt("Memoria [1000]: ") || "1000");
    const repeticoes = parseInt(await prompt("Repeticoes [100]: ") || "100");
    const tempo = parseInt(await prompt("Tempo [100]: ") || "100");

    const algoritmos: Algoritmo[] = ['firstFit', 'bestFit', 'worstFit', 'nextFit'];

    if (opcao === '5') {
      for (const alg of algoritmos) {
        console.log(`Executando: ${alg}`);
        await simulador.executar(alg, repeticoes, tempo);
      }
    } else {
      const alg = algoritmos[parseInt(opcao) - 1];
      console.log(`Executando: ${alg}`);
      await simulador.executar(alg, repeticoes, tempo);
    }

    const continuar = (await prompt("Continuar? (s/n): ")).toLowerCase();
    if (continuar !== 's') break;
  }
}

main().catch(console.error);