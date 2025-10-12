import { Request, Response } from 'express';
import { getHealthAnalysis } from '../services/geminiService';

export const checkSymptoms = async (req: Request, res: Response) => {
    const { symptoms } = req.body;

    if (!symptoms || typeof symptoms !== 'string') {
        return res.status(400).json({ error: 'Symptoms must be a non-empty string.' });
    }

    try {
        const result = await getHealthAnalysis(symptoms);
        res.json({ result });
    } catch (error) {
        console.error('Error in checkSymptoms controller:', error);
        res.status(500).json({ error: 'Failed to get analysis from the AI model.' });
    }
};