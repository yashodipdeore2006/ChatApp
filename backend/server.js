import express from 'express';



const app = express();

app.get('api/auth/signup', (req, res) => {
    res.send('Signup Route')
});



app.get('api/auth/login', (req, res) => {
    res.send('Login Route')
});



app.get('api/auth/logout', () => {
    res.send('Logout Route')
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log('server is running at : http://localhost:' + PORT);
});