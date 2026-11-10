import express from "express";
import { ENV } from "./src/lib/env.js";
import path from "path";

//=== Local modules ===
import authRoutes from "./src/routes/auth.route.js";
import messagesRoutes from "./src/routes/messages.routes.js";
import { ConnectDB } from "./src/lib/db.js";


//============= Middlewares =================

const __dirname = path.resolve();
const app = express();
app.use(express.json());//res.body

//============= Routes =======================

//==== Auth Routes ===
app.use('/api/auth', authRoutes);

//============= Routes =======================

//=== Messages Routes ===
app.use('/api/messages', messagesRoutes)


//Make ready for deployment
if (ENV.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
  })
}

//=============================================
const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
  console.log('🟢 server is running at : http://localhost:' + PORT);
  ConnectDB();
});