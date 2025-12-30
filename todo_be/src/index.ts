import app from './app'
import dotenv from 'dotenv'

dotenv.config()

app.get("/", (req, res) => {
  res.send("API OK");
});


app.listen(process.env.PORT,() => {
    console.log(`server is running on port no:${process.env.PORT}`)
})




