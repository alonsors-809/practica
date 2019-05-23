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
  console.log("emails stores: ", Allemails)
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

async SaveEmail(Entry){
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

SaveEntry(){
  var Entry = this.state.newEntry
  this.SaveEmail(Entry)
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
</div>

<div class="row">
  <div class="side">
    <h2 style = {{marginBottom:15}}>Make a new entry of {this.state.title}</h2>
      <div style = {{flexDirection:'row'}}>
        <input  type="text" name="newEntry" onInput={this.getInput.bind(this)}  style={{marginRight:30, lineHeight:2, fontSize:20}}  />   
        <button onClick={() => this.SaveEntry()} style={{backgroundColor:" #b3b1b1", fontSize:20}}>Ingresar</button>
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
  <h2>Footer</h2>
</div>
</div>
  )
}
}


export default Reports;
