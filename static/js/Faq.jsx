import React from 'react'
import { withRouter} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import {Wrapper, Footer, Footer_Link, TitleBlub} from './Styles.js';
import Custom_Nav from './Nav'
import "../css/boots.css"

class Faq extends React.Component {
	constructor(props){
		super(props)
		this.questions = [
		{"Question":"What is Analyze.me?", "Answer":"Analyze.me is a web applet which allows users to scan the accounts that they follow on Twitter in order to dectect if any of those accounts are content polluting bots!"},
		{"Question":'What is a "content polluting bot"?', "Answer":'"Content Polluters" describe the collection of fraudsters,spammers, scammers and other bad actors who use social media to spread disinformation.'},
		{"Question":"Wow! How does Analyze.me work?", "Answer":"Analyze.me uses data from labeled content polluters to isolate indentifying features of Content Polluting Bots. The applet uses these features to create Logisitic Classifier which can predict if an account is a Content Polluter. When a user uses Analyze.me, the applet sends a call to the Twitter API in order to find information about the accounts that that user follows. After the user authenticates Analyze.me, the applet compares the followed accounts with the regression classifier inorder to make predictions."},
		{"Question":"That's amazing! How do I use Analyze.me?", "Answer":"Navigate back to the home page and click 'Sign in with Twitter'"},
		{"Question":"Does Analyze.me store any of my personal data?", "Answer":"No! Analyze.me does not save, store, or retain any personal data."},
		{"Question":"Why does Analyze request so many permissions from Twitter account?", "Answer":"Analyze.me currently works with the Twitter Api analyze user data. The Twitter API does not allow apps to select specifc permission, but instead buckets permissions into 'read' and 'write' buckets. The permissions that analyze.me requests fall under the 'read' bucket. "},
		{"Question":"How accurate is Analyze.me?", "Answer":"Analyze.me can predict whether or not an account is a bot with 85% accuracy"},
		{"Question":"Who built Analyze.me?", "Answer":'Analyze.me was built by Ifedayo Famojuro. <a href="https://ife dayo.me">You can findout more about him here</a>'},
		{"Question":"How can I build my own version of Analyze.me/something like Analyze.me", "Answer":"There are tons of resources online that can help anyome build a logistic classifier. As a python developer, I recomend this one!"},
		]
	}

	render(){

	var cards = []
	this.questions.forEach((item, index)=>{
		 var card = 
		<Card>
	      <Accordion.Toggle as={Card.Header} eventKey={index}>
	        {item.Question}
	      </Accordion.Toggle>
	    <Accordion.Collapse eventKey={index}>
	      <Card.Body><div dangerouslySetInnerHTML={ { __html: item.Answer } }></div></Card.Body>
	    </Accordion.Collapse>
	  </Card>
	  cards.push(card)
	})

	return(	
		<div id="faq-section">
				<TitleBlub>Frequently Asked Questions</TitleBlub>
				<Accordion>
					{cards}
				</Accordion>
		</div>
	)
	}
}

export default withRouter(Faq);