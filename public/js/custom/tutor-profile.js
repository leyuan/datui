var COOKIE_NAME = 'doNotCheatPlz';

/**
 * Tutor Keys are
 * {name, phone, email, courses, avatar, intro}
 */
new Vue({
  el: '#tutor-info',
  beforeMount() {
    var tutorId = location.hash.substring(1); // get rid of the # character
    var url = `/api/tutor/${tutorId}`;
    this.$http.get(url).then(function (res) {
      if (res.body) {
          var tutor = JSON.parse(res.body);
          tutor.courses.sort();
        this.$set(this.$data, 'tutor', tutor);
        ga('send', 'event', 'Users', 'View', tutor.name);
      }
    });
  },
  data: {
    tutor: {},
    userEmail: '',
    emailNotValid: false,
    canViewContact: userCanViewContact(),
  },
  methods: {
    submitEmail(event) {
      var email = this._data.userEmail;
      var emailIsValid = checkUAEmail(email);
      var url = "/api/students";

      if (emailIsValid) {
        this.$http.post(url, { email: email }).then(function (res, err) {
          if (res.status === 200) {
            createCookie(COOKIE_NAME, true, 20);
            this.$set(this._data, 'canViewContact', true);
          }
        })
      } else {
        this.$set(this._data, 'emailNotValid', true);
      }
    }
  }
});

function checkUAEmail(email) {
  return email.indexOf('@ualberta.ca') > -1;
}

function userCanViewContact() {
  return readCookie(COOKIE_NAME);
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0)
          return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function logout() {
  eraseCookie('doNotCheatPlz');
  event.preventDefault();
}
