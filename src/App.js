import {Component} from 'react'
import './App.css'
import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home'
import Toprated from './Components/Toprated'
import Upcoming from './Components/Upcoming'
import MovieDetails from './Components/MovieDetails'
import Search from './Components/Search'
import SearchContext from './SearchContext'

class App extends Component {
  state = {searchlist: []}

  updatesearch = list => {
    this.setState({searchlist: list})
  }

  render() {
    const {searchlist} = this.state
    return (
      <SearchContext.Provider
        value={{searchlist, updatesearch: this.updatesearch}}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={Toprated} />
          <Route exact path="/Search" component={Search} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/movie/:id" component={MovieDetails} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
