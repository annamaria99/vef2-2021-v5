import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink} from 'react-router-dom';
import { NewsList } from '../news-list/NewsList';

const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object)
}

export function News() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let json;

      const url = `https://vef2-2021-ruv-rss-json-proxy.herokuapp.com/`;

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
    <div>
      { news.map((n, i) => {
      return(
        <div>
        <NewsList key={i} title={n.id} id={n.id}/>
        <NavLink to={`/${n.id}`}>Allar fréttir</NavLink>
        </div>
      );
      })}

    </div>

  );
}