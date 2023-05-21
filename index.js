const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 2000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// Middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hvq63b0.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const toyCollection = client.db('toysWorld').collection('toys');

    // indexing for searching toy based on toy name
    const indexKeys = {toy_name : 1}
    const indexOptions = {name : 'toyName'}
    const result = await toyCollection.createIndex(indexKeys,indexOptions)

    app.get('/toySearchByName/:text', async(req,res)=>{
      const searchText = req.params.text;
      const result = await toyCollection
      .find({toy_name: {$regex: searchText, $options: 'i'}})
      .toArray()
      res.send(result)
    })

    // add a new toy to the db
    app.post('/addToy', async(req,res)=>{
      const body = req.body;
      // console.log(body)
      const result = await toyCollection.insertOne(body);
      res.send(result)
    })

      // getting all toys from db
      app.get('/allToys', async(req,res)=>{
      
        const result = await toyCollection.find().toArray();
        res.send(result)
      })

          // geting single toy data
    app.get('/singleToy/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await toyCollection.findOne(query)
      res.send(result)
    })

    // getting toy accoirding to their subcategory
    app.get('/allToys/:subCategory', async(req,res)=>{
      const { subCategory } = req.params;

      
      

        if (subCategory === 'princes' || subCategory === 'donald-duck' || subCategory === 'frozen-dolls') {
          const result = await toyCollection
            .find({ sub_category: subCategory })
            .toArray();
          res.send(result);
        } else {
          const result = await toyCollection.find().toArray();
          res.send(result);
        }
    })

   

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('Life is Beautiful')
})

app.listen(port, ()=> console.log(`${port}`))