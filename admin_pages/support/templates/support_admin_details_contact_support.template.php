<div class="padding">
	<h3><?php _e('Need help with Event Espresso?', 'event_espresso'); ?></h3>
	
	<h4><?php esc_html_e( 'You may be able to find an answer for your question or concern here:', 'event_espresso' ); ?></h4>
				<ol>
					<li><b><em><?php esc_html_e( 'A known issue.', 'event_espresso' ); ?></em></b>  <?php echo sprintf( __( 'Some themes and plugins have <a href="%1$s" target="_blank">known conflicts</a> with Event Espresso. (You can also browse the <a href="%2$s" target="_blank">Event Espresso support pages</a> or <a href="%3$s" target="_blank">Event Espresso support forums</a> to see if other members have experienced and solved the problem.)', 'event_espresso' ), 'https://eventespresso.com/wiki/known-third-party-plugin-theme-conflicts/', 'https://eventespresso.com/support/documentation/versioned-docs/?doc_ver=ee4', 'https://eventespresso.com/support/forums/' ); ?></li>
					<li><b><em><?php esc_html_e( 'A plugin conflict.', 'event_espresso' ); ?></em></b>  <?php esc_html_e( 'You can check to see if there is a plugin conflict by temporarily deactivating all plugins except for Event Espresso. If the problem goes away, then reactivate your plugins one by one until the issue returns. This will help you pinpoint the source of the conflict.', 'event_espresso' ); ?></li>
					<li>
						<b><em><?php esc_html_e( 'A theme conflict.', 'event_espresso' ); ?></em></b>
						<?php
							$default_theme = wp_get_theme( WP_DEFAULT_THEME );

							if ( $default_theme->exists() ) {
								echo esc_html( sprintf( __( 'If your problem is not a known issue or caused by a plugin, then try activating %s (the default WordPress theme).', 'event_espresso' ), $default_theme->get( 'Name' ) ) );
							} else {
								esc_html_e( 'If your problem is not a known issue or caused by a plugin, then try activating the default WordPress theme.', 'event_espresso' );
							}
						?>
						<?php esc_html_e( 'If this solves the problem for you, then something in your theme is causing this issue. Check to see if an update is available for your WordPress theme or reach out to the theme author.', 'event_espresso' ); ?>
					</li>
				</ol>
				
	<p><?php esc_html_e( 'If none of the suggestions above help you find a solution, then feel free to reach out to the support team at Event Espresso.', 'event_espresso' ); ?></p>
	<p><?php echo sprintf( __( 'Login to your account on EventEspresso.com and <a href="%s" target="_blank">create a support post in our member support forums</a>. Use a %2$sclear and descriptive title%3$s in your support post, %2$sdescribe the issue to the best of your knowledge%3$s, and %2$snever post any sensitive information such as login details%3$s. Be sure to also include <a href="#espresso_important_information_settings">basic information</a> about your WordPress site.', 'event_espresso' ), 'https://eventespresso.com/support/forums/','<strong>','</strong>' ); ?></p>

	<h4><?php esc_html_e( 'Have an emergency?', 'event_espresso' ); ?></h4>

	<p><?php echo sprintf( __( 'We offer support tokens to members that need help with a time-sensitive issue. A support token will provide you with up to 30 minutes of one-on-one time with a team member at Event Espresso. If you have an emergency and need help quickly, then please <a href="%s" target="_blank">purchase a support token</a>.', 'event_espresso' ), 'https://eventespresso.com/product/premium-support-token/?utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=help_support_tab&utm_content=support_token' ); ?></p>

</div>