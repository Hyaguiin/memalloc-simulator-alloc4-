import { Processo } from "./processo.ts";

/**
 * Classe responsável por gerar processos com tamanhos aleatórios.
 * Mantém um contador estático para garantir que cada processo tenha um ID único.
 */
class GeradorDeProcessos {
  /** Contador estático para gerar IDs de processo sequenciais e únicos. */
  private static idCounter = 0;

  /**
   * Gera um único processo com um novo ID e tamanho aleatório.
   * O tamanho do processo varia entre 10 e 50 unidades de memória.
   * @returns Uma nova instância de `Processo`.
   */
  static gerarProcesso(): Processo {
    const id = this.idCounter++;
    const tamanho = Math.floor(Math.random() * (50 - 10 + 1)) + 10; // Tamanho entre 10 e 50
    return new Processo(id, tamanho);
  }

  /**
   * Gera uma lista de processos.
   * @param quantidade - O número de processos a serem gerados.
   * @returns Um array de instâncias de `Processo`.
   * @throws {Error} Se a quantidade não for um número válido ou for negativa.
   */
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
