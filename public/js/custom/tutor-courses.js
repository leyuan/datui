new Vue({
  el: '#tutor-subjects',
  beforeMount() {
    var url = `${window.location.origin}/api/subjects`;
    this.$http.get(url).then((res) => {
      if (res.body) {
        var body = JSON.parse(res.body);
        var tutorSubjects = body.subjects.map(subject => ({
          name: subject,
          link: `teachers-list.html#${subject}`
        }));
        this.$set(this.$data, 'tutorSubjects', tutorSubjects);
      }
    });
  },
  data: {
    tutorSubjects: [],
  },
})
