import React from 'react';
import db from '../db';
import firebase from 'firebase';

export default class StopList extends React.Component {
  state = {
    groupStops: []
  }

  handleStopClick = (e) => {
    this.addStop(e.target.dataset.id)
  }

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;

    this.unsubscribe = db
      .collection('users')
      .doc(uid)
      .collection('groups')
      .doc(this.props.selectedGroupId)
      .collection('stops')
      .where('busRouteId', '==', this.props.busRouteId)
      .onSnapshot(snapshot => {
        this.setState({ groupStops: snapshot.docs },
          () => this.setGroupStops());
      });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  addStop = (e) => {
    console.log('crud')
    const uid = firebase.auth().currentUser.uid;
    const { selectedGroupId } = this.props;
    db
      .collection('users')
      .doc(uid)
      .collection('groups')
      .doc(selectedGroupId)
      .collection('stops')
      .add({
        stopId: e.target.dataset.id,
        busRouteId: this.props.busRouteId
      }).then(() => {
        console.log('stop added')
      })
  }

  removeStop = (e) => {
    console.log('remove stop')
    const uid = firebase.auth().currentUser.uid;
    const { selectedGroupId } = this.props;
    const stop = this.state.groupStops.find(
      stop => ( stop.data().stopId === e.target.dataset.id && stop.data().busRouteId === this.props.busRouteId) )
    console.log(stop.id)
    db
      .collection('users')
      .doc(uid)
      .collection('groups')
      .doc(selectedGroupId)
      .collection('stops')
      .doc(stop.id)
      .delete();
  }

  // TODO: delete
  setGroupStops = () => {
    console.log('setGroupStops')
  }

  stopsArray = () => {
    const groupStops = this.state.groupStops.map(stop => ( stop.data().stopId ));
    console.log(groupStops)
    return this.props.stopsForDirection
  }

  render() {
    const groupStops = this.state.groupStops.map(stop => ( stop.data().stopId ));

    return (
      <div>
        <p>Stops</p>
        <ul>
          { this.props.stopsForDirection.map((stop, i) => (
            <li
              className={groupStops.includes(stop.id) ? 'selected' : null}
              onClick={groupStops.includes(stop.id) ? this.removeStop : this.addStop}
              key={`stop-${i}`}
              data-id={stop.id}>{stop.name}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}
