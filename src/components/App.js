import React from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import axios from 'axios';
require('dotenv').config();

console.log(process.env.REACT_APP_API_KEY)



class App extends React.Component {

    state = {
        // npx json-server --watch src/api/movies.json --port 3002 --> json server izleme
        //fetch asenkron olarak network sorguları yapmamızı sağlayan bir javascript fonksiyonu ve bize bir promise döner
        //fetch yapıcaksak componentDidMount içinde yapmak en mantıklısı 
        movies: [],

        search:''
    }


    // async componentDidMount(){
    //     const baseURL = 'http://localhost:3002/movies';
    //     const response =await fetch(baseURL);
    //     console.log(response);
    //     const data =await response.json()
    //     console.log(data)
    //     this.setState({movies:data})
    // }

    async componentDidMount(){
        //axios http istekleri yapmak iiçin kullanılan promise tabanlı bir kütüphane
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=6b70f7e13482e8cfbe3a076a2dbf7e25&language=en-US&page=1');
        console.log(response.data.results);
        
        this.setState({movies: response.data.results})
    }

    // deleteMovie = (movie) => {
    //     const newMovieList = this.state.movies.filter(
    //         m => m.id !== movie.id
    //     );
    //     //eğer herhangi bir state nesnemiz olmasaydı bunu kullanabilirdik
    //     // this.setState({
    //     //     movies:newMovieList
    //     // })
        
    //         //state nesnemiz olduğu için bunu kullanıyoruzzzzz güncelleme yapıyoruz
    //     this.setState(state => ({
    //         movies:newMovieList
    //     }))
    // }


    //FETCH API
    // deleteMovie = async (movie) => {
    //     const baseURL = `http://localhost:3002/movies/${movie.id}`;
    //     await fetch(baseURL, {
    //         //fetch de method kullanmamız gerekmez ise default olarak GET methodu olur
    //         method:'DELETE'
    //     })
    //     const newMovieList = this.state.movies.filter(
    //         m => m.id !== movie.id
    //     );
    //     //eğer herhangi bir state nesnemiz olmasaydı bunu kullanabilirdik
    //     // this.setState({
    //     //     movies:newMovieList
    //     // })
        
    //         //state nesnemiz olduğu için bunu kullanıyoruzzzzz güncelleme yapıyoruz
    //     this.setState(state => ({
    //         movies:newMovieList
    //     }))
    // }


    //AXIOS API
    deleteMovie = async (movie) => {
        axios.delete(`http://localhost:3002/movies/${movie.id}`)
        
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id
        );
       
        this.setState(state => ({
            movies:newMovieList
        }))
    }

    searchMovie = (event) => {
        this.setState({search:event.target.value})
    }

    render(){

        let filteredMovies = this.state.movies.filter(
            (movie) => {
                return movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        )
        return(
            <div className='container'>

                <div className='row'>
                    <div className='col-lg-12'>
                        <SearchBar searchMovieProp={this.searchMovie}/>
                    </div>
                    
                </div>
                <MovieList 
                movies={filteredMovies}
                deleteMovieProps= {this.deleteMovie}
                
                />

                
            </div>
            
        );
    }
}

export default App;
