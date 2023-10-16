const { json, urlencoded } = require('body-parser');
const express = require('express');
const router = require('./src/routers');
const cors = require('cors');
const response = require('./helpers/response');
const app = express();
const port = 4000;

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// base url
app.use('/api/v1', router);

// url not found
app.use('/*', (req, res) => {
    return response.notFound(res)
})

// port listen
app.listen(port, () => {
    console.log(`Application listen on port ${port}`);
});