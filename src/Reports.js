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



async setDataLocalStorage(email,name,social,jobs){
  let user = this.state.user
  var data = await localStorage.getItem('LocalData'+user)
  console.log("1",data)
  if (data == null){
    await localStorage.setItem('LocalData'+user,[JSON.stringify({"email":email,"name":name,"social":social,"jobs":jobs})]);
  }else{
    data  += [JSON.stringify({"email":email,"name":name,"social":social,"jobs":jobs})]
    await localStorage.setItem('LocalData'+user,data);
  }
  
} 

async PrintData(){
  let user = this.state.user
  var theList = await localStorage.getItem('LocalData'+user)
  //theList.map(function(row){  
  console.log( theList[0])
  //})
  

}

async componentDidMount() {
  // when component mounted, start a GET request
  // to specified URL
  localStorage.clear();
  var url = 'https://facebook.github.io/react-native/movies.json';

  await fetch(url,
    {
      method: "GET",
      headers: new Headers({})
    }).then(response => response.json())
    .then(data => this.setState({ data: data.movies }));  
}


render() {
  const data = this.state.data
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
			
        {
      data.map(function(movie){
        return(
          <tr>
				<td>{movie.id}</td>
				<td>{movie.title}</td>
				<td>Television</td>
				<td>{movie.releaseYear}</td>
        </tr>
        )
      })}
			
			
		</tbody>
		
	</table>
    <div>
    <button onClick={() => this.PrintData()}>PrintData</button>
    <button onClick={() => this.setDataLocalStorage("a","b","c","d")}>SaveData</button>
    </div>
  </div>
  )
}
}

export default Reports;
