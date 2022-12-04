const express = require('express');
const app = express();
const PORT =process.env.PORT || 8000;
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGOURI } = require('./config/keys');

require('./models/user');
require('./models/post');

app.use(cors())
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

mongoose.connect(MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo');
});
mongoose.connection.on('error', (err) => {
    console.log('Connection error', err);
});

app.listen(PORT, () => {
    console.log(`App running at port ${PORT}`);

});
