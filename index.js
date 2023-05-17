const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 2000;
// const { MongoClient, ServerApiVersion } = require('mongodb');


// Middleware
app.use(cors())
app.use(express.json())


// const uri = "mongodb+srv://<username>:<password>@cluster0.hvq63b0.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();





//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('Life is Beautiful')
})

app.listen(port, ()=> console.log(`${port}`))