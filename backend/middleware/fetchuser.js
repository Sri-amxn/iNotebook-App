var jwt = require('jsonwebtoken');
const JWT_SECRET = 'amanisagoodboy';


const fetchuser =(req, res, next )=>{
    

    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    console.log('Received token:', token);
    if(!token){
        console.log('Token not found in headers');
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log('Decoded token data:', data);
        req.user = data.user;
        next();
    } catch (error) {
        console.log('Token verification failed:', error);
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
  

}


module.exports = fetchuser;