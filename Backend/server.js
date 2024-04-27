const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const {xss} = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Load env vars
dotenv.config({path:'./config/config.env'});

// Connect to database
connectDB();

// Route files
const hotels = require('./routes/hotels');
const auth = require('./routes/auth');
const bookings = require('./routes/bookings');
const rooms=require('./routes/rooms');
const notifications=require('./routes/notifications');
const { version } = require('mongoose');

const app = express();
// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

//Set Security headers
app.use(helmet());

// XSS Protection
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

app.use(limiter);

// Prevent hpp param pollutions
app.use(hpp());

// Enable CORS
app.use(cors());

// route files
app.use('/api/v1/hotels' , hotels);
app.use('/api/v1/auth', auth);
app.use('/api/v1/bookings',bookings);
app.use('/api/v1/rooms',rooms);
app.use('/api/v1/notifications',notifications);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Acocoa Booking API',
            version: '1.0.0',
            description: "this is API for Acocoa Booking System, This is use for [Acocoa Project](https://github.com/2110503TACEDT66/cedt-se-project-hua)",
        },
        servers: [
            { url: `${process.env.HOST}:${process.env.PORT}/api/v1` }
        ]
    },
    apis: ['./APIdocs/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('Server running in', process.env.NODE_ENV,'on ' + process.env.HOST + ':' + PORT));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => {
        process.exit(1);
    });
});