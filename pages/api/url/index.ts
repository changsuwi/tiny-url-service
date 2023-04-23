import { idToKey, keyToID } from '@/lib/url-shortener';
import { URLModel } from '@/lib/url/url.model';
import { URLRepository } from '@/lib/url/url.repo';
import type { NextApiHandler, NextApiResponse } from 'next';
import { apiHandler } from '@/lib/utils/api';
import createHttpError from 'http-errors';
import * as Yup from 'yup';

const urlRepository = new URLRepository();

const createTinyURL: NextApiHandler = async (
  req,
  res: NextApiResponse<URLModel>
) => {
  const schema = Yup.object().shape({
    url: Yup.string()
      .url()
      .required('URL is required')
      .test(
        'Invalid domain name',
        'Domain name should not be same as our service domain',
        (value) => {
          return !value.startsWith(
            process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
          );
        }
      ),
  });
  const { url } = schema.validateSync(req.body);
  let urlModel = await urlRepository.postURL(url);
  const key = idToKey(urlModel.id);
  urlModel = await urlRepository.updateURLKey(urlModel.id, key);

  res.status(200).json(urlModel);
};

const getOriginalURLByKey: NextApiHandler = async (
  req,
  res: NextApiResponse<URLModel>
) => {
  const schema = Yup.object().shape({
    key: Yup.string().required('Key is required'),
  });
  const { key } = schema.validateSync(req.query);
  const id = keyToID(key);
  if (id < 0 || id % 1 !== 0) {
    throw new createHttpError.BadRequest('invalid tiny url');
  } else {
    const urlModel = await urlRepository.getURL(id);
    res.redirect(urlModel.originalURL);
  }
};

export default apiHandler({
  GET: getOriginalURLByKey,
  POST: createTinyURL,
});
