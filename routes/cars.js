const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')
const Cars = require('../models/Cars')

// Get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Cars.find();
        res.json({
            status: 'ok',
            message: `Bazada umumiy ${cars.length} ta ${cars.length > 1 ? 'mashinalar' : 'mashina'} mavjud`,
            cars
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
});

// Get car by ID
router.get('/:id', async (req, res) => {
    try {
        const car = await Cars.findById(req.params.id);
        if (car) {
            res.json({
                status: 'ok',
                message: `Siz so'ragan ${req.params.id} id raqamga ega mashina mavjud`,
                car
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'not found',
            message: `Kechirasiz, siz so'ragan ${req.params.id} idga ega mashina topilmadi`,
            car: []
        });
    }
});

// Create a new car
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.year) {
            throw new Error("Iltimos barcha parametrlarni kiriting")
        }
        const car = new Cars(req.body);
        await car.save();
        res.status(200).json({
            status: 'ok',
            message: "Mashina muvaffaqiyatli qo'shildi",
            car
        });
    } catch (err) {
        res.status(400).json({
            status: 'bad request',
            message: err.message
        });
    }
});

// Update an existing car
router.put('/:id', async (req, res) => {
    try {
        const car = await Cars.findById(req.params.id);
        if (car) {
            Object.assign(car, req.body);
            await car.save();
            res.json({
                status: 'ok',
                message: `Yaxshi, ${req.params.id} idga ega mashina ma'lumotlari yangilandi`,
                car
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'not found',
            message: `Kechirasiz, siz so'ragan ${req.params.id} idga ega mashina topilmadi`
        });
    }
});

// Delete a car
router.delete('/:id', async (req, res) => {
    try {
        const car = await Cars.findByIdAndDelete(req.params.id);
        if (car) {
            res.json({
                status: 'ok',
                message: `Yaxshi, ${req.params.id} idga ega mashina muvaffaqiyatli o'chirib yuborildi`
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'not found',
            message: `Kechirasiz, siz so'ragan ${req.params.id} idga ega mashina topilmadi`
        });
    }
});

// // Barcha mashinalarni olish
// router.get('/', async (req, res) => {
//     const cars = await Cars.find()
//     const resp = {
//         status: 'ok',
//         message: `Bazada umumiy ${cars.length} ta ${cars.length > 1 ? 'mashinalar' : 'mashina'} mavjud`,
//         cars,
//     }
//     res.json(resp)
// })
// // mashinani id raqami orqali olish
// router.get('/:id', async (req, res) => {
//     const id = req.params.id.split('').length === 24 ? req.params.id : null
//     const car = await Cars.findById(id)
//     const resp = (status, message) => ({ status, message, car: car ? [car] : [] })
    
//     if (car) {
//         res.status(200).json(resp('ok', `Siz so'ragan ${id} id raqamga ega mashina mavjud`))
//     } else {
//         res.status(404).json(resp('not found', `Kechirasiz, siz so'ragan ${req.params.id} idga ega mashina topilmadi`))
//     }
// })
// // Yangi mashina qo'shish
// router.post('/', async (req, res) => {
//     const body = req.body
//     const resp = (status, message, car) => ({status, message, car})

//     if (!body.title || !body.year) {
//         res.status(400).json(resp('baq request', "Iltimos barcha parametrlarni kiriting", []))
//     } else {
//         const car = await Cars.create(body)
//         res.status(200).json(resp('ok', "Mashina muvaffaqiyatli qo'shildi", car))
//     }
// })
// // Mavjud mashinani yangilash
// router.put('/:id', async (req, res) => {
//     const id = req.params.id.split('').length === 24 ? req.params.id : null
//     const car = await Cars.findById(id)
//     // const updCar = { $set: { ...req.body }}
//     const resp = (status, message) => ({ status, message, car: car ? [car] : [] })

//     if (car) {
//         const updCar = await Cars.updateOne(car, { $set: { ...req.body } })
//         res.status(200).json(resp('ok', `Yaxshi, ${id} idga ega mashina ma'lumotlari yangilandi`, [updCar]))
//     } else {
//         res.status(404).json(resp('not found', `Kechirasiz, siz so'ragan ${req.params.id} idga ega mashina topilmadi`))
//     }
// })
// // Mavjud mashinani o'chirish
// router.delete('/:id', async (req, res) => {
//     const id = req.params.id.split('').length === 24 ? req.params.id : null
//     const car = await Cars.findById(id)
//     const resp = (status, message) => ({ status, message, car: car ? [car] : [] })

//     if (car) {
//         const delCar = await Cars.findByIdAndDelete(id)
//         res.status(200).json(resp('ok', `Yaxshi, ${id} idga ega mashina muvaffaqiyatli o'chirib yuborildi`))
//     } else {
//         res.status(404).json(resp('not found', `Kechirasiz, siz so'ragan ${req.params.id} idga ega mashina topilmadi`))
//     }
// })

module.exports = router