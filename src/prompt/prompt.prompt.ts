// MÉTODO MAIS CRÚ POSSÍVEL
export function prompt(pergunta: string): Promise<string> {
  process.stdout.write(pergunta);
  return new Promise((resolve) => {
    process.stdin.once('data', (data) => {
      resolve(data.toString().trim());
    });
  });
}
