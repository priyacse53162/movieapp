import './index.css'
import {Link} from 'react-router-dom'

const MovieCard = props => {
  const {moviedetails} = props
  const {id, title, voteAverage, posterPath} = moviedetails
  return (
    <li className="moviecard">
      <img
        src={`https://image.tmdb.org/t/p/original${posterPath}`}
        className="movieimage"
      />
      <h1 className="movietitle">{title}</h1>
      <p className="rating">{voteAverage}</p>
      <Link to={`/movie/${id}`}>
        <button className="ViewDetailsbutton">View Details</button>
      </Link>
    </li>
  )
}
export default MovieCard
