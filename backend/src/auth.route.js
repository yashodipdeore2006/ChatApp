import express from "express";


//====================================================
const route = express.Route();


//====================================================
route.get('/signup', (req, res) => {
    res.send('Signup Route')
});


route.get('/login', (req, res) => {
    res.send('Login Route')
});


route.get('/logout', () => {
    res.send('Logout Route')
});

//====================================================
export default route;