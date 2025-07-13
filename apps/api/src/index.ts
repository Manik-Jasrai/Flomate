import express, { json } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

import verifyJwt from "./middleware/verifyJwt";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { flowRouter } from "./routes/flow";
import { triggerRouter } from "./routes/trigger";
import { actionRouter } from "./routes/action";
import logger from "./middleware/logger";
import { seedDB } from "./db/seed";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // or your frontend domain
    credentials: true
}));
app.use(logger)

// Auth Routes
app.use('/api/v1/auth', authRouter);

app.use('/api/v1/user',    verifyJwt,  userRouter);
app.use('/api/v1/flow',    verifyJwt,  flowRouter);
app.use('/api/v1/trigger', verifyJwt,  triggerRouter);
app.use('/api/v1/action',  verifyJwt,  actionRouter);




seedDB();

app.listen(4000, () => {
    console.log("API has started");
})

