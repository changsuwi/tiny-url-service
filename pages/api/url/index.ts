import { idToKey, keyToID } from '@/lib/url-shortener';
import { URLModel } from '@/lib/url/url.model';
import { URLRepository } from '@/lib/url/url.repo';
import type { NextApiRequest, NextApiResponse } from 'next';

const allowedMethods = ['GET', 'POST'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<URLModel | { message: string }>
) {
  if (!allowedMethods.includes(req.method || '')) {
    return res.status(405).send({ message: 'Method not allowed.' });
  }

  const urlRepository = new URLRepository();

  if (req.method === 'POST') {
    // TODO: validate url
    const originalURL = req.body.url;
    if (!originalURL) {
      res.status(400).send({ message: 'invalid url' });
    }

    try {
      let urlModel = await urlRepository.postURL(originalURL);
      const key = idToKey(urlModel.id);
      urlModel = await urlRepository.updateURLKey(urlModel.id, key);

      res.status(200).json(urlModel);
    } catch (err) {
      console.error(
        `generate tiny url error, [url]=${originalURL} [error]=${err}`
      );
      res.status(500).send({ message: 'generate tiny url error' });
    }
  }

  if (req.method === 'GET') {
    try {
      const id = keyToID(req.query.key as string);
      if (id < 0 || id % 1 !== 0) {
        res.status(400).send({ message: 'invalid tiny url' });
      } else {
        const urlModel = await urlRepository.getURL(id);
        res.status(200).json(urlModel);
      }
    } catch (err) {
      console.error(
        `get original url error, [key] = ${req.query.key}, [err]=${err}`
      );
      res.status(500).send({ message: 'get original url error' });
    }
  }
}
