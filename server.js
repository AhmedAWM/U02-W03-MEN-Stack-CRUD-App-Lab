// Constants
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

// Initializations
dotenv.config();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Models
const Car = require('./models/cars');

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(() => {
        console.log('Error connecting to MongoDB')
    });

// Routes
app.get('/', (request, response) => {
    response.render('home.ejs');
});

app.get('/cars', async (request, response) => {
    const allCars = await Car.find();

    response.render('cars.ejs', { allCars : allCars });
});

app.get('/cars/new', (request, response) => {
    response.render('new.ejs');
});

app.post('/cars', async (request, response) => {
    await Car.create(request.body);

    response.redirect('/cars');
});

app.get('/car/:id', async (request, response) => {
    const car = await Car.findById(request.params.id);

    response.render('car.ejs', { car : car });
});

app.get('/car/:id/edit', async (request, response) => {
    const car = await Car.findById(request.params.id);

    response.render('edit.ejs', { car : car });
});

app.put('/car/:id', async (request, response) => {
    const id = request.params.id;
    const car = request.body;

    await Car.findByIdAndUpdate(id, car);

    response.redirect(`/car/${id}`);
});

app.delete('/car/:id/delete', async (request, response) => {
    const id = request.params.id;

    await Car.findByIdAndDelete(id);

    response.redirect(`/cars/`);
});

// Port
app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
