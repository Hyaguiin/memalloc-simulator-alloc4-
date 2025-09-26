/**
 * Representa um processo no sistema.
 * Cada processo tem um identificador único e um tamanho que ele ocupará na memória.
 */
class Processo {
  /** O identificador único do processo. */
  id: number;
  /** O tamanho requerido pelo processo em unidades de memória. */
  tamanho: number;
  /** O endereço base onde o processo foi alocado na memória. -1 se não estiver alocado. */
  enderecoBase: number;

  /**
   * Cria uma nova instância de Processo.
   * @param id - O ID único para o processo.
   * @param tamanho - O tamanho que o processo necessita na memória.
   */
  constructor(id: number, tamanho: number) {
    this.id = id;
    this.tamanho = tamanho;
    this.enderecoBase = -1; // Inicia como não alocado
  }
}

export { Processo };
