
import { Simulador } from "../../simulator";

const simulador = new Simulador(1000);

const algoritmos = ['firstFit', 'bestFit', 'worstFit', 'nextFit'] as const;

algoritmos.forEach(algoritmo => {
  simulador.rodarSimulacoes(algoritmo, 100, 100); 
});
