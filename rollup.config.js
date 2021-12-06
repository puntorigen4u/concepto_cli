import babel            from '@rollup/plugin-babel';
import { nodeResolve }  from '@rollup/plugin-node-resolve';
import typescript       from 'rollup-plugin-typescript2';

const config = {
  input: 'src/index.ts',
  external: [],
  output: {
    file: 'lib/index.js',
    format: 'umd',
    name: 'concepto_cli',
    sourcemap: false
  },

  plugins: [
    nodeResolve(),
    typescript({
        declaration: true,
        declarationDir: "lib/",
        declarationMap: true,
        experimentalDecorators: true
    }),
    babel({
      presets: [
        ['@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
        }]
      ],
      exclude: '**/node_modules/**',
      babelHelpers: 'bundled',
    })
  ]
};

export default config;