import React from 'react';
import { NavLink} from 'react-router-dom';
import { useParams } from 'react-router';
import { NewsList } from '../components/news-list/NewsList'

export function NewsPage() {
  let {id} = useParams();
  return (
    <div>
     <NewsList id={id}/>
     <NavLink to='/'>Tilbaka</NavLink>
    </div>
  );
}