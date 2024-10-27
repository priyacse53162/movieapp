import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import SearchContext from '../../SearchContext'

const Search = () => (
  <SearchContext.Consumer>
    {value => {
      const {searchlist} = value
      return (
        <>
          <Navbar />
          <ul className="movieContainer">
            {searchlist.map(eachitem => (
              <MovieCard key={eachitem.id} moviedetails={eachitem} />
            ))}
          </ul>
        </>
      )
    }}
  </SearchContext.Consumer>
)

export default Search
