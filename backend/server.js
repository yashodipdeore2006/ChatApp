import express from "express";
import dotenv from "dotenv"
<<<<<<< HEAD
import path from "path";

//=== Local modules ===
import authRoutes from "./src/routes/auth.route.js";
import messagesRoutes from "./src/routes/messages.routes.js";
=======

//=== Local modules ===
import authRoutes from "./src/routes/auth.route.js";
import messagesRoutes from "./src/routes/messages.route.js";
>>>>>>> d7cfc2a5eba673db86f66cee7449c39140f4709b


//============= Middlewares =================
dotenv.config();
<<<<<<< HEAD
const __dirname = path.resolve();
=======
>>>>>>> d7cfc2a5eba673db86f66cee7449c39140f4709b
const app = express();


//============= Routes =======================

//==== Auth Routes ===
app.use('/api/auth', authRoutes);

//============= Routes =======================

<<<<<<< HEAD
//=== Messages Routes ===
app.use('/api/messages', messagesRoutes)


//Make ready for deployment
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
  })
}
=======
//==== Auth Routes ===
app.use('api/auth', authRoutes);


//=== Messages Routes ===
app.use('api/messages', messagesRoutes)



>>>>>>> d7cfc2a5eba673db86f66cee7449c39140f4709b

//=============================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server is running at : http://localhost:' + PORT);
});