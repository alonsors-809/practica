import React, {Component} from 'react';
import './Reports.css';

class Reports extends Component {

constructor(props){
    super(props)
    this.state = {
        user:this.props.location.state.user,
        names:[],
        social:[],
        jobs:[],
        emails:[],
        DisplayData:[""],
        title:'Email',
        newEntry:""
    }

}

async setDataLocalStorage(email,name,social,jobs){
  let user = this.state.user
  await localStorage.setItem('Emails'+user,JSON.stringify(email));
  await localStorage.setItem('Names'+user,JSON.stringify(name));
  await localStorage.setItem('Social'+user,JSON.stringify(social));
  await localStorage.setItem('Jobs'+user,JSON.stringify(jobs));
} 

async componentWillMount() {
  // when component mounted, start a GET request to specified URL
  let user = this.state.user
  var url = 'https://www.beenverified.com/hk/dd/teaser/email?email='+user;
  
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

  var Alljobs = await localStorage.getItem('Jobs'+user)
  if (Alljobs == null){
    Alljobs= []
  }else{
    Alljobs = JSON.parse(Alljobs)
  }

  var Allsocial = await localStorage.getItem('Social'+user)
  if (Allsocial == null){
    Allsocial= []
  }else{
    Allsocial = JSON.parse(Allsocial)
  }

  console.log("cors activados")
  try{
    var data = await fetch(url,{ 
      method: "GET",
      mode:'cors',
    headers: new Headers({
      "Access-Control-Allow-Origin": "*"
    })
  }).then(
    response => response.json())
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
      Alljobs.push(data.jobs[i].name)
    }
    for ( i=0;i<data.social.length; i++){
      Allsocial.push(data.social[i].name)
    }
  
    await this.setDataLocalStorage(Allemails,Allnames,Allsocial,Alljobs)
  }catch(e){
    console.log("error: ",e)
  }
  
  this.setState( {names: Allnames, social:Allsocial, jobs:Alljobs, emails:Allemails, DisplayData:Allemails } )
  
  
}

//Compare element Doesnt exist
inArray (list, element) { 
  for(var i=0; i < list.length; i++) { 
      if(list[i] ===element) return true; 
  }
  return false; 
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

getInput(event) {
  this.setState({newEntry: event.target.value})
};

async SaveEmail(){
  var Entry = this.state.newEntry
  let user = this.state.user
  var Allemails = await localStorage.getItem('Emails'+user)
  if (Allemails == null){
    Allemails= []
  }else{
    Allemails = JSON.parse(Allemails)
  }
  if (!this.inArray(Allemails,Entry)) {
    Allemails.push(Entry)
  }
  this.setState( {emails:Allemails, newEntry:"", DisplayData:Allemails } )
  await localStorage.setItem('Emails'+user,JSON.stringify(Allemails));
}
async SaveJobs(){
  var Entry = this.state.newEntry
  let user = this.state.user
  var AllJobs = await localStorage.getItem('Jobs'+user)
  if (AllJobs == null){
    AllJobs= []
  }else{
    AllJobs = JSON.parse(AllJobs)
  }
  if (!this.inArray(AllJobs,Entry)) {
    AllJobs.push(Entry)
  }
  this.setState( {jobs:AllJobs, newEntry:"", DisplayData:AllJobs } )
  await localStorage.setItem('Jobs'+user,JSON.stringify(AllJobs));
}
async SaveSocial(){
  var Entry = this.state.newEntry
  let user = this.state.user
  var AllSocial = await localStorage.getItem('Social'+user)
  if (AllSocial == null){
    AllSocial= []
  }else{
    AllSocial = JSON.parse(AllSocial)
  }
  if (!this.inArray(AllSocial,Entry)) {
    AllSocial.push(Entry)
  }
  this.setState( {social:AllSocial, newEntry:"", DisplayData:AllSocial } )
  await localStorage.setItem('Social'+user,JSON.stringify(AllSocial));
}
async SaveName(){
  var Entry = this.state.newEntry
  let user = this.state.user
  var AllNames = await localStorage.getItem('Names'+user)
  if (AllNames == null){
    AllNames= []
  }else{
    AllNames = JSON.parse(AllNames)
  }
  if (!this.inArray(AllNames,Entry)) {
    AllNames.push(Entry)
  }
  this.setState( {names:AllNames, newEntry:"", DisplayData:AllNames } )
  await localStorage.setItem('Names'+user,JSON.stringify(AllNames));
}

SaveEntry(){
  var title = this.state.title
  if (title==="Email"){
    this.SaveEmail()
  }else if(title==="Names"){
    this.SaveName()
  }else if(title==="Jobs"){
    this.SaveJobs()
  }else if (title === "Social"){
    this.SaveSocial()
  }
}

logOut(){
  this.props.history.push({pathname:"/"})
}



render() {
  return(

  <div>
<div class="header">
  <h1>My Reports</h1>
  <p>A technical test for Been Verified</p>
</div>

<div class="navbar">
  <button className= {this.state.title === 'Email'? "selectedButton" : "buttonTop"}  onClick={() => this.setState({title:'Email', DisplayData:this.state.emails})}>Emails</button>
  <button className= {this.state.title === 'Names'? "selectedButton" : "buttonTop"}  onClick={() => this.setState({title:'Names', DisplayData:this.state.names})}>Names</button>
  <button className= {this.state.title === 'Social'? "selectedButton" : "buttonTop"}  onClick={() => this.setState({title:'Social', DisplayData:this.state.social})}>Social</button>
  <button className= {this.state.title === 'Jobs'? "selectedButton" : "buttonTop"}  onClick={() => this.setState({title:'Jobs', DisplayData:this.state.jobs})}>Jobs</button>
  <button onClick={() => this.logOut()} class="right">Log Out</button>
</div>

<div class="row">
  <div class="side">
    <h2 style = {{marginBottom:15}}>Make a new entry of {this.state.title}</h2>
      <div style = {{flexDirection:'row'}}>
        <input  type="text" name="newEntry" value={this.state.newEntry} onInput={this.getInput.bind(this)}  style={{marginRight:30, lineHeight:2, fontSize:20}}  />   
        <button onClick={() => this.SaveEntry()} style={{backgroundColor:" #b3b1b1", fontSize:20}}>Add</button>
      </div>
  </div>
  <div class="main">
    <table className="demo-table" >
      <thead >
      {this.returnViewHead()}
      </thead>
      <tbody >
        {this.returnView()}
      </tbody>
  	</table>
  </div>
</div>

<div class="footer">
  <h2>User: {this.state.user}</h2>
</div>
</div>
  )
}
}


export default Reports;
