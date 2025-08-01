import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRout.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'



//  App configuration

const app = express()
const port = process.env.PORT || 3000
connectDB()

connectCloudinary()


// middlewares

app.use(express.json())

app.use(cors())


// api end points

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () =>
    console.log(`sever is running at port ${port}`)
)

