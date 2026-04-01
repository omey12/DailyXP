import { Request, Response } from "express";
import habitsTrackingModel from "../models/habitsTrackingModel";

export const updateHabitStatus = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { habitId, date, status } = req.body;
    const updated = await habitsTrackingModel.findOneAndUpdate(
      { habitId, date, UserId: req.user._id },
      { status },
      { upsert: true, new: true },
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getHabitTracking = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { habitId } = req.params;
    const tracking = await habitsTrackingModel.find({ habitId, UserId: req.user._id });
    res.status(200).json(tracking);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getHabitTrackingByMonth = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { month, year } = req.query;

    const start = new Date(Number(year), Number(month), 1);
    const end = new Date(Number(year), Number(month) + 1, 0, 23, 59, 59);

    const data = await habitsTrackingModel.find({
      UserId: req.user._id,
      date: { $gte: start, $lte: end },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
