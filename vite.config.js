import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';
import { defineConfig } from 'vite';
import glob from 'fast-glob';
import { fileURLToPath } from 'url';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';


export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    base: '/starting-templates/',
    root: 'src',

    css: {
      postcss: {
        plugins: [
          SortCss({
            sort: 'mobile-first',
          }),
        ],
      },
    },

    build: {
      sourcemap: true,
      minify: false,
      rollupOptions: {
        input: Object.fromEntries(
          glob
            .sync(['./src/*.html', './src/pages/**/*.html'], {
              ignore: ['./src/**/partials/**/*.html'],
            })
            .map(file => [
              path.relative(
                __dirname,
                file.slice(0, file.length - path.extname(file).length)
              ),
              fileURLToPath(new URL(file, import.meta.url)),
            ])
        ),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return 'assets/js/[name]-[hash].js';
          },
          assetFileNames: assetInfo => {
            const info = (assetInfo.names?.[0] || '').split('.');
            const extType = info[info.length - 1];

            if (/avif|webp|png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `assets/img/[name]-[hash][extname]`;
            }
            if (/css/i.test(extType)) {
              return `assets/css/[name]-[hash][extname]`;
            }
            if (/woff|woff2/.test(extType)) {
              return `assets/fonts/[name][extname]`;
            }

            return `assets/[name]-[hash][extname]`;
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
      ViteImageOptimizer({
        png: {
          quality: 86,
        },
        jpeg: {
          quality: 86,
        },
        jpg: {
          quality: 86,
        },
      }),
      {
        ...imagemin(['./src/img/**/*.{jpg,png,jpeg}'], {
          destination: './src/img/webp/',
          plugins: [imageminWebp({ quality: 86 })],
        }),
        apply: 'serve',
      },
    ],
  };
});
