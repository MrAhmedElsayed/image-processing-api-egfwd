import express from 'express'
import path from 'path'
import morgan from 'morgan'
import resize from './routes/resize'
import { HomeCard } from './utils/homeMessage'

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../public')))
app.use(morgan('dev'))

app.use('/resize', resize)

app.get('/', (req, res) => {
  res.send(HomeCard)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`server started ctrl+L-click: http://localhost:${port}`)
})

export default app
