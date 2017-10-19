import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { getFirebase } from 'react-redux-firebase';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontAwesome from 'react-fontawesome';
import CircularProgress from 'material-ui/CircularProgress';
import { compose } from 'redux';
import {
   firebaseConnect,
   isLoaded,
   isEmpty,
   dataToJS,
   pathToJS
 } from 'react-redux-firebase';


class Home extends React.Component {
    constructor(props){
     super(props);
    }

    login(provider) {
        const firebase = getFirebase();
        firebase.login({
           provider: provider,
           type: 'redirect'
         })

    }
    logout(){
         const firebase = getFirebase();
         firebase.logout()
    }
    render() {
        const { auth, profile } = this.props;
        console.log("HOME AUTH", profile )
        return (
            <div>
                {
                    (!isLoaded(profile))?(<div className = "load"><CircularProgress size={80} thickness={5} /></div>):(
                        (!profile)?(<div className="text-center">
                                        <h4>Login options:</h4>
                                        <RaisedButton primary={true} className="logButton" label='facebook'  onClick={()=> this.login('facebook')}/>
                                        <RaisedButton primary={true} className="logButton" label='google'  onClick={()=> this.login('google')}/>
                                        <RaisedButton primary={true} style={{backgroundColor:'red'}} className="logButton" label='tweeter'  onClick={()=> this.login('twitter')}/>
                                        <RaisedButton primary={true} className="logButton" label='github'  onClick={()=> this.login('github')} />
                                    </div>
                                ) :(
                        <div className="text-center">
                            <h4>Hi, { profile&&profile.displayName}</h4>
                            <img src = {profile.avatarUrl} />
                            <div>
                                <RaisedButton primary={true} className="logButton"  label={'Logout from '+ profile.providerData[0].providerId}  onClick={this.logout}/>
                            </div>
                        </div>
                        )
                    )

                }




            </div>
        );
    }
}

export default compose(
  firebaseConnect(),
  connect(
    (state) => ({
        auth: pathToJS(state.firebase, 'auth'), // in v2 todos: state.firebase.auth
        authError: pathToJS(state.firebase, 'authError'),
        profile: pathToJS(state.firebase, 'profile')
    })
  )
)(Home)
