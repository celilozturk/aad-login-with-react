import { Component } from 'react';
import './App.css';
import {config} from './Config';
import { PublicClientApplication } from '@azure/msal-browser';

class App extends Component {

  constructor(props) {
    // const [userAccount,setUserAccount]=useState();

    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      user: {}
    };
    this.userAccount={
      user:{}
    };

    this.login = this.login.bind(this)
    this.PublicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectUri,
        authority: config.authority
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
      }
    });
  }
  async login(){

    try{
      await this.PublicClientApplication.loginPopup({
        scopes:config.scopes,
        prompt:"select_account",

        // redirectUri:"http://localhost:3000/blank.html"


      }).then((response)=>{
        this.PublicClientApplication.setActiveAccount(response.account);
      });

  //    console.log(this.PublicClientApplication.getAllAccounts().map((x)=>(x.name)))
       this.userAccount.user= this.PublicClientApplication.getActiveAccount();
      this.state.user= this.PublicClientApplication.getActiveAccount();
      console.log(this.userAccount.user);
   //   console.log(this.PublicClientApplication.getActiveAccount())
      this.setState({isAuthenticated:true})
    }
    catch(err){
      this.setState({
        isAuthenticated:false,
        user:{},
        error:err
      });
    }


  }
  logout(){
    this.PublicClientApplication.logout();
  }

  render(){

    return (
      <div className='App'>
        <header className='header'>
          {
          this.state.isAuthenticated ? <p >Successfully logged in <strong> {this.userAccount.user.username}</strong></p> :
          <p>
            <button onClick={()=>this.login()} >Login </button>
          </p>
          }

        </header>
      </div>
    )
  }



}

export default App;
