<?php
/**
 * Template for content to be displayed in an iframe.
 * Following template arguments are available:
 *
 * @var string $title 	 HTML for notices and ajax gif
 * @var string $notices	 HTML for notices and ajax gif
 * @var string $content	 HTML for the content being displayed
 * @var array $css 		 an array of CSS URLs.
 * @var string $eei18n 	 localized JSON vars
 * @var array $header_js an array of JS URLs.
 * @var array $footer_js an array of JS URLs.
 * @since 4.9.0
 * @package Event Espresso
 */
?>
<!DOCTYPE html>
<html>
<head>
	<title><?php echo $title; ?></title>
	<?php foreach ( $css as $url ) : ?>
		<link rel="stylesheet" type="text/css" href="<?php echo $url;?>">
	<?php endforeach; ?>
	<script type="text/javascript">
		<?php echo $eei18n; ?>
	</script>
	<?php foreach ( $header_js as $url ) : ?>
		<script type="text/javascript" src="<?php echo $url; ?>"></script>
	<?php endforeach; ?>
</head>
<body>
	<?php echo $notices; ?>
	<?php echo $content; ?>
	<?php foreach ( $footer_js as $url ) : ?>
		<script type="text/javascript" src="<?php echo $url; ?>"></script>
	<?php endforeach; ?>
</body>
</html>
