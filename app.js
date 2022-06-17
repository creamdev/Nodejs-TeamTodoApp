const express = require('express');
const fileUpload = require("express-fileupload");

const app = express();

//Import Routes
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todos');
const teamRoutes = require('./routes/team');

app.use(fileUpload());
app.use('/uploads',express.static('uploads'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/teams', teamRoutes);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})