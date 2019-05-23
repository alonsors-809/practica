import React, {Component} from 'react';
import './Reports.css';
class Reports extends Component {

constructor(props){
    super(props)
    this.state = {
        user:this.props.location.state.user,
        data: [],
        names:[],
        social:[],
        jobs:[],
        emails:[],
        DisplayData:[""],
        title:'Email'
    }

}

async setDataLocalStorage(email,name,social,jobs){
  let user = this.state.user
  await localStorage.setItem('Emails'+user,email);
  await localStorage.setItem('Names'+user,name);
  await localStorage.setItem('Social'+user,social);
  await localStorage.setItem('Jobs'+user,jobs);
} 

async PrintData(){
  let user = this.state.user
  var theList = await localStorage.getItem('LocalData'+user)
  //theList.map(function(row){  
  console.log( theList[0])
  //})
  

}

async componentWillMount() {
  // when component mounted, start a GET request to specified URL
  localStorage.clear();
  var url = 'https://www.beenverified.com/hk/dd/teaser/email?email=skip.suva@beenverified.com';
  var Allnames=[]
  var Allemails=[]
  var Alljobs=[]
  var Allsocial=[]

  var data = await fetch(url,{ method: "GET",headers: new Headers({})}).then(response => response.json())

  for (var i=0;i<data.names.length; i++){
    Allnames.push(data.names[i].full)
  }
  for ( i=0;i<data.emails.length; i++){
    Allemails.push(data.emails[i].email_address)
  }
  for ( i=0;i<data.jobs.length; i++){
    Alljobs.push(data.jobs[i])
  }
  for ( i=0;i<data.social.length; i++){
    Allsocial.push(data.social[i])
  }
  this.setState( {names: Allnames, social:Allsocial, jobs:Alljobs,emails:Allemails, DisplayData:Allemails } )
  await this.setDataLocalStorage(Allemails,Allnames,Allsocial,Alljobs)
  //console.log("person:",Allnames, Allemails, Allsocial, Alljobs) 
}

returnView = () => {
  const data = this.state.DisplayData
  return(
    data.map(function(row){
      return(
      <tr  key={row.toString()}>
        <td >{row}</td>
      </tr>
      )
    })
  )
}

returnViewHead = () => {
  return(
    <tr>
			<th>{this.state.title}</th>
		</tr>
  )
}


render() {
  return(

  <div type="table-wrapper" className="table-wrapper">
  
    <div type="containerTop">
      <button type="buttonTop"  onClick={() => this.setState({title:'Email', DisplayData:this.state.emails})}>Emails</button>
      <button type="buttonTop" onClick={() => this.setState({title:'Names', DisplayData:this.state.names})}>Names</button>
      <button type="buttonTop" onClick={() => this.setState({title:'Social', DisplayData:this.state.social})}>Social</button>
      <button type="buttonTop" onClick={() => this.setState({title:'Jobs', DisplayData:this.state.jobs})}>Jobs</button>
    </div>
  <div  className="PrincipalContainer">
  <table className="demo-table">
		<thead>
    {this.returnViewHead()}
		</thead>
		<tbody>
      {this.returnView()}
		</tbody>
		
	</table>
    <div>
      <button type="buttonTop"  onClick={() => this.PrintData()}>PrintData</button>
      <button type="buttonTop"  onClick={() => this.setDataLocalStorage("a","b","c","d")}>SaveData</button>
    </div>
  </div>
  </div>
  )
}
}


export default Reports;
