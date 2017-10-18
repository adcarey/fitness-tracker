
import { Meteor } from 'meteor/meteor';


import React from 'react';
import { Component } from 'react';
import { browserHistory } from 'react-router';


import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';


import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import SelectWorkoutButton from '../components/SelectWorkoutButton';


import style from '../../../client/styles.js';



class SelectWorkout extends Component {

  constructor(props) {
    super(props);
    this.state = {workouts: [], routineName: ''}
  }


  componentWillMount(){

    Meteor.call('getCurrentRoutine', function(err, res){

   
      this.setState({routineName: res.routineName})


      Meteor.call('getWorkoutOptions', res.routine_id, function(err, res){

        
        this.setState({workouts: res});

      }.bind(this));
      
    }.bind(this));
    
  }


  _selectWorkout(workoutObj){

    for(var i=0; i < workoutObj.exercises.length; i++){
      workoutObj.exercises[i]['currentWorkoutWeights'] = [];
      workoutObj.exercises[i]['prevWorkoutWeights'] = [];
    }

   
    browserHistory.push({ 
      pathname: '/workout/log',
      query: {workoutObj: JSON.stringify(workoutObj), routineName: this.state.routineName}
    }); 

  }

  _reRouteToCreate(){
    
    browserHistory.push({ 
      pathname: '/workout/create'
    });
  }

  _cancelSelection(){
    
    browserHistory.push({ 
      pathname: '/dashboard'
    });
  }


  render() {
    return (
      <Container>

        {/* List of Excerises */}
        <Row>
          <Card>
            <CardHeader style={style.selectTitle}>
              <h2>Select a Workout</h2>
            </CardHeader>
            <center>
              {/* ++++++++++ ITERATE OVER WORKOUT SELECTIONS ++++++++++ */}
              {this.state.workouts.map(function(search, i) {
                    return (
                        <SelectWorkoutButton
                          key={"workout-" + i}
                          _workoutName={search.workoutName}
                          _workoutObj={search}
                          _selectWorkout={this._selectWorkout.bind(this)}
                        />
                    );
                  }.bind(this))}
              {/* ++++++++++++++++++++++++++++++++++++++++++++ */}
              <br />
              <RaisedButton secondary={true} label="Create new Routine" onClick={this._reRouteToCreate.bind(this)} />
              <br /><br />
            </center>
          </Card>
        </Row>

        <br />
        {/* Submit or Cancel Form Submisson */}
        {/* This will need a way to collect all the data from the forms above and then hit an api on the backend */}
        {/* Maybe add a confirmation modal too... Create this workout? You will not be able to edit after this */}
        <Row>
          <center>
            <Row>
              <RaisedButton label="Cancel" onClick={this._cancelSelection.bind(this)} />
            </Row>
          </center>
        </Row>

      </Container>
    );
  }

};

export default SelectWorkout;

