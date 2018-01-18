const fs = require('fs')
const resolve = require('path').resolve
const dateFns = require('date-fns')

module.exports = (hbs) => {
  const partialsDir = './app/views/partials'

  fs.readdirSync(resolve(partialsDir))
    .forEach((filename) => {
      const matches = /^([^.]+).hbs$/.exec(filename)
      if (!matches) {
        return
      }

      const name = matches[1]
      const template = fs.readFileSync(`${partialsDir}/${filename}`, 'utf8')
      hbs.registerPartial(name, template)
    })

  hbs.registerHelper('nl2br', (options) => {
    var nl2br = (options.fn(this) + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2')
    return new hbs.SafeString(nl2br)
  })
  hbs.registerHelper('replace', (find, replace, context) => {
    return context.replace(new RegExp(find, 'g'), replace)
  })
  hbs.registerHelper('debug', (context) => {
    return new hbs.SafeString(
      '<pre class="debug"><code>' + JSON.stringify(context) + '</code></pre>'
    )
  })
  hbs.registerHelper('dateFormat', (date, format) => {
    return dateFns.format(new Date(date), format)
  })
}
