new Vue({
  el: '#tutor-list',
  beforeMount() {
    const url = `${window.location.origin}/api/tutors`;
    this.$http.get(url).then((res) => {
      if (res.body) {
        const body = JSON.parse(res.body);
        const tutorList = filterTutors(body);
        this.$set(this.$data, 'tutorList', tutorList);
      }
    });
  },
  data: {
    tutorList: [],
  }
});

function filterTutors(tutorList) {
  const selectedCourse = window.location.hash.substring(1) || '';

  return tutorList.filter((stub) => {
    stub["link"] = `teachers-profile.html#${stub.id}`;
    const tutor = stub.source;
    const tutorSubjects = getTutorSubjects(tutor);

    if (selectedCourse === '') {
      return true;
    }
    return tutorSubjects.indexOf(selectedCourse.toLowerCase()) >= 0;
  });
}

function getTutorSubjects(tutor) {
  const subjects = tutor.courses.map((fullCourse) => fullCourse.split(' ')[0].toLowerCase());
  return _.uniq(subjects);
}
