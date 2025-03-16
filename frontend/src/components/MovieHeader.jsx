import "../css/MovieBox.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"

function MovieHeader({ searchText }) {  
    return (
        <div className="movie-box">
            <h1 className="movie-name">{searchText || ""}</h1> 
            <nav>
                <ul className="nav-menu">
                    <li><Link to="/">Summary</Link></li>
                    <li><Link to="/characters">Characters</Link></li>
                    <li><Link to="/references">References</Link></li>
                    <li><Link to="/quotes">Quotes</Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                </ul>
            </nav>
        </div>
    );
}
export default MovieHeader;

MovieHeader.propTypes = {
    searchText: PropTypes.string, 
};