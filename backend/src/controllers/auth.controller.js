


//============== Controllers =================

//=== Signup/register ===
export async function signup(req, res) {
    res.send('Signup Route');
};


//=== Login ===
export async function login(req, res) {
    res.send('Login Route');
};


//=== Logout ===
export function logout() {
    res.send('Logout Route');
};