
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
// app.use(cors());
const corsOptions ={
    // origin:'https://memories-deepaksen.netlify.app', 
    // credentials:true,            //access-control-allow-credentials:true
    // optionSuccessStatus:200
    target: 'https://memories-deepaksen.netlify.app', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}
app.use(cors(corsOptions));
app.use('/posts', postRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = 'mongodb+srv://Deepakkumarsen:Deepak@cluster0.fwpjomr.mongodb.net/memorie?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 9000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);