new Vue({
  el: '#tutor-subjects',
  beforeMount() {
    var url = `${window.location.origin}/api/subjects`;
    this.$http.get(url).then(function(res) {
      if (res.body) {
        var body = JSON.parse(res.body);
        body.subjects.sort();
        var tutorSubjects = body.subjects.map(function(subject) {
          return {
            name: subject,
            link: `teachers-list.html#${subject}`
          };
        });
        this.$set(this.$data, 'tutorSubjects', tutorSubjects);
      }
    });
  },
  data: {
    tutorSubjects: [],
  },
})
