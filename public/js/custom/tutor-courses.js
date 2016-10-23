new Vue({
  el: '#tutor-subjects',
  beforeMount() {
    const url = `${window.location.origin}/api/subjects`;
    this.$http.get(url).then((res) => {
      if (res.body) {
        const body = JSON.parse(res.body);
        const tutorSubjects = body.subjects.map(subject => ({
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
