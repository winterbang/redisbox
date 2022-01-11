import electron from 'electron'
import path from 'path'
import { spawn } from 'child_process'
import chalk from 'chalk'

function electronLog (data, color) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => log += `  ${line}\n`)
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron -------------------') +
      '\n\n' +
      log +
      chalk[color].bold('┗ ----------------------------') +
      '\n'
    )
  }
}

let electronProcess = null
export default function() {
  return {
    name: 'vite-plugin-electron',
    buildStart() {
      if(electronProcess) return
      let args = [ '--inspect=5858', path.join(__dirname, '../src/main/index.js') ]
      electronProcess = spawn(electron, args)

      electronProcess.stdout.on('data', data => {
        electronLog(data, 'blue')
      })
      electronProcess.stderr.on('data', data => {
        electronLog(data, 'red')
      })

      electronProcess.on('close', () => {
        // if (!manualRestart) process.exit()
      })
    },
    configureServer() {
      console.log('configureServer =====')
    },
    transformIndexHtml(html) {
      console.log('transformIndexHtml')
    }
  }
}