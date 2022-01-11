import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import electron from './plugins/vite-plugin-electron'
import path from 'path'
import html from 'vite-plugin-html'

console.log(process.version, 'process.version =====')
export default defineConfig({
    plugins: [
        vue(),
        electron(),
        html({
            inject: {
              data: {
                title: 'Redis Box',
                injectScript: '<script type="module" src="./src/renderer/main.js"></script>',
                process
              },
            },
            minify: true,
        }),
    ],
    pages: {
        index: {
            entry: './src/main.js',
            template: './public/index.html',
            title: 'RedisBox'
        },
        // sub_win: {
        //     entry: './src/renderer/pages/schedule/schedule.js',
        //     template: './public/sub_win.html',
        //     title: ''
        // }
    },
    root: './',
    base: './',
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets')
        }
    },
    css: {
        preprocessorOptions: {
          less: {
            modifyVars: {
              hack: `true; @import (reference) "${path.resolve('src/assets/css/variables.less')}";`,
            },
            javascriptEnabled: true,
          },
          scss: {
            additionalData: `@import "src/assets/css/variables.scss";`
          }
        }
    },
    build: {
        outDir: path.join(__dirname, 'dist/renderer'),
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                // modal: path.resolve(__dirname, 'modal.html')
            }
        },
        output: {
            format: 'cjs', // 配置Rollup打包输出CommonJs格式
        },
        external: ['electron'], // 配置Rollup不去打包electron
        commonjsOptions: {
            include: /node_modules|libs/,
        }
    },
    optimizeDeps: {
        exclude: ['electron'], // 配置vite 不要转换electron 模块
    }
})