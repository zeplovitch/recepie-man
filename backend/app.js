const express = require('express');
var multer = require('multer');
var upload = multer({ dest: DIR });



const bodyParser = require('body-parser');


const app = express();
console.log(__dirname);
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var DIR = "backend/images";

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dror:dz6430504@test-mongo-zo7y2.mongodb.net/receipes-man?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(() => {
    console.log('connection failed');
  })


const Asset = require('./models/asset')
const Recepie = require('./models/recepie')


app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,X-Requested-with")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  next();
});

// CORS

//app.use(urlencoded.json({ extended: true }));
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mine type');
    if (isValid) {
      error = null;
    }
    cb(error, DIR);
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});
app.post('/api/assets', (req, res, next) => {
  const asset = new Asset({
    name: req.body.name
  });
  asset.save();
  res.status(200).json({ message: 'message sent' });
});
app.get('/api/assets', (req, res, next) => {
  Asset.find().then(data => {
    res.status(200).json(data);
  })

});
app.get('/api/recepie/:id', (req, res, next) => {
  const id = req.params.id;
  Recepie.find({ _id: id }).then(data => {
    res.status(200).json(data);
  })
});
app.get('/api/recepieList', (req, res, next) => {
  Recepie.find().select({ _id: 2, title: 1 }).then(data => {
    res.status(200).json(data);
  })
});
function replaceImage(files, oldImage) {
  let x = oldImage;
  files.forEach(f => {
    if (f.originalname == oldImage) {
      x = f.filename;
    }
  });
  return x;
}

app.post('/api/recepie',
  multer({ storage: storage }).array("image"), (req, res, next) => {
    assets = [] = JSON.parse(req.body.equipment);
    steps = [] = JSON.parse(req.body.steps);
    title = req.body.title;
    console.log(req.body);
    for (let i = 0; i < steps.length; i++) {
      for (let j = 0; j < steps[i].images.length; j++) {
        for (let k = 0; k < req.files.length; k++)
          if (req.files[k].originalname === steps[i].images[j]) {
            steps[i].images[j] = req.files[k].filename;
          }
      }
    }

    const recepie = new Recepie({
      title: title,
      assets: assets,
      steps: steps
    });

    const post = req.body
    recepie.save().then((data) => {
      res.status(201).json({ message: 'message sent' });
    }).catch(error => {
      console.log(error);
    })

  })




module.exports = app;
