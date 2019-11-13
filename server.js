const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();



app.get('/api', (req, res) => {
    res.json({
        message: `welcome to the API`
    });
});


app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: `post created......`,
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    };


    jwt.sign({ user: user }, 'secretKey', { expiresIn: '10min'}, (err, token) => {
        res.json({
            token,
        });
    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token> //!this is how the token will look like

//!NOTE
/*
 * Token should be saved in the local storage of the client not in the cookies <`*_*`> 
 */


// Verify Token
function verifyToken(req, res, next){
    //Get the auth header value
    const bearerHeader = req.headers['authorization']; // get the authorization header
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        console.log(typeof bearerHeader);

        // ? Split the token at the space
        const bearer = bearerHeader.split(' '); // * split bearer and <access_token> to get only the access token
        console.log(bearer[1]); //token

        //Get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken; //! pass the token to the req object
        //Next Middleware
        next();
        
    } else {
        // Forbiden
        res.sendStatus(403);
    }

}

const start = () => {
    app.listen(5000, () => {
        console.log('App listening on port 3000!');
    });
}

start();