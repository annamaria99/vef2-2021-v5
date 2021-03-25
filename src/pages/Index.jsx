import React from 'react';
import PropTypes from 'prop-types';
import { NewsPage } from '../pages/News'

export function Index({ title, news}) {
  // TODO útfæra yfirlitssíðu
  return (
    <section>
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
