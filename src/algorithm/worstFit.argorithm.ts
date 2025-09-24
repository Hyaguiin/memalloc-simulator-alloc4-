import { Processo } from "../main/process/Processo.process";
import { Memoria } from "../memory/memoria.memory";

export class WorstFit{
 static worstFit(memoria: Memoria, processo: Processo): boolean {
    let melhorPosicao = -1;
    let maiorEspaco = -1;
    for (let i = 0; i <= memoria['tamanho'] - processo.tamanho; i++) {
      if (memoria['listaEncadeada'].slice(i, i + processo.tamanho).every(v => !v)) {
        const espacoRestante = memoria['listaEncadeada'].slice(i + processo.tamanho).filter(v => !v).length;
        if (espacoRestante > maiorEspaco) {
          maiorEspaco = espacoRestante;
          melhorPosicao = i;
        }
      }
    }
    if (melhorPosicao !== -1) {
      for (let i = melhorPosicao; i < melhorPosicao + processo.tamanho; i++) {
        memoria['listaEncadeada'][i] = true;
      }
      return true;
    }
    return false;
  }
}
  
 