import PlannedSchema from "../models/PlannedSchema.js";
import Planned from "../models/PlannedSchema.js";

export async function createReminder(req, res){
    const data = req.validated.body;
    try{
        const newReminder = await PlannedSchema.create({...data, userId: req.user.id});
        return res.status(201).json({message:"Reminder created", item:newReminder});
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message});
    }
}

export async function getReminders(req, res){
    try{
        const reminders = await PlannedSchema.find({userId:req.user.id});
        return res.status(200).json(reminders);
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message});
    }
}

export async function getReminderById(req, res){
    const {id} = req.validated.params;
    try{
        const reminders = await PlannedSchema.findOne({_id:id, userId:req.user.id});
        if (!reminders) return res.status(404).json({ error: "not found" });
        return res.json(reminders);
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message});
    }
}

export async function deleteReminder(req, res){
    const {id} = req.validated.params;
    try{
    const reminder = await PlannedSchema.findOneAndDelete({_id:id, userId:req.user.id});
    if (!reminder) return res.status(404).json({ error: "not found" });
    return res.json({ message: "Reminder deleted" });
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message});
    }
}

export async function updateReminder(req, res){
    const {id} = req.validated.params;
    const data = req.validated.body;
    try{
        const reminder = await PlannedSchema.findOneAndUpdate({_id:id, userId:req.user.id}, data, {new:true});
        if (!reminder) return res.status(404).json({ error: "not found" });
        return res.json({ message: "Reminder updated", reminder });
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message});
    }
}