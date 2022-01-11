module.exports = {
    packagerConfig: {
        dir: './dist/renderer'
    },
    makers: [
        {
            name: '@electron-forge/maker-zip'
        }
    ],
    electronPackagerConfig: {
        packageManager: "yarn"
    },
}