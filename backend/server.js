import express from "express";
import dotenv from "dotenv"

//=== Local modules ===
import authRoutes from "./src/routes/auth.route.js";
import messagesRoutes from "./src/routes/messages.route.js";


//============= Middlewares =================
dotenv.config();
const app = express();



//============= Routes =======================

//==== Auth Routes ===
app.use('api/auth', authRoutes);


//=== Messages Routes ===
app.use('api/messages', messagesRoutes)




//=============================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server is running at : http://localhost:' + PORT);
});