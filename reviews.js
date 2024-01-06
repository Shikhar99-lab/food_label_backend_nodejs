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

const Review = mongoose.model('Review', {
    userId: String,
    labelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Label' },
    comment: String,
});

// Review submission endpoint
app.post('/labels/:labelId/reviews', (req, res) => {
    const { comment } = req.body;
    const labelId = req.params.labelId;
    
    const newReview = new Review({ userId: 'user_id_placeholder', labelId, comment });
    newReview.save()
        .then(() => res.json({ message: 'Review submitted successfully.' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
