(function(){
  'use strict';

  var COOKIE_NAME = 'doNotCheatPlz';

  /**
   * Tutor Keys are
   * {name, phone, email, courses, avatar, intro}
   */
  new Vue({
    el: '#tutor-info',
    beforeMount() {
      var self = this;
      var tutorId = location.hash.substring(1); // get rid of the # character
      var tutorRef = firebase.database().ref('tutors/' + tutorId).once('value').then(function(snapshot){
        var tutorObj = snapshot.val();

        if(tutorObj && tutorObj.details){
          self.$set(self.$data, 'tutor', tutorObj.details);
          ga('send', 'event', 'Users', 'View', tutorObj.details.name);
        }
      });
    },
    data: {
      tutor: {},
      userEmail: ''
    },
  });
})();

