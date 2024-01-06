const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });
const Label = mongoose.model('Label', {
    productName: String,
    ingredients: String,
    nutritionalInfo: String,
    // Add other fields as needed
});

// Label creation endpoint
app.post('/labels', (req, res) => {
    const { productName, ingredients, nutritionalInfo } = req.body;
    
    const newLabel = new Label({ productName, ingredients, nutritionalInfo });
    newLabel.save()
        .then(() => res.json({ message: 'Label created successfully.' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
