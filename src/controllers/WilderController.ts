import { Request, Response } from "express";
import WilderModel from "../models/WilderModel";

export = {
  create: async (req: Request, res: Response): Promise<void> => {
    await WilderModel.init();
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.json({ success: true, result });
  },
  read: async (req: Request, res: Response): Promise<void> => {
    const result = await WilderModel.find();
    res.json({ success: true, result });
  },
  update: async (req: Request, res: Response): Promise<void> => {
    const result = await WilderModel.updateOne({ _id: req.body._id }, req.body);
    res.json(result);
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    const result = await WilderModel.deleteMany({ _id: req.params });
    res.json({ success: true, result });
  },
};
