<?php
/**
 * Template for the ticket selector when displayed in an iframe.
 *
 * Following template arguments are available:
 *
 * @type string $notices	HTML for notices and ajax gif
 * @type string $ticket_selector	This is the html for the ticket selector.
 * @type array $css 		An array of css urls.
 * @type string $eei18n 	localized JSON vars
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
	<script type="text/javascript">
		<?php echo  $eei18n; ?>
	</script>
	<?php foreach ( $js as $jsurl ) : ?>
		<script type="text/javascript" src="<?php echo $jsurl; ?>"></script>
	<?php endforeach; ?>
</head>
<body>
	<?php echo $notices; ?>
	<?php echo $ticket_selector; ?>
</body>
</html>
