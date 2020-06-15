import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import Header from './Header';

export default class Home extends React.Component {
  state = {
    isSignedIn: false,
    selectedGroupId: '',
    admin: false
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
  }

  componentDidMount() {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        user => {
          this.setState({ isSignedIn: !!user });
        }
      );
    }

    componentWillUnmount() {
      if (this.unregisterAuthObserver) {
        this.unregisterAuthObserver();
      }
    }

  signOut = () => {
    firebase.auth().signOut();
  }

  handleGroupClick = (tabId) => {
    if (tabId === 'admin') {
      this.setState({
        admin: true,
        selectedGroupId: ''
      })
    } else {
      this.setState({
        admin: false,
        selectedGroupId: tabId
      })
    }
  }

  render() {
    return (
      <div>
        <Header
          isSignedIn={this.state.isSignedIn}
          signOut={this.signOut}
        >
        </Header>
        <Navigation
          isSignedIn={this.state.isSignedIn}
          signOut={this.signOut}
          handleGroupClick={this.handleGroupClick}
          admin={this.state.admin}
          selectedGroupId={this.state.selectedGroupId}>
        </Navigation>
        { this.state.isSignedIn
          ? <Dashboard
              admin={this.state.admin}
              selectedGroupId={this.state.selectedGroupId}
            >
            </Dashboard>
          : <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            >
            </StyledFirebaseAuth>
        }
      </div>
    )
  }
}
