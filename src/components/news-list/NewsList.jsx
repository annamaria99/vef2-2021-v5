import React, { useEffect, useState } from 'react';
import { NotFound } from '../../pages/NotFound';
import { NavLink, Route} from 'react-router-dom';
import s from './NewsList.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList({id,allNews}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      setStatus(null);

      let json;

      const url = apiUrl + `${id}`;

      try {
        const result = await fetch(url);

        if (result.status === 404) {
          setStatus(404);
        }

        if (!result.ok) {
          throw new Error('result not ok');
        }

        console.log(result.status);
 

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

  if(status) {
    return (
      <Route component={NotFound} />
    )
  }

  const title = data.title;
  let news = data.items|| [];

  let amount = news.length;
  if (allNews === false ) {
    amount = 5;
  }
  else {
    amount = news.length;
  }

  return (
    <div className={s.allNewsList}>
    <h1>{title}</h1>
    <ul>
      {news.length === 0 && (
         <li>Engar fréttir</li>
          )}
    </ul>
    { news.slice(0,amount).map((n, i) => {
      return(
        <div className={s.singleNews}>
          <a href={n.link} key={i} > {n.title} </a>
        </div>
      );
      })}
      {(() => {
        if (amount === news.length) {
          return(
            <div className={s.backLink}>
            <NavLink to='/'>Til baka</NavLink>
            </div>
            );
          }
        })()}
    </div>
  );
}