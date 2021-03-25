import { Route, Switch, Link } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { News } from './components/news/News';
import { NotFound } from './pages/NotFound';
import { NewsList } from './components/news-list/NewsList'

export default function App() {
  return (
    <Layout title="RÚV fréttir">
      <Switch>
        <Route exact path="/" component={News}/>
        <Route exact path="/:id" component={NewsList} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}
