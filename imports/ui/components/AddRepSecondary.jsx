
import React from 'react';
import { Component } from 'react';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';



class AddRepSecondary extends Component {

  constructor(props) {
    super(props);
  }

  _handleChange(event, index, value){
    
    this.props._editNumberOfReps(this.props._iOfWorkout, this.props._iOfExercise, this.props._iOfRep, event.target.value);
  }

  render(){
    return(
      <Card>
        <CardHeader
          title={
            <TextField
              onChange={this._handleChange.bind(this)}
              value={this.props._numberOfReps}
              floatingLabelText={"Reps for Set " + (this.props._iOfRep + 1)}
              type="number"
              min="0"
              hintText="10"
              fullWidth={true}
            />
          }
        />
      </Card>
    )
  }
}


export default AddRepSecondary;