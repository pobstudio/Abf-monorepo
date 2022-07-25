import { VercelRequest, VercelResponse } from '@vercel/node';
import { getArtScreenshot } from '../../server/screenshots';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { output, renderer } = req.query;
    if (!renderer || typeof renderer !== 'string') {
      res
        .status(422)
        .json({ statusCode: 422, message: 'renderer is not a valid value' });
      return;
    }
    if (!output || typeof output !== 'string') {
      res
        .status(422)
        .json({ statusCode: 422, message: 'output is not a valid value' });
      return;
    }

    let file: Buffer = Buffer.alloc(0);
    file = await getArtScreenshot(output, renderer);
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/jpeg`);
    res.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
    );
    res.end(file);
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
  }
}
