(function(){
  'use strict';

  new Vue({
    el: '#tutor-list',
    beforeMount() {
      var self = this;

      firebase.database().ref('/tutors').once('value').then(function(snapshot) {
        const body = snapshot.val();
        var tutorList = [];

        // Process results
        $.each(body, function (id, tutor) {
          sortOneTutorCourses(tutor);
          tutor.tid = id;
          tutorList.push(tutor);
        });


        // Save all tutors in list for later use
        self.$set(self.$data, 'allTutors', tutorList);

        // Save all tutor subject for dropdown
        self.$set(self.$data, 'subjects', getAllTutorSubjects(tutorList));

        // Filtered tutor list
        self.$set(self.$data, 'tutorList', filterTutors(tutorList));
      });

      ga('send', 'event', 'Users', 'View', 'Subject: ' + (window.location.hash.substring(1) || 'All')); // track subject
    },
    data: {
      allTutors: [],
      tutorList: [],
      subjects: [],
      selected: window.location.hash.substring(1) || 'All'
    },
    methods: {
      doFilterTutor(event) {
        var selectedCourse = this._data.selected;
        var tutorList = filterTutors(this._data.allTutors, selectedCourse);
        this.$set(this._data, 'tutorList', tutorList);

        ga('send', 'event', 'Users', 'View', 'Subject: ' + selectedCourse); // track subject
      }
    }
  });

})();
