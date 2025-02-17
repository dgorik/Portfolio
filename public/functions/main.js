/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
			parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
			parallaxFactor: 20

		};

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1800px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px'],
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch?
	if (browser.mobile) {

		// Turn on touch mode.
		$body.addClass('is-touch');

		// Height fix (mostly for iOS).
		window.setTimeout(function () {
			$window.scrollTop($window.scrollTop() + 1);
		}, 0);

	}

	// Footer.
	breakpoints.on('<=medium', function () {
		$footer.insertAfter($main);
	});

	breakpoints.on('>medium', function () {
		$footer.appendTo($header);
	});

	// Header.

	// Parallax background.

	// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
	if (browser.name == 'ie'
		|| browser.mobile)
		settings.parallax = false;

	if (settings.parallax) {

		breakpoints.on('<=medium', function () {

			$window.off('scroll.strata_parallax');
			$header.css('background-position', '');

		});

		breakpoints.on('>medium', function () {

			$header.css('background-position', 'left 0px');

			$window.on('scroll.strata_parallax', function () {
				$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
			});

		});

		$window.on('load', function () {
			$window.triggerHandler('scroll');
		});

	}

	// Main Sections: Two.

	// Lightbox gallery.
	// $window.on('load', function () {

	// 	$('#two').poptrox({
	// 		caption: function ($a) { return $a.next('h3').text(); },
	// 		overlayColor: '#2c2c2c',
	// 		overlayOpacity: 0.85,
	// 		popupCloserText: '',
	// 		popupLoaderText: '',
	// 		selector: '.work-item a.image',
	// 		usePopupCaption: true,
	// 		usePopupDefaultStyling: false,
	// 		usePopupEasyClose: false,
	// 		usePopupNav: true,
	// 		windowMargin: (breakpoints.active('<=small') ? 0 : 50)
	// 	});

	// });

})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
	// Find the "Learn More" button
	const learnMoreButton = document.querySelector('.button');

	// Find the footer
	const bottom = document.getElementById('three');

	// Add a click event listener to the button
	learnMoreButton.addEventListener('click', function (event) {
		event.preventDefault(); // Prevent the default behavior of the anchor tag

		// Scroll to the footer smoothly
		bottom.scrollIntoView({ behavior: 'smooth' });
	});
});

function sendMessage() {
	// Get form data
	const formData = {
		name: document.getElementById('name').value,
		email: document.getElementById('email').value,
		message: document.getElementById('message').value
	};

	// Send form data to server using Fetch API
	fetch('/.netlify/functions/server/message', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json' // Set Content-Type header to application/json
		},
		body: JSON.stringify(formData)
	})
		.then(response => {
			if (response.ok) {
				window.location.href = "/.netlify/functions/server/success"; // Redirect on success
			} else {
				console.error("Failed to send message");
			}
		})
		
		.catch(error => {
			console.error('Error:', error);
		});
}