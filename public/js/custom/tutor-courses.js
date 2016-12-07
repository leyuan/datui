(function(){
  'use strict';

  new Vue({
    el: '#tutor-subjects',
    beforeMount() {
      var self = this;
      
      firebase.database().ref('/tutors').once('value').then(function(snapshot) {
        var tutorList = snapshot.val();
        var allSubjects = getAllTutorSubjects(tutorList);
        var tutorSubjectsViewModel = allSubjects.map(function(subject) {
            return {
              name: subject,
              link: "teachers-list.html#"+subject
            };
        });

        self.$set(self.$data, 'subjects', tutorSubjectsViewModel);
      });
    },
    data: {
      subjects: [],
    },
  });

})();
