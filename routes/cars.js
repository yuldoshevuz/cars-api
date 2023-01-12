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

module.exports = router
