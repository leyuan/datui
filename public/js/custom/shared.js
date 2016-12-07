// FB
var config = {
  apiKey: "AIzaSyCF3MunGpmlhR_dgFgTsopUu108Zx1XpBI",
  authDomain: "datui-ea9e4.firebaseapp.com",
  databaseURL: "https://datui-ea9e4.firebaseio.com",
  storageBucket: "datui-ea9e4.appspot.com",
  messagingSenderId: "200514863768"
};
firebase.initializeApp(config);

// GA
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-86176832-1', 'auto');
ga('send', 'pageview');

function scrollToSubjects() {
  $('html, body').animate({ scrollTop: $('#scroll-to').offset().top }, 'slow');
  return false;
}

function joinDatui() {
  window.location.href="/contact.html";
}


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

  function getAllTutorSubjects(tutorList) {
    var subjects = [];
    $.each(tutorList, function(index, tutor){
      var tutorSubjects = tutor.details.courses.map(function(course) {
        return course.split(' ')[0].toUpperCase();
      });

      subjects = subjects.concat(tutorSubjects);
    });

  return _.uniq(subjects).sort();
}

function getTutorSubjects(tutor) {
  var subjects = tutor.details.courses.map(function(course) {
    return course.split(' ')[0].toLowerCase();
  });
  return _.uniq(subjects);
}

function sortOneTutorCourses(tutor) {
  if (!tutor || !tutor.details || !tutor.details.courses) return;
  return tutor.details.courses.sort();
}

function sortTutorCourses(tutorList) {
  if (!tutorList) return;
  return tutorList.map(function(tutor) {
    return tutor.details.courses.sort();
  });
}