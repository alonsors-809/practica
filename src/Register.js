import React, {Component} from 'react';
import './App.css';
import image from './logo1.png'

class App extends Component {

constructor(props){
    super(props)
    this.state = {
            user:'',
        password:''
    }

}
getInputUser(event) {
  this.setState({user: event.target.value})
};
getInputPass(event) {
    this.setState({password: event.target.value})
  };

async navigate(){
    //navega
    var data = await localStorage.getItem('users')
    if (data == null){
        data= []
    }else{
        data = JSON.parse(data)
    }
    
    data.push(this.state.user)
    await localStorage.setItem('users',JSON.stringify(data));
    this.props.history.push({pathname:"/"});
};
Login() {
    this.props.history.push({pathname:"/"});
    
}


render() {
    return(

        <div>
            <div class="limiter">
    <div class="container-login100">
        <div class="wrap-login100">
            <div class="login100-pic js-tilt" data-tilt>
                <img src={image} alt="IMG" />
            </div>

            <div class="login100-form validate-form">
            <span class="login100-form-title">
						Register
					</span>
                <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                    <input class="input100" type="text" name="email" placeholder="Email" onInput={this.getInputUser.bind(this)} />
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
                </div>

                <div class="wrap-input100 validate-input" data-validate="Password is required">
                    <input class="input100" type="password" name="pass" placeholder="Password" onInput={this.getInputPass.bind(this)} />
                    <span class="focus-input100"></span>
                    <span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
                </div>
                <div class="containerButtons">
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" onClick={() => this.Login()}>
                            Back
                        </button>
                    </div>

                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" onClick={() => this.navigate()}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>
        
    ) 
}
}

export default App;
