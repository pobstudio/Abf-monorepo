import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>F**k Off</h1><p>🧠💀</p>');
}
