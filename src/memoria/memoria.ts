// memoria.ts

class Memoria {
  private tamanho: number;
  private celulas: boolean[];

  constructor(tamanho: number = 1024) {
    this.tamanho = tamanho;
    this.celulas = new Array(tamanho).fill(false);
  }

  get Tamanho() {
    return this.tamanho;
  }

  get Celulas() {
    return this.celulas;
  }

  alocar(tamanhoProcesso: number): number | null {
    for (let i = 0; i <= this.tamanho - tamanhoProcesso; i++) {
      if (this.celulas[i]) {
        continue;
      }
      let espacoLivre = true;
      for (let j = i; j < i + tamanhoProcesso; j++) {
        if (this.celulas[j]) {
          espacoLivre = false;
          i = j;
          break;
        }
      }

      if (espacoLivre) {
        for (let j = i; j < i + tamanhoProcesso; j++) {
          this.celulas[j] = true;
        }
      }
      return i;
    }
    return null;
  }

  alocarNoIndice(tamanhoProcesso: number, inicio: number): boolean {
    if (inicio < 0 || inicio + tamanhoProcesso > this.tamanho) {
      return false;
    }

    for (let j = inicio; j < inicio + tamanhoProcesso; j++) {
      if (this.celulas[j]) {
        return false;
      }
    }

    for (let j = inicio; j < inicio + tamanhoProcesso; j++) {
      this.celulas[j] = true;
    }

    return true;
  }

  liberar(idProcesso: number, tamanhoProcesso: number): void {
    for (let i = idProcesso; i < idProcesso + tamanhoProcesso; i++) {
      this.celulas[i] = false;
    }
  }

  getOcupacao(): number {
    const ocupados = this.celulas.filter((v) => v).length;
    return (ocupados / this.tamanho) * 100;
  }
}

export { Memoria };
