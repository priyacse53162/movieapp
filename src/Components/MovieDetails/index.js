import './index.css'
import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Genre from '../Genre'
import Castmembers from '../Castmembers'

class MovieDetails extends Component {
  state = {moviedetails: {}, castdetails: [], genres: []}

  componentDidMount() {
    this.getid()
  }

  getid = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const movieurl = `https://api.themoviedb.org/3/movie/${id}?api_key=${'1e1fbd5440d79c4b6cb811e5e5ad8cf1'}&language=en-US`
    const casturl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${'1e1fbd5440d79c4b6cb811e5e5ad8cf1'}&language=en-US`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTFmYmQ1NDQwZDc5YzRiNmNiODExZTVlNWFkOGNmMSIsIm5iZiI6MTcyODM4NDA4My4yNTE3ODQsInN1YiI6IjY3MDUwN2RkOThkZjhlYTAxNTFkNDVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VRmANlTTbEBl1gR0UPZTFDdoF8us4cpVcMY_gHM_A40`,
      },
    }
    const movieresponse = await fetch(movieurl, options)
    const moviedata = await movieresponse.json()
    const convertgenres = genre => ({
      id: genre.id,
      name: genre.name,
    })
    const convertedmovie = data => ({
      adult: data.adult,
      backdropPath: data.backdrop_path,
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
      runtime: data.runtime,
    })

    const convertedcast = data => ({
      adult: data.adult,
      castId: data.cast_id,
      character: data.character,
      creditId: data.credit_id,
      gender: data.gender,
      id: data.id,
      knownForDepartment: data.known_for_department,
      name: data.name,
      order: data.order,
      originalName: data.original_name,
      popularity: data.popularity,
      profilePath: data.profile_path,
    })
    const moviedetailsconverted = convertedmovie(moviedata)
    const genres = moviedata.genres.map(eachitem => convertgenres(eachitem))
    const castresponse = await fetch(casturl, options)
    const castdata = await castresponse.json()
    const {cast} = castdata
    const castconverted = cast.map(eachitem => convertedcast(eachitem))

    this.setState({
      moviedetails: moviedetailsconverted,
      castdetails: castconverted,
      genres,
    })
  }

  render() {
    const {genres, moviedetails, castdetails} = this.state
    const {
      title,
      posterPath,
      popularity,
      runtime,
      releaseDate,
      overview,
    } = moviedetails
    return (
      <>
        <div className="detailcontainer">
          <div className="topcontainer">
            <h1 className="title">{title}</h1>
            <div className="moviedetails">
              <img
                className="detailedmovieimage"
                src={`https://image.tmdb.org/t/p/original${posterPath}`}
              />
              <div className="movietext">
                <p className="ratingtext">
                  <span className="boldertext">Rating: </span>
                  {popularity}
                </p>
                <p className="ratingtext">
                  <span className="boldertext">Runtime: </span>
                  {runtime}
                </p>
                <p className="ratingtext">
                  <span className="boldertext">ReleaseDate: </span>
                  {releaseDate}
                </p>
                <p className="ratingtext">
                  <span className="boldertext">Overview: </span>
                  {overview}
                </p>
                <p className="boldertext">Genres:</p>
                <ul className="genrescontainer">
                  {genres.map(eachitem => (
                    <Genre key={eachitem.id} genredetails={eachitem} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="bottomcontainer">
            <h1 className="title cast">Cast Members</h1>
            <ul className="castmembersContainer">
              {castdetails.map(eachitem => (
                <Castmembers key={eachitem.id} castdetails={eachitem} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(MovieDetails)
