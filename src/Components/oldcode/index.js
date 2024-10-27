import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import Navlink from '../Navlink'
import MovieCard from '../MovieCard'

const routesandurl = [
  {
    routename: 'Popular',
    route: '/',
    routeurl:
      'https://api.themoviedb.org/3/movie/popular?api_key=${1e1fbd5440d79c4b6cb811e5e5ad8cf1}&language=en-US&page=1',
  },
  {
    routename: 'Top Rated',
    route: '/top-rated',
    routeurl:
      'https://api.themoviedb.org/3/movie/top_rated?api_key=${1e1fbd5440d79c4b6cb811e5e5ad8cf1}&language=en-US&page=1',
  },
  {
    routename: 'Upcoming',
    route: '/upcoming',
    routeurl:
      'https://api.themoviedb.org/3/movie/upcoming?api_key=${1e1fbd5440d79c4b6cb811e5e5ad8cf1}&language=en-US&page=1',
  },
]

class Home extends Component {
  state = {
    activeroute: routesandurl[0].routename,
    routesandurls: routesandurl,
    moviedetails: [],
    searchinput: '',
  }

  componentDidMount() {
    this.getmoviedetails()
  }

  updatesearchinput = event => {
    event.preventDefault()
    this.setState({searchinput: event.target.value})
  }

  updateactiveroute = routename => {
    this.setState({activeroute: routename}, this.getmoviedetails)
  }

  getmoviedetails = async () => {
    const {activeroute, routesandurls, searchinput} = this.state
    let url = ''
    if (activeroute === 'Search') {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${'1e1fbd5440d79c4b6cb811e5e5ad8cf1'}&language=en-US&query=${searchinput}&page=1`
    } else {
      const geturl = routesandurls.find(
        eachitem => eachitem.routename === activeroute,
      )
      const {routeurl} = geturl
      url = routeurl
    }
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTFmYmQ1NDQwZDc5YzRiNmNiODExZTVlNWFkOGNmMSIsIm5iZiI6MTcyODM4NDA4My4yNTE3ODQsInN1YiI6IjY3MDUwN2RkOThkZjhlYTAxNTFkNDVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VRmANlTTbEBl1gR0UPZTFDdoF8us4cpVcMY_gHM_A40`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const convertedmovie = data => ({
        adult: data.adult,
        backdropPath: data.backdrop_path,
        genreIds: data.genre_ids,
        id: data.id,
        originalLanguage: data.original_language,
        originalTitle: data.original_title,
        overview: data.overview,
        popularity: data.popularity,
        posterPath: data.poster_path,
        releaseDate: data.release_date,
        title: data.title,
        video: data.video,
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
      })
      const converteddata = data.results.map(eachitem =>
        convertedmovie(eachitem),
      )
      this.setState({moviedetails: converteddata, searchinput: ''})
    }
  }

  changesearchroute = () => {
    this.setState({activeroute: 'Search'}, this.getmoviedetails)
  }

  render() {
    const {routesandurls, moviedetails, searchinput} = this.state
    return (
      <>
        <div className="navContainer">
          <h1 className="navtitle">movieDB</h1>
          <ul className="navlinkContainer">
            {routesandurls.map(eachitem => (
              <Navlink
                key={eachitem.routename}
                navdetails={eachitem}
                updateactiveroute={this.updateactiveroute}
              />
            ))}
          </ul>
          <div className="searchContainer">
            <input
              className="searchinput"
              role="textbox"
              onChange={this.updatesearchinput}
              value={searchinput}
            />
            <Link to="/Search" className="link">
              <button
                role="button"
                className="searchicon"
                onClick={this.changesearchroute}
              >
                Search
              </button>
            </Link>
          </div>
        </div>
        <ul className="movieContainer">
          {moviedetails.map(eachitem => (
            <MovieCard key={eachitem.id} moviedetails={eachitem} />
          ))}
        </ul>
      </>
    )
  }
}

export default Home
