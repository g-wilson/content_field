var markdownLive = (function($) {
 	var mdLive = {};

 	mdLive.init = function() {
 		// Set up existing markdown panels
 		setupAll();

 		// Listen for any more added
 		// $('.field-content fieldset.apply button').click(function() {
 		// 	var mdField = $('.field-content textarea.markdown_extra').last();
 		// 	setupField(mdField);
 		// 	return false;
 		// });
 	}

 	var setupAll = function() {
 		$('.field-content textarea.markdown, .field-content textarea.markdown_extra, .field-content textarea.markdown_extra_with_smartypants').each(function(){
			$(this).addClass('markdown_live');
			setupField($(this));
		});
	}

	var setupField = function(elem) {
		var $mdSource = elem;
		var $parent = elem.parent();
		$parent.append('<div class="markdown-live_container"></div>');
		var $thisContainer = $parent.find('.markdown-live_container');
		$thisContainer.append('<div class="md_preview_contain"></div>');

		//Preview visual
		$('.md_preview_contain').append('<div class="md_preview"></div>');
		var $mdElement = $('.md_preview');

		// Button
		$mdButton = $('<a href="#" class="md_button button">Preview</a>');

		// Functionality
		$mdSource.keyup(function() {
			$mdElement.html(markdown.toHTML($mdSource.val()));
		}) 
		$mdSource.trigger('keyup'); //Fire initial event to apply markdown preview text

		// Add elements to DOM
		$thisContainer.append($mdSource);
		$thisContainer.append($mdButton);
		$thisContainer.append($('.md_preview_contain'));

		// Button event
		$('.md_button').click(function() {
			$(this).next('.md_preview_contain').slideFadeToggle();
			return false;
		});

		// Equalise textarea height
		$mdSource.css({
			'height': $mdElement.outerHeight()
		});
	}

 	return mdLive;
})(jQuery);

jQuery(document).ready(function($) {
	markdownLive.init();
});

jQuery.fn.slideFadeToggle  = function(speed, easing, callback) {
  return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};