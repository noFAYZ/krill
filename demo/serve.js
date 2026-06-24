const esbuild = require('esbuild');
const svgrPlugin = require('esbuild-plugin-svgr');
const { sassPlugin } = require('esbuild-sass-plugin');

esbuild
  .serve(
    { servedir: 'demo', port: 4000 },
    {
      entryPoints: ['demo/App.tsx', 'demo/email/App.tsx', 'demo/blocks/App.tsx'],
      outdir: 'demo',
      bundle: true,
      platform: 'browser',
      sourcemap: true,
      define: { 'process.env.NODE_ENV': '"development"' },
      loader: { '.woff2': 'file' },
      plugins: [svgrPlugin(), sassPlugin()]
    }
  )
  .then(({ port }) => {
    console.log(`Krill component showcase running at http://localhost:${port}`);
    console.log(`Krill email demo running at http://localhost:${port}/email/`);
    console.log(`Krill block demos running at http://localhost:${port}/blocks/`);
  });
