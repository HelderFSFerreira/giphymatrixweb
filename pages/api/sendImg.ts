import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    console.log("sendImg");
    
    res.status(200).json({ name: 'John Doe' })

  }