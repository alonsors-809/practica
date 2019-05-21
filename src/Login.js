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
    //this.props.history.push('/Reports');
    this.props.history.push({pathname:"/Reports", state:{user:this.state.user}});
    //this.props.location.state.user
};
Login() {
    const Currentuser = this.state.user
    const Currentpassword = this.state.password
    if (Currentuser === 'a' && Currentpassword === 'a'){
        this.props.history.push({pathname:"/Reports", state:{user:Currentuser}});
    }
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

            <form class="login100-form validate-form">
            <span class="login100-form-title">
						Been Verified
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

                <div class="container-login100-form-btn">
                    <button class="login100-form-btn" onClick={() => this.Login()}>
                        Login
                    </button>
                </div>

                <div class="text-center p-t-12">
                    <span class="txt1">
							Forgot
						</span>
                    <a class="txt2" href="google.com">
							Username / Password?
						</a>
                </div>

                <div class="text-center p-t-136">
                    <a class="txt2" href="google.com">
							Create your Account
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
                </div>
            </form>
        </div>
    </div>
</div>
        </div>
        
    ) 
}
}

export default App;
