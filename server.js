const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const log = require('pino')({ level: 'info' })
const fastify = require('fastify')({ logger: log })
const helmet = require('fastify-helmet')
const serveStatic = require('fastify-static')
const hbs = require('handlebars')
const request = require('request')
require('dotenv').config()
const initHbs = require('./app/helpers/init-hbs')

initHbs(hbs)

const now = new Date()
const port = process.env.PORT || 3104
const APP_TITLE = 'HERE_COMES_TITLE'
const APP_DESCRIPTION = 'HERE_COMES_DESCRIPTION'
const siteUrl = process.env.SITE_URL || `http://localhost:${port}`

fastify.register(helmet)
fastify.register(require('point-of-view'), {
  engine: {
    handlebars: hbs
  },
  templates: './app/views'
})

fastify.register(serveStatic, {
  root: path.join(__dirname, 'app/assets'),
  prefix: '/assets/'
})

fastify.get('/', (req, reply) => {
  initHbs(hbs)

  request.get({
    url: `http://localhost:${fastify.server.address().port}/api/compact`,
    json: true
  }, (err, res) => {
    console.log(res.body.main_photo.content.photo.photo_urls['1691'])
      reply.view('/index.hbs', {
        title: `${APP_TITLE}`,
        siteName: `${APP_TITLE}`,
        siteUrl,
        post: res.body,
        props: JSON.stringify(res.body)
      }, { stream: true })
    })
    .on('error', function(err) {
      console.log(err)
    })
})

fastify.get('/api/compact', (req, reply) => {
  reply.type('application/json').code(200)
  reply.send(fs.createReadStream('./app/api/compact.json', 'utf-8'))
})

fastify.get('/api/element', (req, reply) => {
  reply.type('application/json').code(200)
  setTimeout(() => {
    reply.send(fs.createReadStream('./app/api/element.json', 'utf-8'))
  }, 300)
})

fastify.get('/api/recommend', (req, reply) => {
  reply.type('application/json').code(200)
  setTimeout(() => {
    reply.send(fs.createReadStream('./app/api/recommend.json', 'utf-8'))
  }, 500)
})

fastify.setNotFoundHandler((req, reply) => {
  reply.header('Content-Type', 'text/html')

  reply.view('/404.hbs', {
    title: `ページが見つかりませんでした | ${APP_TITLE}`,
    siteUrl,
    now
  })
})

function start () {
  fastify.listen(port, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
  })
}

if (require.main === module) {
  start()
}

module.exports = { start, fastify }
