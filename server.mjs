
import fs from 'fs'
import querystring from 'querystring'
import express from 'express'

import bodyParser from 'body-parser'


const UPLOADDIR = './uploads'


fs.mkdir(UPLOADDIR, err => {
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

app.use('/uploads', express.static(UPLOADDIR, {
	setHeaders (res, path) {

		if (res.req.query.dl && 'GET' === res.req.methos) {

			const contentDisposition = 'attachment;filename=' +
					querystring.escape(path.split('/').pop())

			res.set({
				'Content-Disposition': contentDisposition
			})
		}

	}
}))

app.post('/upload', (req, res, next) => {

	const fname = querystring.unescape(req.headers['x-meta-filename'])

	console.log(fname)

	const outStream = fs.createWriteStream(`${UPLOADDIR}/${fname}`)

	req.on('error', err => next(err))

	req.pipe(outStream)

	req.on('end', () => {
		res.send('ok')
	})

})

app.get('/list', (req, res, next) => {

	fs.readdir(UPLOADDIR, (err, data) => {
		if (err) {
			next(err)
			return
		}

		res.setHeader('content-type', 'application/json')

		res.send(data)
	})

})

app.delete('/uploads/:filename', (req, res, next) => {

	fs.unlink(`${UPLOADDIR}/${req.params.filename}`, (err) => {
		if (err) {
			next(err)
			return
		}

		res.send('ok')
	})

})


const PORT = 28080

app.listen(PORT, () => {
	console.log(`\tlistening at http://localhost:${PORT}`)
})
