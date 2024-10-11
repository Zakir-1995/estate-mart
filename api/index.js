import express from "express"
import dotenv from 'dotenv'
dotenv.config()
const app = express()


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})