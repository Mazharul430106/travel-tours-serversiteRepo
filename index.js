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

async function run() {
  try {

    const allTours = client.db('travelTours').collection('allTours');
    const destinationCollections = client.db('travelTours').collection('tourDestinations');
    const aboutCollections = client.db('travelTours').collection('tourAbouts');

    // type best data in database.
    app.get('/popularTours', async (req, res) => {
      const title = req.query.title;
      const query = { title: title };
      const popularTours = await allTours.find(query).toArray();
      res.send(popularTours);
    })

    
    // get destinations data in database. 
    app.get('/destinations', async (req, res) => {
      const query = {};
      const cursor = destinationCollections.find(query);
      const destinations = await cursor.toArray();
      res.send(destinations);
    })

    // get abouts data in database.

    app.get('/aboutUs', async (req, res) => {
      const query = {};
      const aboutInfo = await aboutCollections.find(query).toArray();
      res.send(aboutInfo);
    })


  } catch (error) {
    console.log(error)
  }
  finally {

  }
}

run().catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Travel-Tours-Website Running!')
})

app.listen(port, () => {
  console.log(`Travel-Tours-website Running on port ${port}`)
})