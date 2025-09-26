/**
 * Simula um bloco de memória contígua.
 * A memória é modelada como um array de "células", onde cada célula pode estar ocupada (true) ou livre (false).
 */
class Memoria {
  /** O tamanho total da memória em unidades. */
  private readonly tamanho: number;
  /** Um array de booleanos representando as células da memória. `true` = ocupado, `false` = livre. */
  private celulas: boolean[];

  /**
   * Cria uma instância de Memória.
   * @param tamanho - O tamanho total da memória a ser simulada. O padrão é 1024.
   */
  constructor(tamanho: number = 1024) {
    this.tamanho = tamanho;
    // Inicializa todas as células como livres (false).
    this.celulas = new Array(tamanho).fill(false);
  }

  /** Retorna o tamanho total da memória. */
  get Tamanho() {
    return this.tamanho;
  }

  /** Retorna uma cópia do array de células para evitar modificação externa. */
  get Celulas() {
    return this.celulas;
  }

  /**
   * Tenta alocar um processo na memória em um índice específico.
   * @param tamanhoProcesso - O tamanho do processo a ser alocado.
   * @param inicio - O índice inicial onde a alocação deve começar.
   * @returns `true` se a alocação for bem-sucedida, `false` caso contrário.
   */
  alocar(tamanhoProcesso: number, inicio: number): boolean {
    // Validação dos limites da memória.
    if (inicio < 0 || inicio + tamanhoProcesso > this.tamanho) {
      return false;
    }

    // Verifica se o bloco inteiro está livre.
    for (let j = inicio; j < inicio + tamanhoProcesso; j++) {
      if (this.celulas[j]) {
        return false; // Bloco já ocupado.
      }
    }

    // Ocupa as células.
    for (let j = inicio; j < inicio + tamanhoProcesso; j++) {
      this.celulas[j] = true;
    }

    return true;
  }

  /**
   * Libera um bloco de memória com base em seu endereço inicial e tamanho.
   * @param enderecoBase - O endereço inicial do bloco a ser liberado.
   * @param tamanho - O tamanho do bloco a ser liberado.
   */
  liberar(enderecoBase: number, tamanho: number): void {
    // Validação para garantir que a liberação ocorra dentro dos limites.
    if (enderecoBase < 0 || enderecoBase + tamanho > this.tamanho) {
      console.error("Erro: Tentativa de liberar memória fora dos limites.");
      return;
    }
    // Libera as células.
    for (let i = enderecoBase; i < enderecoBase + tamanho; i++) {
      this.celulas[i] = false;
    }
  }

  /**
   * Calcula a porcentagem de ocupação da memória.
   * @returns A porcentagem de memória ocupada.
   */
  getOcupacao(): number {
    const ocupados = this.celulas.filter((celula) => celula).length;
    return (ocupados / this.tamanho) * 100;
  }

  /**
   * Verifica se um bloco de memória de um determinado tamanho está livre a partir de uma posição inicial.
   * @param inicio - O índice inicial da verificação.
   * @param tamanho - O tamanho do bloco a ser verificado.
   * @returns `true` se o bloco estiver completamente livre, `false` caso contrário.
   */
  verificarEspacoLivre(inicio: number, tamanho: number): boolean {
    if (inicio + tamanho > this.tamanho) {
      return false;
    }
    for (let i = inicio; i < inicio + tamanho; i++) {
      if (this.celulas[i]) {
        return false; // Encontrou uma célula ocupada.
      }
    }
    return true; // Nenhuma célula ocupada foi encontrada.
  }
}

export { Memoria };
