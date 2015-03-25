<div class="wrap espresso-admin about-wrap">

	<h1><?php  echo $admin_page_title; ?></h1>
	<div class="about-text"><?php echo !empty($admin_page_subtitle) ? $admin_page_subtitle : ''; ?></div>
	<div class="ee-badge"><img class="" src=" <?php echo EE_GLOBAL_ASSETS_URL; ?>images/event-espresso-cup-90x90.png" width="90" height="90" alt="<?php printf( esc_attr__( '%s Logo', 'event_espresso' ), 'Event Espresso' ); ?>"/><br /><?php printf( __('Version %s', 'event_espresso' ),  EVENT_ESPRESSO_VERSION ); ?></div>

	<?php echo $nav_tabs; ?>


<?php
	do_action( 'AHEE__admin_wrapper__template__before_about_admin_page_content' );
	echo $about_admin_page_content;
	do_action( 'AHEE__admin_wrapper__template__after_about_admin_page_content' );
?>

</div>
