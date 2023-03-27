import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { URLModel } from '@/lib/url/url.model';

enum Status {
  redirecting = 'redirecting',
  fail = 'fail',
}

export default function Key() {
  const router = useRouter();
  const { key } = router.query;
  const [status, setStatus] = useState(Status.redirecting);

  useEffect(() => {
    if (typeof key === 'string' && key.length > 0) {
      redirectToOriginalURL();
    }
  }, [key]);

  async function getOriginalURL() {
    try {
      const res = await axios.get<URLModel>('/api/url', {
        params: {
          key,
        },
      });
      return res.data.originalURL;
    } catch (err) {
      setStatus(Status.fail);
    }
  }

  async function redirectToOriginalURL() {
    const originalURL = await getOriginalURL();
    if (originalURL) {
      router.push(originalURL);
    }
  }

  return <div>{status === Status.redirecting ? 'Redirect...' : 'Fail'}</div>;
}
