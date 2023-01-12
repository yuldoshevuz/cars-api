const { Router } = require('express')
const router = Router()
let books = require('../books')

// Barcha kitoblarni olish
router.get('/', (req, res) => {
    const resp = {
        status: 'ok',
        message: `Bazada umumiy ${books.length} ta ${books.length > 1 ? 'kitoblar' : 'kitob'} mavjud`,
        books: books ? books : []
    }
    res.json(resp)
})
// Kitobni id raqami orqali olish
router.get('/:id', (req, res) => {
    const id = +req.params.id
    const isExist = books.some(book => book.id === id)
    const book = books.filter(book => book.id === id)
    const resp = (status, message) => ({status, message, book})
    if (isExist) {
        res.status(200).json(resp('ok', `Siz so'ragan ${id}-id raqamga ega kitob mavjud`))
    } else {
        res.status(404).json(resp('not found', `Kechirasiz, siz so'ragan ${id}-idga ega kitob topilmadi`))
    }
})
// Yangi kitob qo'shish
router.post('/', (req, res) => {
    const body = req.body
    const newBook = {
        id: books.length +1, title: body.title,
        author: body.author, pages: body.pages
    }
    const resp = (status, message, book) => ({status, message, book})
    if (!body.title || !body.author || !body.pages) {
        res.status(400).json(resp('baq request', "Iltimos barcha parametrlarni kiriting", []))
    } else {
        books.push(newBook)
        res.status(200).json(resp('ok', "Kitob muvaffaqiyatli qo'shildi", newBook))
    }
})
// Mavjud kitobni yangilash
router.put('/:id', (req, res) => {
    const id = +req.params.id
    const updBook = req.body
    const isExist = books.some(book => book.id === id)
    const book = books.find(book => book.id === id)
    const resp = (status, message, book) => ({status, message, book})
    if (isExist) {
        book.title = updBook.title ? updBook.title : book.title
        book.author = updBook.author ? updBook.author : book.author
        book.pages = updBook.pages ? updBook.pages : book.pages
        res.status(200).json(resp('ok', `Yaxshi, ${id}-idga ega kitob ma'lumotlari yangilandi`, [book]))
    } else {
        res.status(404).json(resp('not found', `Kechirasiz, siz so'ragan ${id}-idga ega kitob topilmadi`, []))
    }
})
// Mavjud kitobni o'chirish
router.delete('/:id', (req, res) => {
    const id = +req.params.id
    const isExist = books.some(book => book.id === id)
    const delBooks =  books.filter(book => book.id !== id)
    const resp = (status, message) => ({status, message, books})

    if (isExist) {
        books = delBooks
        res.status(200).json(resp('ok', `Yaxshi, ${id}-idga ega kitob muvaffaqiyatli o'chirib yuborildi`))
    } else {
        res.status(404).json(resp('not found', `Kechirasiz, siz so'ragan ${id}-idga ega kitob topilmadi`))
    }
})

module.exports = router