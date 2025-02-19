import type { NextApiRequest, NextApiResponse } from 'next';
import Together from 'together-ai';

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,  
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  try {
    const response = await together.chat.completions.create({
      model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',  
      messages: [{ role: 'user', content: message }],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const botMessage = response.choices[0]?.message?.content || 'Sorry, I couldn\'t process that.';
    res.status(200).json({ botMessage });
  } catch (error: any) {
    console.error('Together.ai API Error:', error);
    res.status(500).json({ error: error.message });
  }
}
