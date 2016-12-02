var COOKIE_NAME = 'doNotCheatPlz';

/**
 * Tutor Keys are
 * {name, phone, email, courses, avatar, intro}
 */
new Vue({
  el: '#tutor-info',
  beforeMount() {
    var tutorId = location.hash.substring(1); // get rid of the # character
    var url = `/api/tutor/${tutorId}`;
    this.$http.get(url).then(function (res) {
      if (res.body) {
          var tutor = JSON.parse(res.body);
          tutor.courses.sort();
        this.$set(this.$data, 'tutor', tutor);
        ga('send', 'event', 'Users', 'View', tutor.name);
      }
    });
  },
  data: {
    tutor: {},
    userEmail: ''
  },
});
