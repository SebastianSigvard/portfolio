import {handleLoginRequest, handleRegisterRequest} from './src/login-register.js';
import contactMe from './src/contact-me.js';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path';
const app = express(); // create express app

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use(bodyParser.json());

// Contact me
app.post('/contact-message', async (request, response) => {
  const res = await contactMe(request.body);

  if(res.status === 'error') return response.status(400).json(res);
  response.status(200).json(res);
});

// Cal Count Api
app.post('/login', async (request, response) => {
  const res = await handleLoginRequest(request.body);

  if(res.status === 'error') return response.status(400).json(res);
  response.status(200).json(res);
});

app.post('/register', async (request, response) => {
  const res = handleRegisterRequest(request.body);

  if(res.status === 'error') return response.status(400).json(res);
  response.status(200).json(res);
});

// React front end
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port http://localhost:5000/");
});