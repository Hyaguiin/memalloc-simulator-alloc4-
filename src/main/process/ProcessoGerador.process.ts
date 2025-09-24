
class GeradorDeProcessos {
  private static idCounter = 0;

  static gerarProcesso(): { id: number, tamanho: number } {
    const id = this.idCounter++;
    const tamanho = Math.floor(Math.random() * (50 - 10 + 1)) + 10; // Tamanho entre 10 e 50
    return { id, tamanho };
  }
}

export { GeradorDeProcessos };
