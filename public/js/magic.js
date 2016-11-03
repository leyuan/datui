// magic.js
$(document).ready(function() {

	// Contact form process
	var isSubmitted = false;
	var contactForm = $('#contact-form');
	var submitBtn = $('#msg-submit');

	contactForm.submit(function(event) {
		if(isSubmitted) return;
		isSubmitted = true;

		
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
			encode 		: true,
			beforeSend	: function(){
				$('div.alert', contactForm).remove();
				contactForm.append('<i class="fa fa-spinner fa-spin dt-spinner" style="font-size: 18px;"></i>');
				submitBtn.addClass('disabled');
				
			}
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
				contactForm.append('<div class="alert alert-success">😄 Nice!提交成功了！😄</div>');
				contactForm.trigger('reset');
			}
		})
		.fail(function(data) {
			contactForm.append('<div class="alert alert-success">😳 因为莫名的原因.. 失败了... 😳</div>');
		})
		.always(function(){
			$('i.fa-spinner', contactForm).remove();
			submitBtn.removeClass('disabled');
			isSubmitted = false;
		});

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
	});
});
