import { NextApiRequest, NextApiResponse } from 'next';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req, res);

  res.status(200).json({ statusCode: 200, message: 'cool' });
  return;
};

export default handle;
