new Vue({
  el: '#tutor-list',
  beforeMount() {
    const url = `${window.location.origin}/api/tutors`;
    this.$http.get(url).then((res) => {
      if (res.body) {
        const body = JSON.parse(res.body);
        const tutorList = filterTutors(body);
        this.$set(this.$data, 'tutorResponseBody', body);
        this.$set(this.$data, 'tutorList', tutorList);
      }
    });

    const fetch_subject_url = `${window.location.origin}/api/subjects`;
    this.$http.get(fetch_subject_url).then((res) => {
      if (res.body) {
        const body = JSON.parse(res.body);
        this.$set(this.$data, 'subjects', body.subjects);
      }
    });
  },
  data: {
    tutorResponseBody: [],
    tutorList: [],
    subjects: [],
    selected: window.location.hash.substring(1) || 'All'
  },
  methods: {
    doThis(event) {
      const selectedCourse = this._data.selected;
      const body = this._data.tutorResponseBody;
      const tutorList = filterTutors(body, selectedCourse);
      this.$set(this._data, 'tutorList', tutorList);
    }
  }
});

function filterTutors(tutorList, course) {
  const selectedCourse = course || window.location.hash.substring(1) || '';

  return tutorList.filter((stub) => {
    stub["link"] = `teachers-profile.html#${stub.id}`;
    const tutor = stub.source;
    const tutorSubjects = getTutorSubjects(tutor);

    if (selectedCourse === '' || selectedCourse === 'All') {
      return true;
    }
    return tutorSubjects.indexOf(selectedCourse.toLowerCase()) >= 0;
  });
}

function getTutorSubjects(tutor) {
  const subjects = tutor.courses.map((course) => course.split(' ')[0].toLowerCase());
  return _.uniq(subjects);
}
