new Vue({
    el: '#tutor-list',
    beforeMount() {
        var url = `${window.location.origin}/api/tutors`;
        this.$http.get(url).then((res) => {
            if (res.body) {
                var body = JSON.parse(res.body);
                sortTutorCourses(body);
                var tutorList = filterTutors(body);
                this.$set(this.$data, 'tutorResponseBody', body);
                this.$set(this.$data, 'tutorList', tutorList);
            }
        });

        var fetch_subject_url = `${window.location.origin}/api/subjects`;
        this.$http.get(fetch_subject_url).then((res) => {
            if (res.body) {
                var body = JSON.parse(res.body);
                this.$set(this.$data, 'subjects', body.subjects.sort());
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
            var selectedCourse = this._data.selected;
            var body = this._data.tutorResponseBody;
            var tutorList = filterTutors(body, selectedCourse);
            this.$set(this._data, 'tutorList', tutorList);
        }
    }
});

function filterTutors(tutorList, course) {
    var selectedCourse = course || window.location.hash.substring(1) || '';

    return tutorList.filter((stub) => {
        stub["link"] = `teachers-profile.html#${stub.id}`;
        var tutor = stub.source;
        var tutorSubjects = getTutorSubjects(tutor);

        if (selectedCourse === '' || selectedCourse === 'All') {
            return true;
        }
        return tutorSubjects.indexOf(selectedCourse.toLowerCase()) >= 0;
    });
}

function getTutorSubjects(tutor) {
    var subjects = tutor.courses.map((course) => course.split(' ')[0].toLowerCase());
    return _.uniq(subjects);
}

function sortTutorCourses(tutorList) {
    if (!tutorList) return;
    return tutorList.map((tutor) =>tutor.source.courses.sort());
}
