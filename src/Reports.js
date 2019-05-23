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
  await localStorage.setItem('Emails'+user,JSON.stringify(email));
  await localStorage.setItem('Names'+user,JSON.stringify(name));
  await localStorage.setItem('Social'+user,JSON.stringify(social));
  await localStorage.setItem('Jobs'+user,JSON.stringify(jobs));
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
  var url = 'https://www.beenverified.com/hk/dd/teaser/email?email=skip.suva@beenverified.com';

  let user = this.state.user
  /**gets the names */
  var Allnames = await localStorage.getItem('Names'+user)
  if (Allnames == null){
    Allnames= []
  }else{
    Allnames = JSON.parse(Allnames)
  }

  var Allemails = await localStorage.getItem('Emails'+user)
  if (Allemails == null){
    Allemails= []
  }else{
    Allemails = JSON.parse(Allemails)
  }

  var Alljobs = await localStorage.getItem('Social'+user)
  if (Alljobs == null){
    Alljobs= []
  }else{
    Alljobs = JSON.parse(Alljobs)
  }

  var Allsocial = await localStorage.getItem('Jobs'+user)
  if (Allsocial == null){
    Allsocial= []
  }else{
    Allsocial = JSON.parse(Allsocial)
  }


  var data = await fetch(url,{ method: "GET",headers: new Headers({})}).then(response => response.json())

  for (var i=0;i<data.names.length; i++){
    if (!this.inArray(Allnames,data.names[i].full)) {
      Allnames.push(data.names[i].full)
    }
  }
  for ( i=0;i<data.emails.length; i++){
    if (!this.inArray(Allemails,data.emails[i].email_address)) {
      Allemails.push(data.emails[i].email_address)
    }
  }
  for ( i=0;i<data.jobs.length; i++){
    Alljobs.push(data.jobs[i])
  }
  for ( i=0;i<data.social.length; i++){
    Allsocial.push(data.social[i])
  }

  this.setState( {names: Allnames, social:Allsocial, jobs:Alljobs,emails:Allemails, DisplayData:Allemails } )
  await this.setDataLocalStorage(Allemails,Allnames,Allsocial,Alljobs)
  
}

//Compare element Doesnt exist
inArray (list, element) { 
  for(var i=0; i < list.length; i++) { 
      if(list[i] ===element) return true; 
  }
  return false; 
}; 




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
