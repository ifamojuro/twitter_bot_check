import React from "react"
import Load from "./Load"
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios'
import logo from '../images/checker.png';
import styled from 'styled-components';
import { Wrapper, TitleBlub, Twitbut, Footer, Footer_Link, Des_Blurb, ColoredLink, StyledLink, StyledHlink} from './Styles.js';
import Custom_Nav from './Nav'
import Faq from './Faq'

export default class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {value: '', token:'',submitted:false};
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


twit_py_auth(){
	axios.post(window.location.origin+'/api/auth/twitter').then(result =>
	window.location = result.data.red_url)}

  render () {
  	const submitted = this.state.submitted

    return (
    	<div>
    	<Custom_Nav/>
    	<Wrapper>
    		<div id="home" style={{"height":"100vh"}}>
    		<TitleBlub>Analyze.me uses state of the art research to help you identify if any of the twitter accounts that you follow are malicious Content Polluters.</TitleBlub>
    		<Twitbut onClick={this.twit_py_auth}>Click Here to login with Twitter!</Twitbut>
    		<Des_Blurb> 
    			Analyze.me uses data sourced from <ColoredLink href="https://pdfs.semanticscholar.org/b433/9952a73914dc7eacf3b8e4c78ce9a5aa9502.pdf">Lee, Eoff and Cavelee's Study on Twitter Content Polluters </ColoredLink> to create a Machine Learning Classifier which detects content polluting twitter accounts.
    			Analyze.me does not save/store/or retain any personal data. Data is scraped from the Twitter for the sole purpose of runnning it through the model. After a user leaves 
    			the Analyze.me website, all relevant data is deleted from the server. If you have more question's, definetly check out our <StyledHlink smooth style={{"font-weight": "bold"}} to="/#faq-section"> FAQ section</StyledHlink>. Otherwise, feel free to reach the site's developer <ColoredLink href="http://ifedayo.me"> through his website here!</ColoredLink>
    		</Des_Blurb>
    		</div>
    		<Faq/>
	   </Wrapper>
	   <Footer>
	   	<Footer_Link href="http://ifedayo.me"> Made by Ifedayo Famojuro Ⓒ</Footer_Link>
	   </Footer>
	   </div>
    )
  }
}