console.log('woooo, tutor list!!');

new Vue({
  el: '#tutor-list',
  beforeMount() {
    const url = 'http://localhost:8081/api/tutors';
    this.$http.get(url).then((res) => {
      if (res.body) {
        // debugger;
        const tutorList = JSON.parse(res.body);
        console.log(tutorList);
        this.$set(this.$data, 'tutorList', tutorList);
      }
    });
  },
  data: {
    tutorList: [],
  }
})
