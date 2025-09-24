
import { Simulador } from '../../simulator/index.ts'; 
import { Algoritmo } from '../../algorithm/types/algorithm.types.ts';


function main() {
  console.log('🚀 Iniciando simulação de alocação de memória...\n');

  const simulador = new Simulador(1000);
  const algoritmos: Algoritmo[] = ['firstFit', 'bestFit', 'worstFit', 'nextFit'] as const;

  algoritmos.forEach(algoritmo => {
    simulador.rodarSimulacoes(algoritmo, 100, 100);
  });

  console.log('\n✅ Simulação concluída!');
}

main();