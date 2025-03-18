import express from 'express';
import {setupDatabase} from "./database";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:8080',  // Remplacer par l'URL de ton frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'],  // En-têtes autorisés
}));

app.use(express.json());

app.listen(port, () => {
    console.log(`API listening on http://surrealdb:${port}`);
});

setupDatabase().then(db => {
    app.get('/', (req, res) => {
        res.send('API Site Vitrine GreenIT -- V0.1');
    });

    app.get('/articles', async (req, res) => {
        try {
            const page = Number(req.query.page) || 0;
            const limit = Number(req.query.limit) || 6;
            const offset = page * limit;

            const articles = await db.query(`SELECT * FROM articles LIMIT $limit START $offset`, {
                limit,
                offset
            });
            res.status(200).json(articles[0]);
        } catch (err) {
            res.status(500);
        }
    })

    app.post('/articles', async (req, res) => {
        try {
            const {name, content, image_id} = req.body;
            if (!name || !content || !image_id) {
                res.status(400);
            }

            const article = {name, content, image_id};
            await db.create("articles", article);
            res.status(200);

        } catch (err) {
            res.status(500);
        }
    })
}).catch(err => {
    app.get('/', (req, res) => {
        res.send(err.message);
    });
})