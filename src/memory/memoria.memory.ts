// memoria.ts

class Memoria {
  private tamanho: number;
  private listaEncadeada: boolean[];

  constructor(tamanho: number) {
    this.tamanho = tamanho;
    this.listaEncadeada = new Array(tamanho).fill(false);  
  }

  alocar(tamanhoProcesso: number): boolean {
    for (let i = 0; i <= this.tamanho - tamanhoProcesso; i++) {
      if (this.listaEncadeada.slice(i, i + tamanhoProcesso).every(v => !v)) {
        for (let j = i; j < i + tamanhoProcesso; j++) {
          this.listaEncadeada[j] = true;  
        }
        return true;
      }
    }
    return false;  
  }

  desalocar(idProcesso: number, tamanhoProcesso: number): void {
    for (let i = idProcesso; i < idProcesso + tamanhoProcesso; i++) {
      this.listaEncadeada[i] = false;  
    }
  }

  getOcupacao(): number {
    const ocupados = this.listaEncadeada.filter(v => v).length;
    return (ocupados / this.tamanho) * 100;
  }
}

export { Memoria };
