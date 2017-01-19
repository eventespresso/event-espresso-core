<?php
/**
 * Template for content to be displayed in an iframe.
 * Following template arguments are available:
 *
 * @var boolean $enqueue_wp_assets whether to call wp_head()
 * @var string  $title             HTML for notices and ajax gif
 * @var string  $notices           HTML for notices and ajax gif
 * @var string  $content           HTML for the content being displayed
 * @var array   $css               an array of CSS URLs.
 * @var string  $eei18n            localized JSON vars
 * @var array   $header_js         an array of JS URLs.
 * @var array   $footer_js         an array of JS URLs.
 * @since   4.9.0
 * @package Event Espresso
 */
?>
<!DOCTYPE html>
<html>
<head>
	<title><?php echo $title; ?></title>
<?php if ( $enqueue_wp_assets ) : ?>
	<?php wp_head(); ?>
<?php else : ?>
	<?php foreach ( $css as $url ) : ?>
	<link rel="stylesheet" type="text/css" href="<?php echo $url;?>">
	<?php endforeach; ?>
	<script type="text/javascript">
		<?php echo $eei18n; ?>
	</script>
	<?php foreach ( $header_js as $url ) : ?>
		<script type="text/javascript" src="<?php echo $url; ?>"></script>
	<?php endforeach; ?>
<?php endif; ?>
</head>
<body>
	<?php echo $notices; ?>
    <div style="padding: 1em;">
        <?php echo $content; ?>
    </div>
    <?php foreach ( $footer_js as $url ) : ?>
		<script type="text/javascript" src="<?php echo $url; ?>"></script>
	<?php endforeach; ?>
<?php if ( $enqueue_wp_assets ) : ?>
	<?php wp_footer(); ?>
<?php endif; ?>
</body>
</html>
