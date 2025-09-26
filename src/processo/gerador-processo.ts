import { Processo } from "./processo.ts";

class GeradorDeProcessos {
  private static idCounter = 0;

  static gerarProcesso(): Processo {
    const id = this.idCounter++;
    const tamanho = Math.floor(Math.random() * (50 - 10 + 1)) + 10; // Tamanho entre 10 e 50
    return new Processo(id, tamanho);
  }

  static gerarProcessos(quantidade: number): Processo[] {
    if (typeof quantidade !== "number" || quantidade < 0) {
      throw new Error("Quantidade inválida.");
    }
    const processos = [];
    for (let i = 0; i < quantidade; i++) {
      processos.push(this.gerarProcesso());
    }
    return processos;
  }
}

export { GeradorDeProcessos };
