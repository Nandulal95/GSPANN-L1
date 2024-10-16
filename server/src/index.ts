import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import apiRoutes from './routes/api';
import sequelize from './models/index';
import logger from './utils/logger';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//migrate database
sequelize.sync().then(() => console.log('Database & tables created!'));

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(apiRoutes);

app.get('/', (req: Request, res: Response) => {
    logger.info('something')
    res.json({ message: "home page returned" })
});

app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: "Page not found." })
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message)
    res.status(500).json({ status: false, message: "Something went wrong.Please contact us!" });
});

app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
})