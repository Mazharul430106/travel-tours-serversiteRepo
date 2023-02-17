const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());

// dbUser => travelTours
// dbPass => G4Tz3odgo3wGNgnh


const uri = "mongodb+srv://travelTours:G4Tz3odgo3wGNgnh@cluster0.qm6ghoc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{

    const destinationCollections = client.db('travelTours').collection('tourDestinations');
    
    // get data in database 
    app.get('/destinations', async (req, res)=>{
      const query = {};
      const cursor = destinationCollections.find(query);
      const destinations = await cursor.toArray();
      res.send(destinations);
    })


  }catch(error){
    console.log(error)
  }
  finally{

  }
}

run().catch(err=> console.log(err))


app.get('/', (req, res) => {
  res.send('Travel-Tours-Website Running!')
})

app.listen(port, () => {
  console.log(`Travel-Tours-website Running on port ${port}`)
})