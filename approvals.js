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

const Approval = mongoose.model('Approval', {
    userId: String,
    labelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Label' },
    approved: Boolean,
});

const Timestamped = mongoose.model('Timestamped', {
    labelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Label' },
    eventType: String,
    timestamp: { type: Date, default: Date.now },
});

// Approval submission endpoint
app.post('/labels/:labelId/approval', (req, res) => {
    const { approved } = req.body;
    const labelId = req.params.labelId;
    
    const newApproval = new Approval({ userId: 'user_id_placeholder', labelId, approved });
    newApproval.save()
        .then(() => {
            // Update timestamped chronology
            const timestampedEvent = new Timestamped({ labelId, eventType: 'approval' });
            timestampedEvent.save();
            res.json({ message: 'Approval submitted successfully.' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
