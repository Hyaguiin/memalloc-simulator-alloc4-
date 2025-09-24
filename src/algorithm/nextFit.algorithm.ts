import { Processo } from "../main/process/Processo.process";
import { Memoria } from "../memory/memoria.memory";

export class NextFit{
 static nextFit(memoria: Memoria, processo: Processo): boolean {
    let start = memoria['tamanho'] - processo.tamanho;
    for (let i = start; i < memoria['tamanho']; i++) {
      if (memoria['listaEncadeada'].slice(i, i + processo.tamanho).every(v => !v)) {
        for (let j = i; j < i + processo.tamanho; j++) {
          memoria['listaEncadeada'][j] = true;
        }
        return true;
      }
    }
    return false;
  }
}
  
 