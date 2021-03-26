import React, { useEffect, useState } from 'react';
import { NewsList } from '../news-list/NewsList';
import s from './News.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function News() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let json;

      const url = apiUrl;

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
  }, []);

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

  let news = [];
  var i;
  for(i=0; i<data.length; i++) {
    news[i] = {id: data[i].id, title: data[i].title, url: data[i].url};
  }
  return (
    <div className={s.news}>
      { news.map((n, i) => {
      return(
        <div  key={i} className={s.newsContent}>
          <NewsList title={n.id} id={n.id} allNews={false}/>
        </div>
        );
      })}

    </div>
    );
}