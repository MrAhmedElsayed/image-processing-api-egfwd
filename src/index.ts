import express from 'express'
import morgan from 'morgan'
import path from 'path'
import homeRoute from './routes/home'
import resizeRoute from './routes/resizeRoute'
import bodyParser from 'body-parser'

const app = express()
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))

app.use(morgan('dev'))

//add the router
app.use('/', homeRoute)
app.use('/resize', resizeRoute)

// handle 404 responses
app.use((req, res) => {
  res.status(404).sendFile(path.resolve('src', './views/notfound.html'))
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(process.env.port || 3000)

console.log('Server started at http://localhost: 3000')

export default app
