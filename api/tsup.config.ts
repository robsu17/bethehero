// tsup.config.js
export default {
  entryPoints: ["src/server.ts"], // Ponto de entrada do seu projeto TypeScript
  outDir: "build", // Pasta de saída para os arquivos JavaScript
  format: "cjs", // Formato de módulo para o bundle (CommonJS)
};
