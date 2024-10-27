import './index.css'

const Gernre = props => {
  const {genredetails} = props
  const {name} = genredetails
  return <li className="genreName">{name}</li>
}

export default Gernre
