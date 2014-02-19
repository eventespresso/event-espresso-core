jQuery(document).ready(function($) {
	$('.question-group-questions').sortable({
		cursor: 'move',
		items: '.ee-question-sortable',
		update: function(event, ui) {
			var allQuestions = $('.ee-question-sortable');
			allQuestions.each( function(i) {
				$('.question-group-QST_order', this).val(i);
			});
		}
	});
});