import React from 'react';
import firebase from 'firebase';

export default class Dashboard extends React.Component {
  fetchTestDatas = function () {
    fetch('/api/v1/routes')
      .then(res => res.json())
      .then((response) => { console.log("Test datas response", response); })
      .catch((error) => { console.log("Error while fetching test datas", error); })
  }

  render() {
    console.log('hello', firebase.auth().currentUser, firebase.auth().currentUser.uid);
    const { uid, displayName, email } = firebase.auth().currentUser;
    return (
      <div>
        <button onClick={this.fetchTestDatas}>
          Fetch Test Datas
        </button>
      </div>
    )
  }
}
