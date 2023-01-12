const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Dotenv ni sozlash
require('dotenv').config()

// POST so'rovida "body"ni o'qish uchun "middlewaer"
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Routes papkani ichidagi "route"larni "middleware"ga olib kelish
app.use('/', require('./routes/main'))
app.use('/api/cars', require('./routes/cars'))

// Port yaratish va serverni ishga tushurish
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URL,
        { useNewUrlParser: true }),
        () => console.log('Mongo DB connected'
    )
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
} catch (error) {
    console.log(error)
}