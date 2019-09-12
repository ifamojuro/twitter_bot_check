import React from 'react'
import LoadingScreen from 'react-loading-screen'
import { withRouter} from 'react-router-dom';
import axios from 'axios'
import Results from './Results'
 
//...
class Load extends React.Component {

constructor(props) {
    super(props)
    this.state = { loading: true, results:[], count:0, bots:0 }
    this.sendNameToServer = this.sendNameToServer.bind(this);
}

sendNameToServer(){

axios.get('http://127.0.0.1:5000/api/result', {withCredentials: true})
  .then(result =>{
    this.setState({results:result.data.items, loading:false, count:result.data.friends, bots:result.data.bots})
  })
  
/*
fetch('http://127.0.0.1:5000/api/result', {credentials: 'same-origin'})
      .then(response => response.json())
      .then(data =>this.setState({results:data.items, loading:false, 
        count:data.friends, bots:data.bots}));
*/
}


componentDidMount(){
    this.sendNameToServer() 
  }



render(){
  return(
      <LoadingScreen
      loading={this.state.loading}
      bgColor='#00ACEE'
      spinnerColor='white'
      textColor='white'
      text='Analyzing Data'
    > 
    <Results data={this.state.results} count={this.state.count} bots={this.state.bots}/>
    </LoadingScreen>
    )
  }

}

export default withRouter(Load);

  