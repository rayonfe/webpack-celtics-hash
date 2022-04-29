
const md5 = require('md5');

const cache = {}

function WebpackCelticsHash() {}
WebpackCelticsHash.prototype.apply = useMd5

function useMd5(webpackCompiler) {
    webpackCompiler.plugin('shouldEmit', function(out) {
        out.chunks.forEach(function(chunk) {
            const outFilesList = chunk.files.map(function(name) {
                if (cache[name]) return cache[name]

                const source =
                    webpackCompiler.assets[name].source()
                const sourceWithMd5 = md5(source).slice(0, 12)

                const [ sourceName, suffix ] = name.split('.')
                const coolName = sourceName + '.' + sourceWithMd5 + '.' + suffix

                out.assets[coolName] = out.assets[name]
                delete out.assets[name]

                cache[name] = coolName
                return coolName
            })

            chunk.files = outFilesList
        })
        return true
    })
}



module.exports = WebpackCelticsHash