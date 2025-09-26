import { Processo } from "../processo/processo.ts";
import { Memoria } from "../memoria/memoria.ts";

export class MallocAlgoritmos {
  private static ultimaPosicao: number = 0;

  static firstFit(memoria: Memoria, processo: Processo): boolean {
    return memoria.alocar(processo.tamanho) ? true : false;
  }
  static nextFit(memoria: Memoria, processo: Processo): boolean {
    let memoriaLivre = memoria.Tamanho - processo.tamanho;
    for (let i = this.ultimaPosicao; i < memoriaLivre; i++) {
      if (this.verificarEspacoLivre(memoria, i, processo.tamanho)) {
        if (memoria.alocarNoIndice(processo.tamanho, i)) {
          this.ultimaPosicao = i + processo.tamanho;
          return true;
        }
      }
    }
    return false;
  }
  static bestFit(memoria: Memoria, processo: Processo): boolean {
    let melhorPosicao = -1;
    let menorEspaco = Infinity;
    for (let i = 0; i <= memoria.Tamanho - processo.tamanho; i++) {
      if (this.verificarEspacoLivre(memoria, i, processo.tamanho)) {
        const espacoRestante = memoria.Celulas.slice(i + processo.tamanho).filter((v) => !v).length;
        if (espacoRestante < menorEspaco) {
          menorEspaco = espacoRestante;
          melhorPosicao = i;
        }
      }
    }
    if (melhorPosicao !== -1) {
      return memoria.alocarNoIndice(processo.tamanho, melhorPosicao);
    }
    return false;
  }
  static worstFit(memoria: Memoria, processo: Processo): boolean {
    let melhorPosicao = -1;
    let maiorEspaco = -1;
    for (let i = 0; i <= memoria.Tamanho - processo.tamanho; i++) {
      if (this.verificarEspacoLivre(memoria, i, processo.tamanho)) {
        const espacoRestante = memoria.Celulas.slice(i + processo.tamanho).filter((v) => !v).length;
        if (espacoRestante > maiorEspaco) {
          maiorEspaco = espacoRestante;
          melhorPosicao = i;
        }
      }
    }
    if (melhorPosicao !== -1) {
      return memoria.alocarNoIndice(processo.tamanho, melhorPosicao);
    }
    return false;
  }

  private static verificarEspacoLivre(memoria: Memoria, inicio: number, tamanho: number): boolean {
    for (let i = inicio; i < inicio + tamanho; i++) {
      if (memoria.Celulas[i]) {
        return false;
      }
    }
    return true;
  }
}
