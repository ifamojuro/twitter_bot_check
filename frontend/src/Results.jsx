import React from "react";
import {Wrapper, TitleBlub, Footer, Footer_Link} from './sc';
import Custom_Nav from "./Nav"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default class Results extends React.Component{

	picformatter(cell, row) {
	  return(<img style={{ "width":"10vw" }}src={ cell }/>)
	}

	nameformatter(cell, row) {
	  return(<span>@{ cell }</span>)
	}

	predformatter(cell, row) {
	 if(row.pred)
	 {
	 	return (<div style={{"color":"#00ACEE","background":"white","height":"100%","width":"auto"}}>Content Polluter!</div>)
	 }
	 else
	 {
	 	return (<div style={{"color":"white","height":"100%","width":"auto"}}>Safe</div>)
	 }
	}


  render(){
	    
	    const columns = [{
						  dataField: 'pic',
						  text: 'Profile Picture',
						  formatter: this.picformatter,
						  classes: 'pic-cell'
						}, {
						  dataField: 'screen_name',
						  text: 'Screen Name',
						  formatter: this.nameformatter
						}, {
						  dataField: 'pred',
						  text: 'Prediction',
						  formatter: this.predformatter,
						  classes: 'pred-cell'
						}];

	    return(
	    	<div>
		    	<Custom_Nav/>
		    	<Wrapper>
		    		<TitleBlub>You follow {this.props.count} Twitter Accounts</TitleBlub>
		    		<TitleBlub>Our Model Identified {this.props.bots} of those accounts as Content Polluters</TitleBlub>
		    		<BootstrapTable bootstrap4 keyField='screen_name' data={ this.props.data } 
		    		columns={ columns } pagination={paginationFactory()} headerClasses="header-class" rowClasses="row-class" striped hover />
		    	</Wrapper>
		    	<Footer>
	   				<Footer_Link href="http://ifedayo.me"> Made by Ifedayo Famojuro Ⓒ</Footer_Link>
	   			</Footer>
		    </div>
		 )

	}
}
