const COOKIE_NAME = 'doNotCheatPlz';

/**
 * Tutor Keys are
 * {name, phone, email, courses, avatar, intro}
 */
new Vue({
  el: '#tutor-info',
  beforeMount() {
    const tutorId = location.hash.substring(1); // get rid of the # character
    const url = `${window.location.origin}/api/tutor/${tutorId}`;
    this.$http.get(url).then((res) => {
      if (res.body) {
        const tutor = JSON.parse(res.body);
        this.$set(this.$data, 'tutor', tutor);
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
      const email = this._data.userEmail;
      const emailIsValid = checkUAEmail(email);
      const url = `${window.location.origin}/api/students`

      if (emailIsValid) {
        this.$http.post(url, { email: email }).then((res, err) => {
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
