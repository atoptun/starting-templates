import path from 'path';
import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
// @ts-expect-error Package postcss-sort-media-queries does not have d.ts
import SortCss from 'postcss-sort-media-queries';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import checker from 'vite-plugin-checker';
// import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
// import { compression } from 'vite-plugin-compression2';
// import webfontDownload from 'vite-plugin-webfont-dl';
// import createSvgSpritePlugin from 'vite-plugin-svg-spriter';
// import IconSpritePlugin from './vite-plugins/vite-plugin-icon-sprite';
// import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    base: '/starting-templates/',
    root: 'src',

    css: {
      devSourcemap: true,
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
      rollupOptions: {
        input: glob.sync('./*.html', { cwd: 'src' }),
        // input: glob.sync('./src/*.html').map(file => path.relative('./src', file)),
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
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            const assetName = assetInfo.names?.[0] || '';

            if (assetName.endsWith('.html')) {
              return '[name].[ext]';
            }

            // if (assetName.endsWith('.css')) {
            //   return 'assets/[name].[ext]';
            // }

            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload([
        './**/*.html',
        './js/**/*.ts',
        './css/**/*.css',
        './icons/**/*.svg',
        './images/**/*.{svg,jpg,jpeg,png,gif,webp,avif}',
      ]),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./**/*.{ts,tsx}"',
        },
      }),
      // VitePluginSvgSpritemap('./icons/**/*.svg', { injectSvgOnDev: true }),
      // createSvgSpritePlugin({svgFolder: SVG_FOLDER_PATH}),
      // IconSpritePlugin(),
      // svgSpritePlugin({
      //   iconDirs: ['src/icons'],
      //   symbolId: 'icon-[name]',
      //   fileName: 'sprite.svg',
      // }),
      ViteImageOptimizer({
        cache: true,
        cacheLocation: path.resolve(__dirname, 'node_modules/.vite-image-optimizer-cache'),
        png: { quality: 80 },
        jpeg: { quality: 80 },
        jpg: { quality: 80 },
        webp: { quality: 75 },
        avif: { quality: 75 },
        exclude: /\.svg$/,
        // svg: {
        //   plugins: [
        //     { name: 'removeViewBox', active: false },
        //     { name: 'sortAttrs', active: true },
        //   ],
        // },
      }),
    ],
  };
});
