import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'
import NavBar from './components/NavBar'
import './css/App.css'
import FavList from './pages/FavList'
import Home from './pages/Home'
import Post from './pages/Post'
import Upload from './pages/Upload'
import VoteList from './pages/VoteList'

function App() {
  return (
    <Router>
      <div className="container shadow transition">
        <Route component={NavBar} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/post/:id" component={Post} />
          <Route path="/favorites" component={FavList} />
          <Route path="/votes" component={VoteList} />
          <Route path="*" component={Loading} />
        </Switch>
        <footer>
          <div>
            By <i className="hop transition">Darik. </i>
            @github/neuralline/cats
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
