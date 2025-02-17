import "../css/MovieBox.css"; 

function MovieHeader() {
    return (
        <>
            <div className="movie-box">
                <h1 className="movie-name">[Movie Title]</h1>
                <nav>
                    <ul className="nav-menu"> {/* Changed class to className */}
                        <li><a href="index.html">Summary</a></li>
                        <li><a href="about.html">Characters</a></li>
                        <li><a href="services.html">References</a></li>
                        <li><a href="contact.html">Quotes</a></li>
                        <li><a href="contact.html">Quiz</a></li>

                    </ul>
                </nav>
            </div>
        </>
    );
}

export default MovieHeader;
