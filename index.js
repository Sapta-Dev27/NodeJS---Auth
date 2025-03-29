const express = require("express");
require('dotenv').config()
const connecToDb = require('./database/db')
const authRoutes = require('./routes/routes')
const homeRoute = require('./routes/home')
const adminRoute = require('./routes/admin')
const subadminRoute = require('./routes/subadmin')

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

connecToDb();
app.use('/auth' , authRoutes);
app.use('/auth/home' , homeRoute)
app.use('/auth/admin' , adminRoute)
app.use('/auth/subadmin' , subadminRoute)

app.listen(port , () => {
  console.log(`Server is running on ${port}`)
})
