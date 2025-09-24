declare module 'prompt-sync' {
  const prompt: (config?: { sigint?: boolean }) => (question: string) => string;
  export default prompt;
}
