const express = require('express')
const app = express()

const cors = require('cors')


const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://tourist-guide:WFzLAix3V5pYc4NB@cluster0.e9gq9mr.mongodb.net/?retryWrites=true&w=majority`;

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
    const packageCollection = await client.db('tourist-guide').collection('package')
    const StoryCollection = await client.db('tourist-guide').collection('story')

    // story part
    app.get('/story', async(req,res)=>{
      const result = await StoryCollection.find().toArray()
      res.send(result)
    })

    app.get('/story/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await StoryCollectionCollection.findOne(query)
      res.send(result)
    })



    app.get('/package', async(req,res)=>{
      const result = await packageCollection.find().toArray()
      res.send(result)
    })

    app.get('/package/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await packageCollection.findOne(query)
      res.send(result)
    })
    // app.get('/package/:name', async(req,res)=>{
    //   const name = req.params?.details?.tour_guide?.name;
    //   const query = {name: new String(name)}
    //   const result = await packageCollection.findOne(query)
    //   res.send(result)
    // })
    await client.connect();
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
    res.send(`My port is running on ${port} is it clear`)
})
app.listen(port, ()=>{
    console.log(`My bla is running on ${port}`)
})