import "../css/MovieBox.css"; 
import MovieCard from "./MovieCard";
import Summary from "./Summary";
import PropTypes from "prop-types";


function Body({title}) {
    return (
        <>
            <div className="content-box">
                <MovieCard title = {title} />
                <Summary movieName = {title}/>
            </div>
        </>
    );
}

export default Body;

Body.propTypes = {
    title: PropTypes.string, 
};

