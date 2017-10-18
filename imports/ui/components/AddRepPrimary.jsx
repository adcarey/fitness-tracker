
import React from 'react';
import { Component } from 'react';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';


import style from '../../../client/styles.js';


class AddRepPrimary extends Component {

  constructor(props) {
    super(props);
  }

  _handleChange(event, index, value){
    
    this.props._editNumberOfReps(this.props._iOfWorkout, this.props._iOfExercise, this.props._iOfRep, event.target.value);
  }

  _handleAddClick(){
    
    this.props._addAnotherRep(this.props._iOfWorkout, this.props._iOfExercise);
  }

  _handleRemoveClick(){
    this.props._removeLastRep(this.props._iOfWorkout, this.props._iOfExercise);
  }

  render(){
    return(
      <Card>
        <CardHeader
          avatar={
            <div>
              <FloatingActionButton onClick={this._handleAddClick.bind(this)} secondary={false} mini={true}><ContentAdd/></FloatingActionButton>
              <i> </i>
              <FloatingActionButton onClick={this._handleRemoveClick.bind(this)} secondary={true} mini={true}><ContentRemove/></FloatingActionButton>
              <i> </i>
            </div>
          }
          subtitle={
            <TextField
              onChange={this._handleChange.bind(this)}
              value={this.props._numberOfReps}
              floatingLabelText={"Reps for Set " + (this.props._iOfRep + 1)}
              type="number"
              min="0"
              hintText="15"
              fullWidth={true}
            />
          }
          title={<div style={style.addRepComponentStyle}><i> Please leave the Reps field empty if you plan to Lift Until Failure (xf) </i> </div>}
        />
      </Card>
    )
  }
}


export default AddRepPrimary;