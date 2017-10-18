
import React from 'react';
import { Component } from 'react';


import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';


import UnitsDropDownMenu from '../components/UnitsDropDownMenu';
import AddRepPrimary from '../components/AddRepPrimary';
import AddRepSecondary from '../components/AddRepSecondary';


import style from '../../../client/styles.js';



class AddExercisePrimary extends Component {

  constructor(props) {
    super(props);
  }

  _handleChange(event, index, value){
   
    this.props._editExerciseName(this.props._iOfWorkout, this.props._iOfExercise, event.target.value);
  }

  _handleClick(){
    
    this.props._addAnotherExercise(this.props._iOfWorkout);
  }

  render(){
    return(
      <Card>
        <CardHeader
          actAsExpander={false}
          showExpandableButton={true}
          avatar={<FloatingActionButton onClick={this._handleClick.bind(this)} secondary={false} mini={true}><ContentAdd/></FloatingActionButton>}
          title={
            <Container>
              <TextField
                onChange={this._handleChange.bind(this)}
                value={this.props._exerciseName}
                floatingLabelText="Excercise Name"
                hintText="Bench Press"
                fullWidth={true}
              />
              <UnitsDropDownMenu
                _submissionObject={this.props._submissionObject}

                _iOfWorkout={this.props._iOfWorkout}
                _iOfExercise={this.props._iOfExercise}
                
                _editExerciseUnits={this.props._editExerciseUnits.bind(this)}
              />
            </Container>
          }
        />
        <CardText expandable={true}>
          <Container>

            {/* ++++++++++ ITERATE OVER REPS ++++++++++ */}
            {this.props._submissionObject.workouts[this.props._iOfWorkout].exercises[this.props._iOfExercise].reps.map(function(search, i) {

              
              if(i==0){
                return (
                  <div key={"workout-" + this.props._iOfWorkout + "-excercise-" + this.props._iOfExercise + "-rep-" + i} >
                    <AddRepPrimary
                      _iOfWorkout={this.props._iOfWorkout}
                      _iOfExercise={this.props._iOfExercise}
                      _iOfRep={i}

                      _addAnotherRep={this.props._addAnotherRep.bind(this)}
                      _removeLastRep={this.props._removeLastRep.bind(this)}
                      _editNumberOfReps={this.props._editNumberOfReps.bind(this)}
                      _numberOfReps={search}
                    />
                  </div>
                );
              }

              
              else{
                return(
                  <div key={"workout-" + this.props._iOfWorkout + "-excercise-" + this.props._iOfExercise + "-rep-" + i}>
                    
                    <AddRepSecondary
                      _iOfWorkout={this.props._iOfWorkout}
                      _iOfExercise={this.props._iOfExercise}
                      _iOfRep={i}

                      _editNumberOfReps={this.props._editNumberOfReps.bind(this)}
                      _numberOfReps={search}
                    />
                  </div>
                );
              }

            }.bind(this))}
            {/* +++++++++++++++++++++++++++++++++++++++++++ */}

          </Container>
        </CardText>
      </Card>
    )
  }
}


export default AddExercisePrimary;                          