/**
 * Tutor Keys are
 * {name, phone, email, courses, avatar, intro}
 */

new Vue({
  el: '#tutor-info',
  beforeMount() {
    //TODO - this should be a dynamic ID
    const tutorId = location.hash.substring(1);
    const url = `${window.location.origin}/api/tutor/${tutorId}`;
    this.$http.get(url).then((res) => {
      if (res.body) {
        const tutor = JSON.parse(res.body);
        // console.log(tutor);
        this.$set(this.$data, 'tutor', tutor);
      }
    });
  },
  data: {
    tutor: {},
  },
});
