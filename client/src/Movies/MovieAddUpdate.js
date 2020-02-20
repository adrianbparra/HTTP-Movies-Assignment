import React from "react";
import axios from "axios";


export default class MovieAddUpdate extends React.Component {
    constructor(props){
        super(props)
        this.state={
            movie: {
                title: '',
                director: '',
                metascore: null,
                stars: [],
            }
        }
    }

    

    componentDidMount(){
        console.log(this.props.history.location.pathname) 
        
        if(this.props.history.location.pathname === "/movies/update-movie/1"){

            this.fetchMovie(this.props.match.params.id)

            

        }
        console.log(this.state.movie)
    }

    fetchMovie = id => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => {
              this.setState({ movie: res.data })
                console.log(res.data)
            })
          .catch(err => console.log(err.response));
      };

    updateSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.movie)

        if(this.props.history.location.pathname === "/movies/update-movie/1"){

            axios
            .put(`http://localhost:5000/api/movies/${this.state.movie.id}`, this.state.movie)
            .then(res => {
                console.log(res)
                this.props.history.push("/")
                
            })
            .catch(err => console.log(err))

        } else {
            axios
            .post(`http://localhost:5000/api/movies`,this.state.movie)
            .then(res=> {
                console.log(res)
                console.log(this.props)
                this.props.history.push("/")
            })
            .catch(err => console.log(err))
        }

        

    }



    handleChange = e => {
        console.log(e.target.value)
        if(e.target.name === "stars"){
            const starsArray = e.target.value.split(",")
            this.setState({
                movie : {
                    ...this.state.movie,
                    [e.target.name]: starsArray
                }
            })
            return
        }
        this.setState({
            movie: {
                ...this.state.movie,
                [e.target.name] : e.target.value
            }
        })
    }

    submitButton = () => {
        if(this.props.history.location.pathname === "/movies/update-movie/1") {
            return <button>Update Movie</button>
        } else {
            return <button>Add Movie</button>
        }
    }


    render() {

        console.log(this.props.location)

        
        return(
            <form onSubmit={this.updateSubmit} className="form update_form">

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={this.state.movie.title}
                    onChange={this.handleChange}
                />
                <label htmlFor="director">Director</label>
                <input
                    type="text"
                    name="director"
                    value={this.state.movie.director}
                    onChange={this.handleChange}
                />

                <label htmlFor="metascore">Metascore</label>
                <input
                type="number"
                name="metascore"
                value={this.state.movie.metascore}
                onChange={this.handleChange}
                />
                
                <label htmlFor="stars">Stars</label>
                <textarea
                    rows="10"
                    cols="80"
                    name="stars"
                    value={this.state.movie.stars}
                    onChange={this.handleChange}
                />
                <span>Seperate stars using a comma.</span>
                {this.submitButton()}
            </form>
        )
    }



}