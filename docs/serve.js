const esbuild = require('esbuild');
const svgrPlugin = require('esbuild-plugin-svgr');
const { sassPlugin } = require('esbuild-sass-plugin');

esbuild
  .serve(
    { servedir: 'docs', port: 4100 },
    {
      entryPoints: ['docs/App.tsx'],
      outdir: 'docs',
      bundle: true,
      platform: 'browser',
      sourcemap: true,
      define: { 'process.env.NODE_ENV': '"development"' },
      loader: { '.woff2': 'file' },
      plugins: [svgrPlugin(), sassPlugin()]
    }
  )
  .then(({ port }) => {
    console.log(`Krill docs running at http://localhost:${port}`);
  });
