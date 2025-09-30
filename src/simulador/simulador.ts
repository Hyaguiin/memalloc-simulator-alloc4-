import { Memoria } from "../memoria/memoria.ts";
import { GeradorDeProcessos } from "../processo/gerador-processo.ts";
import { Processo } from "../processo/processo.ts";
import { MallocAlgoritmos } from "../algoritmos/algoritmos.ts";
import type { Algoritmo } from "../types/algoritmo.ts";

/**
 * Orquestra a simulação de alocação de memória.
 * Executa simulações para diferentes algoritmos, coleta métricas e exibe os resultados.
 */
export class Simulador {
  /** Tamanho padrão da memória para cada simulação. */
  private readonly tamanhoMemoria: number;
  /** Instância da memória da simulação*/
  private memoria: Memoria;

  constructor(tamanhoMemoria: number) {
    this.tamanhoMemoria = tamanhoMemoria;
    this.memoria = new Memoria(this.tamanhoMemoria);
  }

  /**
   * Executa uma única rodada da simulação para um determinado algoritmo.
   * @param algoritmo - O algoritmo a ser testado ('firstFit', 'bestFit', etc.).
   * @param tempoTotal - O número de "ticks" de tempo que a simulação durará.
   * @returns Um objeto contendo as métricas da simulação.
   */
  private rodarSimulacaoIndividual(
    algoritmo: Algoritmo,
    tempoTotal: number
  ): {
    mediaTamanhoProcessos: number;
    ocupacaoMedia: number;
    taxaDescarte: number;
  } {
    // Mantém uma lista dos processos atualmente alocados na memória.
    const processosAlocados: Processo[] = [];

    let totalProcessosGerados = 0;
    let somaTamanhoProcessos = 0;
    let totalOcupacaoMemoria = 0;
    let totalDescartados = 0;

    for (let t = 0; t < tempoTotal; t++) {
      // 1. Gerar 2 novos processos a cada "tick".
      const novosProcessos = GeradorDeProcessos.gerarProcessos(2);

      novosProcessos.forEach((processo) => {
        totalProcessosGerados++;
        somaTamanhoProcessos += processo.tamanho;

        // 2. Tentar alocar cada novo processo.
        const enderecoBase = MallocAlgoritmos[algoritmo](this.memoria, processo);

        if (enderecoBase !== -1) {
          // Se alocou, armazena o endereço e adiciona à lista de processos alocados.
          processo.enderecoBase = enderecoBase;
          processosAlocados.push(processo);
        } else {
          // Se não conseguiu alocar, conta como descartado.
          totalDescartados++;
        }
      });

      // 3. Desalocar 1 ou 2 processos aleatórios que estão na memória.
      const quantidadeRemover = Math.min(processosAlocados.length, Math.floor(Math.random() * 2) + 1);

      for (let i = 0; i < quantidadeRemover; i++) {
        // Escolhe um processo aleatório da lista de alocados.
        const indice = Math.floor(Math.random() * processosAlocados.length);
        const [removido] = processosAlocados.splice(indice, 1);

        if (removido) {
          // Libera o espaço na memória usando o endereço e tamanho corretos.
          this.memoria.liberar(removido.enderecoBase, removido.tamanho);
        }
      }

      // 4. Acumula a ocupação da memória neste "tick" para o cálculo da média.
      totalOcupacaoMemoria += this.memoria.getOcupacao();
    }

    // Calcula as métricas finais.
    const mediaTamanhoProcessos = totalProcessosGerados > 0 ? somaTamanhoProcessos / totalProcessosGerados : 0;
    const ocupacaoMedia = totalOcupacaoMemoria / tempoTotal;
    const taxaDescarte = totalProcessosGerados > 0 ? (totalDescartados / totalProcessosGerados) * 100 : 0;

    return {
      mediaTamanhoProcessos,
      ocupacaoMedia,
      taxaDescarte,
    };
  }

  /**
   * Executa múltiplas simulações para um algoritmo e calcula a média dos resultados.
   * @param algoritmo - O algoritmo a ser usado.
   * @param repeticoes - O número de vezes que a simulação individual deve ser repetida.
   * @param tempoTotal - A duração de cada simulação individual.
   */
  public rodarSimulacoes(algoritmo: Algoritmo, repeticoes: number, tempoTotal: number): void {
    let somaTamanhos = 0;
    let somaOcupacao = 0;
    let somaDescarte = 0;

    for (let i = 0; i < repeticoes; i++) {
      const resultado = this.rodarSimulacaoIndividual(algoritmo, tempoTotal);
      somaTamanhos += resultado.mediaTamanhoProcessos;
      somaOcupacao += resultado.ocupacaoMedia;
      somaDescarte += resultado.taxaDescarte;
    }

    // Exibe os resultados médios.
    console.log(`\n📊 Resultados após ${repeticoes} execuções (${algoritmo}):`);
    console.log(`- Tamanho médio dos processos: ${(somaTamanhos / repeticoes).toFixed(2)}`);
    console.log(`- Ocupação média da memória: ${(somaOcupacao / repeticoes).toFixed(2)}%`);
    console.log(`- Taxa de descarte: ${(somaDescarte / repeticoes).toFixed(2)}%`);
    console.log("--------------------------------------------------");
  }

  /**
   * Ponto de entrada público para executar a simulação completa para um algoritmo.
   * @param algoritmo - O algoritmo a ser executado.
   * @param repeticoes - Quantidade de repetições da simulação.
   * @param tempoTotal - Duração de cada simulação.
   */
  public executar(algoritmo: Algoritmo, repeticoes: number, tempoTotal: number): void {
    console.log("\n🧠 INICIANDO SIMULAÇÃO...");
    console.log(`Usando o algoritmo de alocação: ${algoritmo}`);
    console.log(`Configurações: Memória=${this.tamanhoMemoria}, Repetições=${repeticoes}, Duração=${tempoTotal}`);

    this.rodarSimulacoes(algoritmo, repeticoes, tempoTotal);

    console.log("=====================================");
    console.log("✅ Simulação finalizada!");
  }
}
