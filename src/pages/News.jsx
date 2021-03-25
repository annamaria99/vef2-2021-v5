import React from 'react';
import PropTypes from 'prop-types';

NewsPage.propTypes = {
  title: PropTypes.string,
  news: PropTypes.arrayOf(PropTypes.object)
}

export function NewsPage({title, news}) {
  return (
  <section>
  <h1>{title}</h1>
  <ul>
    {news.length === 0 && (
       <li>Engar fréttir</li>
        )}
  </ul>
  { news.map((n, i) => {
    return(
      <div>
        <a href={n.link} key={i} > {n.title} </a>
      </div>
    );
    })}
  
  </section>
  );
}