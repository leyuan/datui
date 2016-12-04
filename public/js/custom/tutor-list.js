var config = {
  apiKey: "AIzaSyCF3MunGpmlhR_dgFgTsopUu108Zx1XpBI",
  authDomain: "datui-ea9e4.firebaseapp.com",
  databaseURL: "https://datui-ea9e4.firebaseio.com",
  storageBucket: "datui-ea9e4.appspot.com",
  messagingSenderId: "200514863768"
};
firebase.initializeApp(config);

new Vue({
  el: '#tutor-list',
  beforeMount() {
    var url = `${window.location.origin}/api/tutors`;
    var self = this;
    firebase.database().ref('/tutors').once('value').then(function(snapshot) {
      const body = snapshot.val();
      var tutorList = [];
      $.each(body, function (id, tutor) {
        tutor.tid = id;
        tutorList.push(tutor);
      });

      tutorList = filterTutors(tutorList);
      self.$set(self.$data, 'tutorList', tutorList);
    });

    var fetch_subject_url = `${window.location.origin}/api/subjects`;
    this.$http.get(fetch_subject_url).then(function(res) {
      if (res.body) {
        var body = JSON.parse(res.body);
        this.$set(this.$data, 'subjects', body.subjects.sort());
      }
    });

    ga('send', 'event', 'Users', 'View', 'Subject: ' + (window.location.hash.substring(1) || 'All')); // track subject
  },
  data: {
    tutorResponseBody: [],
    tutorList: [],
    subjects: [],
    selected: window.location.hash.substring(1) || 'All'
  },
  methods: {
    doThis(event) {
      var selectedCourse = this._data.selected;
      var body = this._data.tutorResponseBody;
      var tutorList = filterTutors(body, selectedCourse);
      this.$set(this._data, 'tutorList', tutorList);

      ga('send', 'event', 'Users', 'View', 'Subject: ' + selectedCourse); // track subject
    }
  }
});

function filterTutors(tutorList, course) {
  var selectedCourse = course || window.location.hash.substring(1) || '';

  return tutorList.filter(function(stub) {
    stub["link"] = `teachers-profile.html#${stub.tid}`;
    var tutor = stub;
    var tutorSubjects = getTutorSubjects(tutor);

    if (selectedCourse === '' || selectedCourse === 'All') {
      return true;
    }
    return tutorSubjects.indexOf(selectedCourse.toLowerCase()) >= 0;
  });
}

function getTutorSubjects(tutor) {
  var subjects = tutor.details.courses.map(function(course) {
    return course.split(' ')[0].toLowerCase();
  });
  return _.uniq(subjects);
}

function sortTutorCourses(tutorList) {
  if (!tutorList) return;
  return tutorList.map(function(tutor) {
    return tutor.source.courses.sort();
  });
}
