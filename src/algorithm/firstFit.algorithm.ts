import { Processo } from "../main/process/Processo.process";
import { Memoria } from "../memory/memoria.memory";

export class FirstFit{
   static firstFit(memoria: Memoria, processo: Processo): boolean {
    return memoria.alocar(processo.tamanho);
  }
}
  