import React, {Component} from 'react';
import './App.css';
import image from './logo.png'

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

navigate(){
    //navega
    this.props.history.push({pathname:"/Reports", state:{user:this.state.user}});
};
async Login() {
    var data = await localStorage.getItem('users',)
    if (data == null){
        data= []
    }else{
        data = JSON.parse(data)
    }

    const Currentuser = this.state.user
    const Currentpassword = this.state.password
    for(var i = 0 ; i <data.length; i++) { 
        if (Currentuser === data[i] && Currentpassword === 'BV-API-Challenge'){
            this.props.history.push({pathname:"/Reports", state:{user:Currentuser}});
        }
     
    }
    
}
goToRegister(){
    this.props.history.push({pathname:"/Register"})
}

async componentWillMount(){
    //localStorage.clear();

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
						Login
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
                        <button class="login100-form-btn" onClick={() => this.goToRegister()}>
                            Register
                        </button>
                    </div>

                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" onClick={() => this.Login()}>
                            Login
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
