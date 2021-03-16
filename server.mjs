
import fs from 'fs'
import querystring from 'querystring'
import express from 'express'

import bodyParser from 'body-parser'

fs.mkdir('uploads', err => {
	if (err && 'EEXIST' !== err.code) {
		console.error(err)
		process.exit(1)
	}
})

const app = express()

app.use((req, res, next) => {
	console.log(req.method, req.url, res.statusCode)
	next()
})

app.use(express.static('dist'))

app.post('/upload', (req, res, next) => {

	const fname = querystring.unescape(req.headers['x-meta-filename'])

	console.log(fname)

	const outStream = new fs.createWriteStream(`./uploads/${fname}`)

	req.on('error', err => next(err))

	req.pipe(outStream)

	req.on('end', () => {
		res.send('ok')
	})

})

const PORT = 28080

app.listen(PORT, () => {
	console.log(`\tlistening at http://localhost:${PORT}`)
})
