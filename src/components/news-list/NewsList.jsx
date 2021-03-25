import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NewsPage } from '../../pages/News';

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  let { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let json;

      const url = `https://vef2-2021-ruv-rss-json-proxy.herokuapp.com/${id}`;

      try {
        const result = await fetch(url);

        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();
      } catch (e) {
        setError('Gat ekki sótt gögn.');
        return;
      } finally {
        setLoading(false);
      }

      setData(json);

    }
    fetchData();
  }, [id]);

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  const title = data.title;
  let news = data.items|| [];
  
  return (
    <NewsPage
      title={title}
      news={news}
    />
  );
}