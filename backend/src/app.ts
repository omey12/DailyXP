import express from "express";
import cors from "cors";
import sleepTrackerRoutes from "./routes/sleepTrackerRoutes";
import habitsRoutes from "./routes/habitsRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();


app.use(cors());
app.use(express.json());

app.use(sleepTrackerRoutes);
app.use(habitsRoutes);
app.use(authRoutes);


export default app;