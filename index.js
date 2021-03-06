const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const categoryRoute = require('./routes/category')
const usersRoute = require('./routes/user')
const postRoute = require('./routes/post')
const multer = require('multer');
const path = require('path')
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
const timeout = require('connect-timeout')


dotenv.config();
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGODB_URI,{useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => console.log('mongoDB is connected successfully'))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
app.use(cors());
app.use("/api/category", categoryRoute);
app.use("/api/user", usersRoute);
app.use("/api/post", postRoute);

if(process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname,"blog/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog/build', 'index.html'))
})}

app.listen(process.env.PORT || 5000, () => {
    console.log('backend is running')
})