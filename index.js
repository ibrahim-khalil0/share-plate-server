const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000


// middleware is here
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bqms9ir.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// all crud operation is here 


// database collection 
const foodsCollection = client.db('foodsDB').collection('totalFoods')


// add food 
app.post('/foods', async(req, res) => {
    const newFood = req.body
    const result = await foodsCollection.insertOne(newFood)
    res.send(result)
})



// get all food api
app.get('/foods', async(req, res) => {
    const result = await foodsCollection.find().toArray()
    res.send(result)
})








app.get('/', (req, res) => {
    res.send('share plate server is running')
})

app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})