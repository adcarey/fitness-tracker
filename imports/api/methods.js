import { Meteor } from 'meteor/meteor';

Meteor.methods({

 
  addUser() {
    UserProfile.insert({
      user_id: Meteor.user()._id,
      routines: [],
      currentRoutine: '',
      age: '',
      weight: '',
      height: ''
    }, function(err, res) {
      if (err) {throw err}
    })
  },


  updateUser(data) {
    UserProfile.update({ user_id: Meteor.userId() }, 
      {$set: { age: data.age,
        weight: data.weight,
        height: data.height,
        currentRoutine: data.currentRoutine }}
        )
  },


  addRoutine(data) {
    var workouts = data.workouts;

    Routine.insert({
      routineName: data.routineName,
      user_id: Meteor.userId()
    }, function(err, res) {
      if (err) {throw err}

   
      for (var i=0; i<workouts.length; i++) {
        Workout.insert({
          workoutName: workouts[i].workoutName,
          exercises: workouts[i].exercises,
          routine_id: res
        })
      }

      UserProfile.update(
        { user_id: Meteor.userId() },
        { $push: { routines: res }, $set: {currentRoutine: res }}
      )

    
    });
  },

  
  logWorkout(data) {
    LoggedWorkout.insert({
      user_id: Meteor.user()._id,
      workout_id: data.workout_id,
      date: data.date,
      log: data.log
    })
  },

  
    return currentUser.routines;
  },

  getRoutineNames(routines) {
    var routineNames = [];
    for (var i=0; i<routines.length; i++) {
      routineNames.push(Routine.findOne({ _id: routines[i] }).routineName);
    }
    return routineNames;
  },

  
  getCurrentRoutine() {
    var currentUser = UserProfile.find({ user_id: Meteor.userId() }).fetch();
    var routine_id = currentUser[0].currentRoutine;
    var routineName = Routine.find({ _id: routine_id }).fetch();
    return { routine_id: routine_id, routineName: routineName[0].routineName };
  },

  
  setCurrentRoutine(data) {
    console.log(data);
    UserProfile.update(
      { user_id: Meteor.userId() },
      { $set: {currentRoutine: data }}
    )
  },

  
  getWorkoutOptions(data) {
    var workouts = Workout.find({ routine_id: data }).fetch();
    return workouts;
  },

  getPreviousWorkoutLog(workout) {
    return LoggedWorkout.findOne({ user_id: Meteor.userId(), workout_id: workout }, { sort: { date: -1 } }).log;
  },

  getRoutineObjects(){
    return Routine.find({user_id: Meteor.userId()}).fetch();
  },

  
  getWorkoutLogs(workout) {
    return LoggedWorkout.find({ user_id: Meteor.userId(), workout_id: workout }, { sort: { date: 1 } }).fetch();
  },

  getWorkoutName(data) {
    return Workout.findOne({ _id: data }).workoutName
  },
  
  getRoutineName(routineId){
    var routine = Routine.findOne({_id: routineId})
    return routine.routineName;
  },

  getPersonalInfo(){
    var user =  UserProfile.findOne({user_id: Meteor.userId()});
    console.log(user); 
    return user;
  }

})