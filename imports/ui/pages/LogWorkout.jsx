
import React from 'react';
import { Component } from 'react';
import { browserHistory } from 'react-router';


import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';


import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';


import LogWorkoutDate from '../components/LogWorkoutDate';
import LogExercise from '../components/LogExercise';
import Store from '../../reducers/index';
import setSnackBar from '../../actions/snackbar.js';




class LogWorkout extends Component {

  constructor(props) {
    super(props);

  
    this.state = {
      routineName: "",
      workoutName: "",
      workoutId: "",
      exercises: [],
      currentWorkoutDate: new Date()

    };
  }


  componentWillMount(){

  
    if(this.props.location.query.workoutObj == null){
      browserHistory.push({ 
        pathname: '/workout/select'
      });
    }
    else{


      let workoutObj = JSON.parse(this.props.location.query.workoutObj);
      let exercisesNew = workoutObj.exercises;

    
      this.setState({exercises: exercisesNew});
      this.setState({workoutName: workoutObj.workoutName});
      this.setState({workoutId: workoutObj._id});

   
      this.setState({routineName: this.props.location.query.routineName});

      Meteor.call('getPreviousWorkoutLog', workoutObj._id, function(err, res){

        if(res){
          
          let exercisesArray = this.state.exercises;

          
          for(let i=0; i < res.length; i++){
            for(let j=0; j < res[i].weights.length; j++){
             
              let prevRepWeight = res[i].weights[j];
              exercisesArray[i].prevWorkoutWeights.push(prevRepWeight); 
            }
          }
          
          this.setState({exercises: exercisesArray});
        }

      }.bind(this));

    }

  }

  componentDidMount(){
    
    let exercisesArray = this.state.exercises;
    for(let i=0; i < exercisesArray.length; i++){
      for(let j=0; j < exercisesArray[i].reps.length; j++){
        exercisesArray[i].currentWorkoutWeights.push("");
      }
    } 
    
    this.setState({exercises: exercisesArray});
  }


  _editCurrentWorkoutDate(date){
   
    this.setState({currentWorkoutDate: date});
  }


  _editCurrentWorkoutRepWeight(iOfExercise, iOfRep, weight){
    
    let exercisesArray = this.state.exercises;
    
    exercisesArray[iOfExercise].currentWorkoutWeights[iOfRep] = weight;
   
    this.setState({exercises: exercisesArray});
  }


  _uploadWorkout(event, index, value){

    let currentLog = [];

   
    for(let i=0; i<this.state.exercises.length; i++){

      
      let logThisEx = {
        exerciseName: this.state.exercises[i].exerciseName,
        weights: this.state.exercises[i].currentWorkoutWeights

      }

      
      currentLog.push(logThisEx)
    }
    

    
    let data = {
      workout_id: this.state.workoutId,
      date: this.state.currentWorkoutDate,
      log: currentLog
    }

  
    Meteor.call('logWorkout', data, function(err, res){

      if(err){
        Store.dispatch(setSnackBar(true, 'Error. Workout could not be logged!', '#F44336'));
      }
      else{
     
        Store.dispatch(setSnackBar(true, 'Workout logged successfully.', '#4CAF50'));
      
        browserHistory.push({ 
          pathname: '/dashboard'
        });  
      }

    });



  }


  _cancelWorkout(){
  
    browserHistory.push({ 
      pathname: '/dashboard'
    });
  }


  render() {
    return (
      <Container>

        {/* Title with Date Picker */}
        <Row>
          <LogWorkoutDate
            _routineName={this.state.routineName}
            _workoutName={this.state.workoutName}

            _editCurrentWorkoutDate={this._editCurrentWorkoutDate.bind(this)}
          />
        </Row>


        {/* List of Excerises */}
        <Row>

          {/* ++++++++++ ITERATE OVER EXERCISES ++++++++++ */}
          {this.state.exercises.map(function(search, i) {

            return (
              <div key={"routine-" + this.state.routineName + "-workout-" + this.state.workoutName + "-exercise-" + i} >
                <br/>
                <LogExercise
                  _routineId={this.state.routineName}
                  _workoutId={this.state.workoutName}

                  _exerciseId={i}
                  _exerciseName={search.exerciseName}
                  _exerciseUnit={search.exerciseUnit}

                  _repArray={search.reps}
                  _currentWorkoutWeights={search.currentWorkoutWeights}
                  _prevWorkoutWeightsArray={search.prevWorkoutWeights}

                  _editCurrentWorkoutRepWeight={this._editCurrentWorkoutRepWeight.bind(this)}
                />
              </div>
            );

          }.bind(this))}
          {/* ++++++++++++++++++++++++++++++++++++++++++++ */}

        </Row>

        <br />
        {/* Submit or Cancel Form Submisson */}
        {/* This will need a way to collect all the data from the forms above and then hit an api on the backend */}
        {/* Maybe add a confirmation modal too... Create this workout? You will not be able to edit after this */}
        <Row>
          <center>
            <Row>
              <RaisedButton label="Submit" primary={true} onClick={this._uploadWorkout.bind(this)} />
              <span> </span>
              <RaisedButton label="Cancel" onClick={this._cancelWorkout.bind(this)} />
            </Row>
          </center>
        </Row>

      </Container>
    );
  }

};

export default LogWorkout;

