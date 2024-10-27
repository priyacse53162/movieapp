import './index.css'

const Castmembers = props => {
  const {castdetails} = props
  const {character, originalName, profilePath} = castdetails
  return (
    <li className="castcard">
      <img
        src={`https://image.tmdb.org/t/p/original${profilePath}`}
        className="castimage"
      />
      <p className="originalName">{originalName}</p>
      <p className="originalName">{character}</p>
    </li>
  )
}

export default Castmembers
