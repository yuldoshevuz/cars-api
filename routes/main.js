const { Router } = require('express')
const router = Router()

// Asosiy sahifaga so'rov jo'natish
router.get('/', (req, res) => {
    res.redirect('/api/cars')
})

module.exports = router