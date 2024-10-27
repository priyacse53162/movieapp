import {Component} from 'react'
import './index.css'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'

class Home extends Component {
  state = {
    moviedetails: [],
  }

  componentDidMount() {
    this.getmoviedetails()
  }

  getmoviedetails = async () => {
    const url =
      'https://api.themoviedb.org/3/movie/popular?api_key=${1e1fbd5440d79c4b6cb811e5e5ad8cf1}&language=en-US&page=1'
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

  render() {
    const {moviedetails} = this.state
    return (
      <>
        <Navbar />
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
