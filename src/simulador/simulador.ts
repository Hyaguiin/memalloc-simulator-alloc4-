import { Memoria } from "../memoria/memoria.ts";
import { GeradorDeProcessos } from "../processo/gerador-processo.ts";
import { Processo } from "../processo/processo.ts";
import { MallocAlgoritmos } from "../algoritmos/algoritmos.ts";
import type { Algoritmo } from "../types/algoritmo.ts";

export class Simulador {
  private readonly tamanhoMemoria: number;

  constructor(tamanhoMemoria: number = 1024) {
    this.tamanhoMemoria = tamanhoMemoria;
  }

  private rodarSimulacaoIndividual(
    algoritmo: Algoritmo,
    tempoTotal: number
  ): {
    mediaTamanhoProcessos: number;
    ocupacaoMedia: number;
    taxaDescarte: number;
  } {
    const memoria = new Memoria(this.tamanhoMemoria);
    const processos: Processo[] = [];

    let totalProcessosGerados = 0;
    let somaTamanhoProcessos = 0;
    let totalOcupacaoMemoria = 0;
    let totalDescartados = 0;

    for (let t = 0; t < tempoTotal; t++) {
      // Gerar 2 novos processos
      const novos = GeradorDeProcessos.gerarProcessos(2);

      novos.forEach((processo) => {
        totalProcessosGerados++;
        somaTamanhoProcessos += processo.tamanho;

        const alocou = MallocAlgoritmos[algoritmo](memoria, processo);
        if (alocou) {
          processos.push(processo);
        } else {
          totalDescartados++;
        }
      });

      // Desalocar 1 ou 2 processos aleatórios
      const quantidadeRemover = Math.min(processos.length, Math.floor(Math.random() * 2) + 1);

      for (let i = 0; i < quantidadeRemover; i++) {
        const indice = Math.floor(Math.random() * processos.length);
        const removido = processos.splice(indice, 1)[0];
        if (removido) {
          memoria.liberar(removido.id, removido.tamanho);
        }
      }

      // Acumula ocupação para cálculo da média
      totalOcupacaoMemoria += memoria.getOcupacao();
    }

    const mediaTamanhoProcessos = somaTamanhoProcessos / totalProcessosGerados;
    const ocupacaoMedia = totalOcupacaoMemoria / tempoTotal;
    const taxaDescarte = (totalDescartados / totalProcessosGerados) * 100;

    return {
      mediaTamanhoProcessos,
      ocupacaoMedia,
      taxaDescarte,
    };
  }

  public rodarSimulacoes(algoritmo: Algoritmo, repeticoes: number = 100, tempoTotal: number = 100): void {
    let somaTamanhos = 0;
    let somaOcupacao = 0;
    let somaDescarte = 0;

    for (let i = 0; i < repeticoes; i++) {
      const resultado = this.rodarSimulacaoIndividual(algoritmo, tempoTotal);
      somaTamanhos += resultado.mediaTamanhoProcessos;
      somaOcupacao += resultado.ocupacaoMedia;
      somaDescarte += resultado.taxaDescarte;
    }

    console.log(`\n📊 Resultados após ${repeticoes} execuções (${algoritmo}):`);
    console.log(`- Tamanho médio dos processos: ${(somaTamanhos / repeticoes).toFixed(2)}`);
    console.log(`- Ocupação média da memória: ${(somaOcupacao / repeticoes).toFixed(2)}%`);
    console.log(`- Taxa de descarte: ${(somaDescarte / repeticoes).toFixed(2)}%`);
    console.log("--------------------------------------------------");
  }

  public executar(algoritmo: Algoritmo, repeticoes: number = 100, tempoTotal: number = 100): void {
    console.log("\n🧠 INICIANDO SIMULAÇÃO...");
    console.log(`Usando o algoritmo de alocação: ${algoritmo}`);

    // Chama a função que roda as simulações do algoritmo
    this.rodarSimulacoes(algoritmo, repeticoes, tempoTotal);

    console.log("=====================================");
    console.log("✅ Simulação finalizada!");
  }
}
