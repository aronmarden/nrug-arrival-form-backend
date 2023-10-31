const express = require('express');
const axios = require('axios');
const fs = require('fs');
const serverlessHttp = require('serverless-http');

const app = express();
app.use(express.json());

// Middleware to add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allows any domain. Adjust for production.
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST');
        return res.status(200).json({});
    }
    next();
});

app.post('/api', async (req, res) => {
    const { firstName } = req.body;
    const data = fs.readFileSync('./keys.json', 'utf8');
    const { key: apiKey, entityGuid: entityGuid } = JSON.parse(data);


    try {
        const response = await axios.post('https://api.newrelic.com/graphql', {
            query: `
            mutation {
                changeTrackingCreateDeployment(
                    deployment: {
                        version: "1.0 of themselves in a seat near you."
                        user: "${firstName} has arrived at the NRUG event. They have"
                        entityGuid: "${entityGuid}"
                        description: "This marker has been used to document the arrival time of ${firstName} to the NRUG November Event"
                        deepLink: "https://docs.newrelic.com/docs/change-tracking/change-tracking-introduction/"
                    }
                ) {
                    deploymentId
                    entityGuid
                }
            }
            `,
            variables: ""
        }, {
            headers: {
                'Content-Type': 'application/json',
                'API-Key': apiKey
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error in API call:', error.response.data);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports.handler = serverlessHttp(app);
