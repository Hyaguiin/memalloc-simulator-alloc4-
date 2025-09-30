import { Processo } from "../processo/processo.ts";
import { Memoria } from "../memoria/memoria.ts";

/**
 * Contém implementações estáticas dos algoritmos de alocação de memória.
 */
export class MallocAlgoritmos {
  /** Armazena o último índice verificado para o algoritmo Next Fit. */
  private static ultimaPosicao: number = 0;

  /**
   * Aloca memória usando o algoritmo First Fit.
   * Encontra o primeiro bloco de memória livre que seja grande o suficiente.
   * @param memoria - A instância da memória onde alocar.
   * @param processo - O processo a ser alocado.
   * @returns O endereço base se a alocação for bem-sucedida, caso contrário, -1.
   */
  static firstFit(memoria: Memoria, processo: Processo): number {
    for (let i = 0; i <= memoria.Tamanho - processo.tamanho; i++) {
      // Procura pelo primeiro buraco que comporte o processo.
      if (memoria.alocar(processo.tamanho, i)) {
        return i; // Retorna o endereço base.
      }
    }
    return -1; // Não encontrou espaço.
  }

  /**
   * Aloca memória usando o algoritmo Next Fit.
   * Começa a busca a partir da última posição alocada.
   * @param memoria - A instância da memória onde alocar.
   * @param processo - O processo a ser alocado.
   * @returns O endereço base se a alocação for bem-sucedida, caso contrário, -1.
   */
  static nextFit(memoria: Memoria, processo: Processo): number {
    // Inicia a busca da última posição e dá a volta na memória.
    for (let i = this.ultimaPosicao; i < memoria.Tamanho; i++) {
      if (i + processo.tamanho <= memoria.Tamanho && memoria.verificarEspacoLivre(i, processo.tamanho)) {
        if (memoria.alocar(processo.tamanho, i)) {
          this.ultimaPosicao = i + processo.tamanho;
          return i;
        }
      }
    }

    // Se não encontrou, busca do início até a última posição.
    for (let i = 0; i < this.ultimaPosicao; i++) {
      if (i + processo.tamanho <= memoria.Tamanho && memoria.verificarEspacoLivre(i, processo.tamanho)) {
        if (memoria.alocar(processo.tamanho, i)) {
          this.ultimaPosicao = i + processo.tamanho;
          return i;
        }
      }
    }

    return -1; // Não encontrou espaço.
  }

  /**
   * Aloca memória usando o algoritmo Best Fit.
   * Encontra o menor bloco de memória livre que seja grande o suficiente.
   * @param memoria - A instância da memória onde alocar.
   * @param processo - O processo a ser alocado.
   * @returns O endereço base se a alocação for bem-sucedida, caso contrário, -1.
   */
  static bestFit(memoria: Memoria, processo: Processo): number {
    let melhorIndice = -1;
    let menorTamanho = Infinity; // Começa com um valor infinito.

    let i = 0;
    while (i <= memoria.Tamanho - processo.tamanho) {
      if (memoria.verificarEspacoLivre(i, 1)) {
        // Encontrou o início de um buraco
        let tamanhoBuraco = 0;
        let j = i;
        // Calcula o tamanho do buraco atual.
        while (j < memoria.Tamanho && memoria.verificarEspacoLivre(j, 1)) {
          tamanhoBuraco++;
          j++;
        }

        // Se o buraco for suficiente e for o melhor até agora.
        if (tamanhoBuraco >= processo.tamanho && tamanhoBuraco < menorTamanho) {
          menorTamanho = tamanhoBuraco;
          melhorIndice = i;
        }
        i = j; // Pula para o final do buraco para continuar a busca.
      } else {
        i++;
      }
    }

    if (melhorIndice !== -1) {
      if (memoria.alocar(processo.tamanho, melhorIndice)) {
        return melhorIndice;
      }
    }

    return -1;
  }

  /**
   * Aloca memória usando o algoritmo Worst Fit.
   * Encontra o maior bloco de memória livre que seja grande o suficiente.
   * @param memoria - A instância da memória onde alocar.
   * @param processo - O processo a ser alocado.
   * @returns O endereço base se a alocação for bem-sucedida, caso contrário, -1.
   */
  static worstFit(memoria: Memoria, processo: Processo): number {
    let piorIndice = -1;
    let maiorTamanho = -1; // Começa com -1.

    let i = 0;
    while (i <= memoria.Tamanho) {
      if (memoria.verificarEspacoLivre(i, 1)) {
        // Encontrou o início de um buraco
        let tamanhoBuraco = 0;
        let j = i;
        // Calcula o tamanho do buraco atual.
        while (j < memoria.Tamanho && memoria.verificarEspacoLivre(j, 1)) {
          tamanhoBuraco++;
          j++;
        }

        // Se o buraco for suficiente e for o maior até agora.
        if (tamanhoBuraco >= processo.tamanho && tamanhoBuraco > maiorTamanho) {
          maiorTamanho = tamanhoBuraco;
          piorIndice = i;
        }
        i = j; // Pula para o final do buraco para continuar a busca.
      } else {
        i++;
      }
    }

    if (piorIndice !== -1) {
      if (memoria.alocar(processo.tamanho, piorIndice)) {
        return piorIndice;
      }
    }

    return -1;
  }
}
