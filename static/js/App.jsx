import React from "react"
import Load from "./Load"
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {value: '', submitted:false};
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	  }


	handleChange(event) {
    	this.setState({value: event.target.value});
    }


	 handleSubmit(event) {
	    console.log('A name was submitted: ' + this.state.value);
	    this.setState({submitted:true})
	    event.preventDefault();
	  }



  render () {
  	const submitted = this.state.submitted
  	
  	if (submitted)
  	{
  		name = this.state.value;
  		return(
  				<Redirect to={{pathname:"/load", state:{name:{name}}}} />
  			)
  	}
    return (
	
		<form onSubmit={this.handleSubmit}>
	        <label>
	          Input your tweetter handle:
	          <input type="text" value={this.state.value} onChange={this.handleChange}/>
	        </label>
	        <input type="submit" value="Submit" />
	     </form>
    )
  }
}