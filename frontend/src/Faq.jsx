import React from 'react'
import { withRouter} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import {TitleBlub} from './sc';
import "./boots.css"

class Faq extends React.Component {
	constructor(props){
		super(props)
		this.questions = [
		{"Question":"What is Analyze.me?", "Answer":"Analyze.me is a web applet which allows users to scan the accounts that they follow on Twitter in order to detect if any of those accounts are content polluters!"},
		{"Question":'What is a "Content Polluter"?', "Answer":'"Content Polluters" (often referred to as "scammers", or "bots") describe any entity which uses social media to spread disinformation.In this way "Content Polluters" may be both physical people, or automated programs.'},
		{"Question":"Wow! How does Analyze.me work?", "Answer":"Analyze.me uses data from labeled Content Polluters to isolate their identifying features. The applet then uses these features to create a Logistic Classifier which can predict if an account is a Content Polluter. When a user logs in to Analyze.me, the applet sends a call to the Twitter API in order to find information about the accounts that that user follows. After the user authenticates Analyze.me, the applet compares the followed accounts with the classifier in order to make predictions."},
		{"Question":"That's amazing! How do I use Analyze.me?", "Answer":'Scroll back up to the top and click the button that says "Sign in with Twitter"!'},
		{"Question":"Does Analyze.me store any of my personal data?", "Answer":"No! Analyze.me does not save, store, or retain any personal data."},
		{"Question":"Why does Analyze.me request so many permissions from my Twitter account?", "Answer":'Analyze.me currently works with the Twitter API to analyze user data. The Twitter API does not allow apps to select specific permissions, but instead groups permissions into "read" and "write" buckets. The permissions that analyze.me requests fall under the "read" bucket.'},
		{"Question":"How accurate is Analyze.me?", "Answer":"When asked to analyze 8000 Twitter accounts which had never before been exposed to the model, Analyze.me correctly identified 85% of those accounts as either a Content Polluter or Non-Content Polluter."},
		{"Question":"Who built Analyze.me?", "Answer":'Analyze.me was built by Ifedayo Famojuro. <a href="https://ifedayo.me">You can findout more about him here.</a>'},
		{"Question":"How can I build my own version of Analyze.me/something like Analyze.me", "Answer":'There are tons of resources online that can help anyone build a logistic classifier. As a python developer, <a href="https://towardsdatascience.com/building-a-logistic-regression-in-python-step-by-step-becd4d56c9c8">I recommend this one! </a>'},
		]
	}

	


	render(){

	var cards = []
	this.questions.forEach((item, index)=>{
		 var card = 
		<Card key={index}>
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