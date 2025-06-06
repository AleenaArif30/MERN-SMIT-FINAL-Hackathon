import express from "express";
import mongoose from "./db/index.mjs";
import userRoutes from "./routes/userRoutes.mjs"

import taskRoutes from './routes/taskRoutes.mjs';

import chalk from "chalk";
import cors from "cors";
import connectToDB from "./db/index.mjs";


const app = express();

connectToDB()


app.use(express.json());


app.use(
	cors({
		origin: ['http://localhost:5174',
			'http://localhost:5173',
			'https://ecommerce-six-wine-13.vercel.app',



			/\.vercel\.app$/,
			/\.up\.railway\.app$/

		],
		methods: ['GET', 'PUT', 'POST', 'DELETE'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);


// app.use(express.json());
const port = 5000;
app.use("/api/auth", userRoutes)
// Existing app.use setup ke neeche:
app.use('/api/tasks', taskRoutes);




app.use("/", (req, res, next) => {
	console.log("Request URL:", req.url, "method: ", req.method);
	next();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
