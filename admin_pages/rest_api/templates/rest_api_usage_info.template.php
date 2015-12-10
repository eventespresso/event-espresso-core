<div class="padding">
	<ul>
		<li>
			<strong>
				<?php _e('Directions on Activating the API:', 'event_espresso'); ?>
			</strong><br />
			<?php _e(' Simply enable the EE4 JSON REST API Addon (which you have), the WP REST API plugin version 1.2, and pretty permalinks. Then other applications can use the EE4 JSON REST API to retrieve and update your Event Espresso data.', 'event_espresso'); ?><br />
			<?php printf( __( '%1$sClick here to verify the API is running.%2$s You shouldn\'t see a 404 page, but instead a lot of text describing your published events.', 'event_espresso' ), "<a href='$api_endpoint' target='_blank'>","</a>");?>
		</li>
		<li>
			<strong>
				<?php _e('Directions for Developing Applications', 'event_espresso'); ?>
			</strong><br />
			<?php printf( __( 'Please read our documentation at %1$s', 'event_espresso' ), '<a href="http://developer.eventespresso.com/docs/ee4-json-rest-api-documentation/" target="_blank">developer.eventespresso.com</a>');?>
		</li>
	</ul>
</div>
<!-- / .padding -->