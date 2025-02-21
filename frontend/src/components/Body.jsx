import "../css/MovieBox.css"; 
import MovieCard from "./MovieCard";
import Summary from "./Summary";

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
