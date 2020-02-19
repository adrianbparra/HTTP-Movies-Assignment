import React from "react";
import axios from "axios";


export default class MovieUpdate extends React.Component {
    constructor(props){
        super(props)
        this.state={
            movie: {
                title: undefined,
                director: '',
                metascore: 0,
                stars: [],
            }
        }
    }

    handleChange = e => {
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

    addSubmit = e => {
        e.preventDefault();

        axios
            .post(`http://localhost:5000/api/movies`,this.state.movie)
            .then(res=> {
                console.log(res)
                console.log(this.props)
                this.props.history.push("/")
            })
            .catch(err => console.log(err))
        
    }

    render() {

        
        return(
            <form onSubmit={this.addSubmit}>
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
                <button>Add Movie</button>
            </form>
        )
    }



}