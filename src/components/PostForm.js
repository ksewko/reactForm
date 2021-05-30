import React, { Component } from 'react'
import axios from 'axios'
import DurationInput from 'react-duration'
import Rating from "react-rating"
import '../css/postForm.css'

let showPizza= false
let showSoup= false
let showSandwich= false

class PostForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:'',
             duration: 0.0,
             type:'Choose',
             no_of_slices: 0,
             diameter: 0.0,
             spiciness_scale: 1,
             slices_of_bread: 1,
        }
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    typeHandler = e => {
        // const{ type, showPizza, showSoup} = this.state
        if(e.target.value === "pizza"){
            showPizza= true
            showSoup= false
            showSandwich= false
        }
        else if (e.target.value === "soup"){
            showPizza=false
            showSoup= true
            showSandwich= false
        }
        else if (e.target.value === "sandwich"){
            showPizza= false
            showSoup= false
            showSandwich= true
        }
        this.setState({
            type: e.target.value,
        })
    }
    
    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post('http://jsonplaceholder.typicode.com/posts', this.state,{ 
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    
    
    onPointClick(nextValue) {
        this.setState({spiciness_scale: nextValue});
      }
    
    render() {
        const{ name, duration, type, no_of_slices, diameter, spiciness_scale, slices_of_bread} = this.state
        
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div className = "form-file">
                        <label>Name: </label>
                        <input className = "text-input" type="text" name="name" value={name} onChange={this.changeHandler}/>
                    </div>
                    <div className = "form-file">
                        <label>Preparation Time: </label>
                        <DurationInput
                            value={duration}
                            minValue={1}
                            onChange={ new_duration=> this.setState({duration: new_duration})}
                        />
                    </div>
                    <div className = "form-file">
                        <label>Type: </label>
                        <select value={type} onChange={this.typeHandler}>
                            <option ></option> 
                            <option value="pizza">Pizza</option> 
                            <option value="soup">Soup</option> 
                            <option value="sandwich">Sandwich</option>
                        </select>
                        <div  className = "form-file" style={{ display: showPizza ? "block" : "none" }}>
                            <label>Number of slices: </label>
                            <input  className = "text-input"type="number" name="no_of_slices" value={no_of_slices} onChange={this.changeHandler}/>
                        </div>
                        <div className = "form-file" style={{ display: showPizza ? "block" : "none" }}> 
                            <label>Pizza diameter: </label>
                            <input  className = "text-input" type="float" name="diameter" value={diameter} onChange={this.changeHandler}/>
                        </div>
                        <div className = "form-file" style={{ display: showSoup ? "block" : "none" }}>
                            <h2>Spiciness scale: {spiciness_scale}</h2>
                            <Rating 
                                fractions={1}
                                stop={10}
                                initialRating={spiciness_scale}
                                onClick={this.onPointClick.bind(this)}
                            />
                        </div>
                        <div className = "form-file" style={{ display: showSandwich ? "block" : "none" }}>
                            <label>Slices of bread: </label>
                            <input  className = "text-input" type="number" name="slices_of_bread" value={slices_of_bread} onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <button class ="sub-button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default PostForm
