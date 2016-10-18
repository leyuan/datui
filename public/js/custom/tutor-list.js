console.log('woooo, tutor list!!');

new Vue({
  el: '#tutor-list',
  beforeMount() {
    const url = 'http://localhost:8081/api/tutors';
    this.$http.get(url).then((res) => {
      if (res.body) {
        const body = JSON.parse(res.body);
        const tutorList = body.map((tutorStub) => {
          tutorStub["link"] = `teachers-profile.html#${tutorStub.id}`;
          return tutorStub;
        });
        console.log(tutorList);
        this.$set(this.$data, 'tutorList', tutorList);
      }
    });
  },
  data: {
    tutorList: [],
  }
})
