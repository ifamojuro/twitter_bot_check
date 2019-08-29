import React from 'react'
import LoadingScreen from 'react-loading-screen'
import { withRouter} from 'react-router-dom';
import axios from 'axios'
import Custom_Nav from './Nav'
import Results from './Results'
 
//...
class Load extends React.Component {

constructor(props) {
    super(props)
    this.state = { loading: true, results:[], count:0, bots:0 }
    this.sendNameToServer = this.sendNameToServer.bind(this);
}

sendNameToServer(){
axios.post(window.location.origin+'/api/result', {
  })
  .then(result =>{
    this.setState({results:result.data.items, loading:false, count:result.data.friends, bots:result.data.bots})
  })
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

  