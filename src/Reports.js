import React, {Component} from 'react';
import './Reports.css';
class Reports extends Component {

constructor(props){
    super(props)
    this.state = {
        user:this.props.location.state.user,
        data: [] 
    }

}
formatName() {
  return 'asd';
};

async componentDidMount() {
  // when component mounted, start a GET request
  // to specified URL
  var url = 'https://facebook.github.io/react-native/movies.json';

  await fetch(url,
    {
      method: "GET",
      headers: new Headers({})
    }).then(response => response.json())
    .then(data => this.setState({ data }));  
}


render() {
  console.log(this.state.data)
  return(
  <div>
      <table className="demo-table">
		<caption className="title">Table of Reports</caption>
		<thead>
			<tr>
				<th>Email addresses</th>
				<th>Names</th>
				<th>Social</th>
				<th>Jobs</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>1</td>
				<td>Anthony</td>
				<td>Television</td>
				<td>September 07, 2016</td>
			</tr>
			
		</tbody>
		
	</table>
  </div>
  )
}
}

export default Reports;
