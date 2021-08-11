import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddArticle2 from './components/AddArticle2';
import ArticleInfo2 from './components/ArticleInfo2';
import ArticleList2 from './components/ArticleList2';
import Header from './components/Header';

function App() {

 

  return (
    <Router >
      <div className="App">
        <Navbar />
        <Header />
        <Switch>
          <Route exact path="/">
            <ArticleList2 />
            <ArticleInfo2 />
          </Route>
          <Route exact path="/Add-Article2">
            <AddArticle2 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
