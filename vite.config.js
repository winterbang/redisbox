import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import electron from './plugins/vite-plugin-electron'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        electron()
    ],
    root: './',
    resolve: {
        alias: {
            '@aassets': path.resolve(__dirname, './src/assets')
        }
    },
    build: {
        outDir: path.join(__dirname, 'dist/renderer'),
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                modal: path.resolve(__dirname, 'modal.html')
            }
        },
        output: {
            format: 'cjs', // 配置Rollup打包输出CommonJs格式
        },
        external: ['electron'], // 配置Rollup不去打包electron
    },
    optimizeDeps: {
        exclude: ['electron'], // 配置vite 不要转换electron 模块
    }
})