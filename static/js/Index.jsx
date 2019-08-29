import React from "React";
import ReactDOM from "react-dom";
import App from "./App";
import Load from "./Load";
import Faq from "./Faq";
import Er from "./Error"
import { BrowserRouter, Switch, Route} from "react-router-dom";


class Index extends React.Component{
	render(){
	  	return <App/>
	  }	

}

ReactDOM.render(<BrowserRouter>
	<Switch>
	  <Route exact path="/" component={Index}/>
	  <Route path="/load" component={Load}/>
	  <Route path="/error" component={Er}/>
	  <Route path="*" component={Er}/>
  </Switch>
  </BrowserRouter>, document.getElementById("content"));