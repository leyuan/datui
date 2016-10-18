/**
 * Tutor Keys are
 * {name, phone, email, courses, avatar, intro}
 */

new Vue({
  el: '#tutor-info',
  beforeMount() {
    //TODO - this should be a dynamic ID
    const url = 'http://localhost:8081/api/tutor/AVfV9DepqvRn4ZB9p_bb';
    this.$http.get(url).then((res) => {
      if (res.body) {
        const tutor = JSON.parse(res.body);
        console.log(tutor);
        this.$set(this.$data, 'tutor', tutor);
      }
    });
  },
  data: {
    tutor: {},
  },
});
