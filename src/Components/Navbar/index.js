import {Component} from 'react'
import {Link} from 'react-router-dom'
import SearchContext from '../../SearchContext'
import './index.css'

class Navbar extends Component {
  state = {
    activetab: 'Popular',
    searchinput: '',
    moviedetails: [],
  }

  updatesearchinput = event => {
    event.preventDefault()
    this.setState({searchinput: event.target.value}, this.getsearchresult)
  }

  getsearchresult = async () => {
    const {searchinput} = this.state
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${'1e1fbd5440d79c4b6cb811e5e5ad8cf1'}&language=en-US&query=${searchinput}&page=1`
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
      this.setState({moviedetails: converteddata})
    }
  }

  updatepopular = () => {
    this.setState({activetab: 'Popular', searchresult: false})
  }

  updateToprated = () => {
    this.setState({activetab: 'Top Rated', searchresult: false})
  }

  updateUpcoming = () => {
    this.setState({activetab: 'Upcoming', searchresult: false})
  }

  render() {
    const {searchinput, moviedetails} = this.state
    return (
      <SearchContext.Consumer>
        {value => {
          const {updatesearch} = value
          const sendlist = () => {
            updatesearch(moviedetails)
          }
          return (
            <div className="navContainer">
              <h1 className="navtitle">movieDB</h1>
              <ul className="navlinkContainer">
                <Link className="link" to="/">
                  <h1 className="tabname" onClick={this.updatepopular}>
                    Popular
                  </h1>
                </Link>
                <Link className="link" to="/top-rated">
                  <h1 className="tabname" onClick={this.updateToprated}>
                    Top Rated
                  </h1>
                </Link>
                <Link className="link" to="/upcoming">
                  <h1 className="tabname" onClick={this.updateUpcoming}>
                    Upcoming
                  </h1>
                </Link>
              </ul>
              <div className="searchContainer">
                <input
                  className="searchinput"
                  role="textbox"
                  onChange={this.updatesearchinput}
                  value={searchinput}
                />
                <Link to="/Search">
                  <button
                    role="button"
                    className="searchicon"
                    onClick={sendlist}
                  >
                    Search
                  </button>
                </Link>
              </div>
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default Navbar
