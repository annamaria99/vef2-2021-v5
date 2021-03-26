import React from 'react';
import { useParams } from 'react-router';
import { NewsList } from '../components/news-list/NewsList'

export function NewsPage() {
  let {id} = useParams();
  return (
    <div>
     <NewsList id={id}/>
    </div>
  );
}