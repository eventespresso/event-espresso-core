<?php
/**
 * Template for the ticket selector when displayed in an iframe.
 *
 * Following template arguments are available:
 * @type string $ticket_selector	This is the html for the ticket selector.
 * @type array $css 			An array of css urls.
 * @type array $js 			An array of js urls.
 *
 * @since 4.6.7
 * @package Event Espresso
 * @subpackage module
 */
?>
<!DOCTYPE html>
<html>
<head>
	<title><?php _e('Ticket Selector', 'event_espresso'); ?></title>
	<?php foreach ( $css as $url ) : ?>
		<link rel="stylesheet" type="text/css" href="<?php echo $url;?>">
	<?php endforeach; ?>
	<?php foreach ( $js as $jsurl ) : ?>
		<script type="text/javascript" src="<?php echo $jsurl; ?>"></script>
	<?php endforeach; ?>
</head>
<body>
	<?php echo $ticket_selector; ?>
	<script type="text/javascript">
		var EEDTicketSelectorMsg = {
			zeroSelected : '<?php _e('Please choose at least one ticket before continuing.', 'event_espresso' ); ?>'
		}
	</script>
</body>
</html>
