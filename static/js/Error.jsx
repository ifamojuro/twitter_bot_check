import React from 'react'
import { withRouter, Redirect} from 'react-router-dom';
import {Wrapper,TitleBlub,Des_Blurb, StyledLink, Footer, Footer_Link} from './Styles.js';
import Custom_Nav from "./Nav"


class Er extends React.Component{
  
  ComponentdidMount()
  {
  	
  	console.log("hello")
  	setTimeout(() => { 
        window.location.href ="/"
    }, 1500)  	
  	
  }
  
  render()
  {
	  return (
	    <div>
			<Custom_Nav/>
			<Wrapper>
				<TitleBlub>
					Oh no! There's been an Error! 
				</TitleBlub>
				<Des_Blurb>
					This might have occured for a couple of reasons:
					<ul>
						<li>You ventured to a secure page (such as the results) without being authenticated</li>
						<li>You clicked "cancel" / something went wrong durring the Twitter Authentication Process </li>
						<li>You've visited a url that isn't currently on the site</li>
					</ul>
					No matter the problem, feel free to <StyledLink to="/">To return to our homepage and try the process again. Thank You!</StyledLink>
				</Des_Blurb>
			</Wrapper>
			<Footer>
		   		<Footer_Link href="http://ifedayo.me"> Made by Ifedayo Famojuro Ⓒ</Footer_Link>
		   </Footer>
		</div>
	  )
	}
}


export default withRouter(Er)