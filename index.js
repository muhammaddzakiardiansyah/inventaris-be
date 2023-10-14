const express = require('express');
const app = express();
const port = 4000;

app.get('/api/v1', (req, res) => {
    return res.send({
        statusCode : 200,
        message : 'success',
        data : 'Hello world'
    });
});

app.listen(port, () => {
    console.log(`Application listen on port ${port}`);
});