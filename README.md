# Lotus

Site da Lotus ([lotusdev.com.br](https://lotusdev.com.br)) em React + Vite + Tailwind, e ponto de publicação dos sites filhos em `lotusdev.com.br/<nome>/`.

## Desenvolvimento

```bash
git clone --recurse-submodules https://github.com/Lotus-SDS/Lotus_site.git
npm install
npm run dev
```

`npm run lint` e `npm run build` são os mesmos passos que o CI roda em todo PR.

## Sites filhos e deploy

Cada pasta em `sites/` é um submodule com outro site, publicado no caminho de mesmo nome. Todo push na `main` faz o deploy. Quando a `main` de um site filho avança, o Lotus_site atualiza o submodule na própria `main` e publica sozinho.

Como funciona, como adicionar um site e a configuração do servidor: [docs/ci-cd.md](docs/ci-cd.md).
