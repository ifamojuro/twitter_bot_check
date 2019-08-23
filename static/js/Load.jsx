import React from 'react'
//...
import LoadingScreen from 'react-loading-screen'
import { withRouter} from 'react-router-dom';
import axios from 'axios'

//...
class Load extends React.Component {

constructor(props) {
    super(props)
    this.state = { loading: true, results:{} }
    this.sendNameToServer = this.sendNameToServer.bind(this);
}

sendNameToServer(screen_name){
axios.post(window.location.origin+'/api/result', {
    screen_name:screen_name
  })
  .then(result =>{
    console.log(result.data)
    this.setState({results:result.data, loading:false})
    console.log(typeof(this.state.results))
  })
}

componentDidMount(){
    this.sendNameToServer(this.props.location.state.name)
  }



render(){
  return(
      <LoadingScreen
      loading={this.state.loading}
      bgColor='#f1f1f1'
      spinnerColor='#9ee5f8'
      textColor='#676767'
      logoSrc={require('../images/botcheck.png')}
      text='Running our state of the art Model'
    > 
    
    <div>
    {
      Object.keys(this.state.results).map((object, i) => {
        return <p key={object}>{object} + {this.state.results[object]}</p>
    }) 
    }

    </div>
    </LoadingScreen>
    )
    
  }

}

export default withRouter(Load);

  