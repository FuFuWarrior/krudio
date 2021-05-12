import express from 'express';
import articleRoutes from './routes/articleRoute.js'
const app = express();

app.use(express.json());

// Only parse query parameters into strings, not objects
// https://masteringjs.io/tutorials/express/query-parameters
app.set('query parser', 'simple');

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the app'
    });
});

app.use('/api/v1/', articleRoutes)

export default app;