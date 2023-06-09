import Head from 'next/head';
import { ChangeEvent, useState, SyntheticEvent, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

enum Status {
  Default = 'default',
  Generating = 'generating',
  Generated = 'generated',
  Fail = 'fail',
}

export default function Home() {
  const [inputURL, setInputURL] = useState('');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState(Status.Default);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputURL(event.target.value);
  }

  async function handleUrlShorten(event: SyntheticEvent) {
    event.preventDefault();
    if (status === Status.Generating) {
      return;
    }
    setStatus(Status.Generating);
    try {
      const result = await axios.post(`/api/url`, {
        url: inputURL,
      });

      setResult(`${process.env.NEXT_PUBLIC_BASE_URL}/${result.data.key}`);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setResult(
          err.response?.data?.error?.message || 'Generate tiny url fail'
        );
      } else {
        setResult('Generate tiny url fail');
      }

      setStatus(Status.Fail);
    }
  }

  useEffect(() => {
    if (result.length > 0) {
      setStatus(Status.Generated);
    }
  }, [result]);

  function getResult() {
    return status === Status.Generated || status === Status.Fail
      ? result
      : status === Status.Generating
      ? 'Generating...'
      : 'Get your tiny url here';
  }

  return (
    <>
      <Head>
        <title>Tiny URL Generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center items-center w-screen h-screen bg-slate-300">
        <div className="flex flex-col bg-slate-50 rounded-2xl px-6 py-4 min-h-[250px]">
          <h1 className="text-2xl text-gray-600 ">Tiny URL Generator</h1>
          <div className="mt-2 flex flex-col flex-grow justify-center">
            <form onSubmit={handleUrlShorten}>
              <input
                className="md:w-96 px-4 py-2 mr-4 border-2 border-neutral-500 rounded-2xl outline-none"
                type="text"
                value={inputURL}
                placeholder={'Your URL'}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="font-semibold bg-amber-300 text-gray-600 rounded-md px-4 py-2 disabled:bg-amber-200"
                disabled={inputURL.length === 0}
              >
                Generate
              </button>
            </form>
            <div
              className="mt-8 font-semibold text-lg bg-slate-300 text-gray-600 w-full px-4 py-2 text-center rounded-2xl"
              data-testid="result"
            >
              {getResult()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
