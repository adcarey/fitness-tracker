
import { Meteor } from 'meteor/meteor';


import React from 'react';
import { Component } from 'react';
import { browserHistory } from 'react-router';


import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';


import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
  

import AddRoutineName from '../components/AddRoutineName';
import AddWorkoutPrimary from '../components/AddWorkoutPrimary';
import AddWorkoutSecondary from '../components/AddWorkoutSecondary';
import Store from '../../reducers/index';
import setSnackBar from '../../actions/snackbar.js';




class CreateWorkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routineName: "",
      workouts: [
        {
          workoutName: "",
          exercises: [
            {
              exerciseName: "",
              exerciseUnit: 1,
              reps: [""]
            }
          ]
        }
      ]
    };
  }

  _changeRoutineName(value){
    this.setState({routineName: value});
    
  }

  _addAnotherWorkout(){

 
    let workoutsArray = this.state.workouts;

    
    workoutsArray.push(
      {
        workoutName: "",
        exercises: [
          {
            exerciseName: "",
            exerciseUnit: 1,
            reps: [""]
          }
        ]
      }
    );

   
    this.setState({workouts: workoutsArray});

  }

  _removeSelectedWorkout(iOfWorkout){

   

    this.setState((prevState) => ({
      workouts: prevState.workouts.filter((_, i) => i !== iOfWorkout)
    }));

  }


  _editWorkoutName(iOfWorkout, nameOfWorkout){
   
    let workoutsArray = this.state.workouts;

   
    workoutsArray[iOfWorkout].workoutName = nameOfWorkout;

   
    this.setState({workouts: workoutsArray});

  }


  _addAnotherExercise(iOfWorkout){
   
    let workoutsArray = this.state.workouts;

    
    workoutsArray[iOfWorkout].exercises.push(
      {
        exerciseName: "",
        exerciseUnit: 1,
        reps: [""]
      }
    );

    
    this.setState({workouts: workoutsArray});
    
  }

  _removeSelectedExercise(iOfWorkout, iOfExercise){

   
    let workoutsArray = this.state.workouts;

    
    workoutsArray[iOfWorkout].exercises.splice(iOfExercise, 1);

    
    this.setState({workouts: workoutsArray});

    console.log('Delete Exercise: ' + iOfExercise + ' in Workout: ' + iOfWorkout)

  }

  _editExerciseName(iOfWorkout, iOfExercise, nameOfExercise){
    
    let workoutsArray = this.state.workouts;

   
    workoutsArray[iOfWorkout].exercises[iOfExercise].exerciseName = nameOfExercise;

    
    this.setState({workouts: workoutsArray});

  }

  _editExerciseUnits(iOfWorkout, iOfExercise, unitsOfExercise){
    
    let workoutsArray = this.state.workouts;

    
    workoutsArray[iOfWorkout].exercises[iOfExercise].exerciseUnit = unitsOfExercise;

    
    this.setState({workouts: workoutsArray});

  }


  _addAnotherRep(iOfWorkout, iOfExercise){
    
    let workoutsArray = this.state.workouts;

   
    workoutsArray[iOfWorkout].exercises[iOfExercise].reps.push("");

    
    this.setState({workouts: workoutsArray});

  }

  _removeLastRep(iOfWorkout, iOfExercise){
    
    let workoutsArray = this.state.workouts;

    
    let repArrayLength = workoutsArray[iOfWorkout].exercises[iOfExercise].reps.length;
    if(repArrayLength > 1){
      workoutsArray[iOfWorkout].exercises[iOfExercise].reps.splice(-1,1);
    }

   
    this.setState({workouts: workoutsArray});

  }

  _editNumberOfReps(iOfWorkout, iOfExercise, iOfRep, numberOfReps){
   
    let workoutsArray = this.state.workouts;

    
    workoutsArray[iOfWorkout].exercises[iOfExercise].reps[iOfRep] = numberOfReps;

    
    this.setState({workouts: workoutsArray});

  }


  _uploadRoutine(event, index, value){
   
    Meteor.call('addRoutine', this.state, function(err, res){

      if(err){
        Store.dispatch(setSnackBar(true, 'Error. Routine could not be uploaded.', '#F44336'));
      }
      else{
        
        Store.dispatch(setSnackBar(true, 'Routine created successfully.', '#4CAF50'));
        
        browserHistory.push({ 
          pathname: '/dashboard'
        });  
      }

    });

  }

  _cancelRoutine(event, index, value){

    browserHistory.push({ 
      pathname: '/dashboard'
    });
  }

  render() {

    return (
      <Container>


        {/* Name the Routine */}
        <Row>
          <AddRoutineName _changeRoutineName={this._changeRoutineName.bind(this)} />
        </Row>


        <br />


        {/* Name the Workout(s) */}
        <Row>
          <Card>
            <CardText>

              {/* ++++++++++ ITERATE OVER WORKOUTS ++++++++++ */}
              {this.state.workouts.map(function(search, i) {
                
                
                if(i==0){
                  return (
                    <div key={"workout-"+i}>
                      <AddWorkoutPrimary
                        _submissionObject={this.state}
                        _iOfWorkout={i}

                        _addAnotherWorkout={this._addAnotherWorkout.bind(this)}
                        _editWorkoutName={this._editWorkoutName.bind(this)}
                        _workoutName={this.state.workouts[i].workoutName}

                        _addAnotherExercise={this._addAnotherExercise.bind(this)}
                        _removeSelectedExercise={this._removeSelectedExercise.bind(this)}
                        _editExerciseName={this._editExerciseName.bind(this)}
                        _editExerciseUnits={this._editExerciseUnits.bind(this)}

                        _addAnotherRep={this._addAnotherRep.bind(this)}
                        _removeLastRep={this._removeLastRep.bind(this)}
                        _editNumberOfReps={this._editNumberOfReps.bind(this)}
                      />
                    </div>
                  );
                }
                
                else{
                  return (
                    <div key={"workout-"+i}>
                      <br/>
                      <AddWorkoutSecondary
                        _submissionObject={this.state}
                        _iOfWorkout={i}

                        _removeSelectedWorkout={this._removeSelectedWorkout.bind(this)}
                        _editWorkoutName={this._editWorkoutName.bind(this)}
                        _workoutName={this.state.workouts[i].workoutName}

                        _addAnotherExercise={this._addAnotherExercise.bind(this)}
                        _removeSelectedExercise={this._removeSelectedExercise.bind(this)}
                        _editExerciseName={this._editExerciseName.bind(this)}
                        _editExerciseUnits={this._editExerciseUnits.bind(this)}

                        _addAnotherRep={this._addAnotherRep.bind(this)}
                        _removeLastRep={this._removeLastRep.bind(this)}
                        _editNumberOfReps={this._editNumberOfReps.bind(this)}
                      />
                    </div>
                  );
                }

              }.bind(this))}
              {/* +++++++++++++++++++++++++++++++++++++++++++ */}

            </CardText>
          </Card>
        </Row>
        

        <br/>


        {/* Submit or Cancel Form Submisson */}
        {/* This will need a way to collect all the data from the forms above and then hit an api on the backend */}
        {/* Maybe add a confirmation modal too... Create this workout? You will not be able to edit after this */}
        <Row>
          <center>
            <Row>
              <RaisedButton label="Submit" primary={true} onClick={this._uploadRoutine.bind(this)} />
              <span> </span>
              <RaisedButton label="Cancel" onClick={this._cancelRoutine.bind(this)} />
            </Row>
          </center>
        </Row>


      </Container>
    );
  }
}

export default CreateWorkout;


