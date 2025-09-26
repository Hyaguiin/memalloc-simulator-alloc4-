export function prompt(pergunta: string): Promise<string> {
  process.stdout.write(pergunta);
  return new Promise((resolve) => {
    process.stdin.once("data", (data) => {
      resolve(data.toString().trim());
    });
  });
  // return promptSync({ sigint: true })(pergunta);
  //Todos os outros syncs prompt tavam em loop
}
