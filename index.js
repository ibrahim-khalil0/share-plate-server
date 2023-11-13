const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
const requestCollection = client.db('foodDB').collection('requestedFood')



// add food 
app.post('/foods', async(req, res) => {
    const newFood = req.body
    const result = await foodsCollection.insertOne(newFood)
    res.send(result)
})



// get all food and single user posted food api
app.get('/foods', async(req, res) => {

    let query = {}
    if(req.query?.email){
      query = {donatorEmail: req.query.email}
    }

    const result = await foodsCollection.find(query).toArray()
    res.send(result)
})



// get single food 
app.get('/food/:id', async(req, res) => {
  const id = req.params.id
  const query = {_id : new ObjectId(id)}
  const food = await foodsCollection.findOne(query)
  res.send(food)
})





// requested food collection api here 

// post requested food 
app.post('/request', async(req, res) => {
  const newFood = req.body
  const result = await requestCollection.insertOne(newFood)
  res.send(result)
})



// get my all requested foods
app.get('/requestedFoods', async(req, res) => {

  let query = {requesterEmail: req.query.email}

  const result = await requestCollection.find(query).toArray()
  res.send(result)
})



// managed single food request 
app.get('/manageRequest', async(req, res) => {
  const query = {requestId : req.query.food}
  const result = await requestCollection.find(query).toArray()
  res.send(result)

})





app.get('/', (req, res) => {
    res.send('share plate server is running')
})

app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})