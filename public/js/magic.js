// magic.js
$(document).ready(function() {

	// Contact form process
	$('#contact-form').submit(function(event) {

		$('.form-group').removeClass('has-error'); // remove the error class
		$('.help-block').remove(); // remove the error text

		// get the form data
		// there are many ways to get this data using jQuery (you can use the class or id also)
		var formData = {
			'name' 	        : $('input#contact-input-name').val(),
			'email' 	    	: $('input#contact-input-email').val(),
			'phone' 	    : $('input#contact-input-phone').val(),
			'message' 		: $('textarea#contact-input-message').val()
		};

		$.ajax({
			type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url 		: '/api/contact-message', // the url where we want to POST
			data 		: formData, // our data object
			dataType 	: 'json', // what type of data do we expect back from the server
			encode 		: true
		})
		.done(function(data) {
			if (!data.success) {
				if (data.errors.email) {
					$('#contact-email-group').addClass('has-error'); // add the error class to show red input
					$('#contact-email-group').append('<span class="help-block">😣 邮箱格式好像不咋对 😣</span>'); // add the actual error message under our input
				}

				if (data.errors.message) {
					$('#contact-message-group').addClass('has-error'); // add the error class to show red input
					$('#contact-message-group').append('<span class="help-block">😣 好像没有对我们说话 😣</span>'); // add the actual error message under our input
				}

			} else {
				$('#contact-form').append('<div class="alert alert-success">😄 Nice!提交成功了！😄</div>');
			}
		})
		.fail(function(data) {
			$('#contact-form').append('<div class="alert alert-success">😳 因为莫名的原因.. 失败了... 😳</div>');
		});

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
	});
});
