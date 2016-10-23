new Vue({
  el: '#tutor-courses',
  beforeMount() {
    const url = `${window.location.origin}/api/courses`;
    this.$http.get(url).then((res) => {
      if (res.body) {
        const body = JSON.parse(res.body);
        const tutorCourses = body.courses.map(course => ({
          name: course,
          link: `teachers-list.html#${course}`
        }));
        this.$set(this.$data, 'tutorCourses', tutorCourses);
      }
    });
  },
  data: {
    tutorCourses: [],
  },
})
