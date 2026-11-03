import express from "express";
import dotenv from "dotenv"
import path from "path";

//=== Local modules ===
import authRoutes from "./src/routes/auth.route.js";
import messagesRoutes from "./src/routes/messages.routes.js";


//============= Middlewares =================
dotenv.config();
const __dirname = path.resolve();
const app = express();


//============= Routes =======================

//==== Auth Routes ===
app.use('/api/auth', authRoutes);


//=== Messages Routes ===
app.use('/api/messages', messagesRoutes)


//Make ready for deployment
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
  })
}

//=============================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server is running at : http://localhost:' + PORT);
});