<div class="padding">
	<h3><?php esc_html_e('Need help with Event Espresso?', 'event_espresso'); ?></h3>
	
	<h4><?php esc_html_e( 'You may be able to find an answer for your question or concern here:', 'event_espresso' ); ?></h4>
				<ol>
					<li><strong><em><?php esc_html_e( 'A known issue.', 'event_espresso' ); ?></em></strong>  <?php printf( esc_html__( 'Some themes and plugins have %1$sknown conflicts%2$s with Event Espresso. (You can also browse the %3$sEvent Espresso support pages%2$s or %4$sEvent Espresso support forums%2$s to see if other members have experienced and solved the problem.)', 'event_espresso' ), '<a href="https://eventespresso.com/wiki/known-third-party-plugin-theme-conflicts/" target="_blank">','</a>', '<a href="https://eventespresso.com/support/documentation/versioned-docs/?doc_ver=ee4" target="_blank">', '<a href="https://eventespresso.com/support/forums/" target="_blank">' ); ?></li>
					<li><strong><em><?php esc_html_e( 'A plugin conflict.', 'event_espresso' ); ?></em></strong>  <?php esc_html_e( 'You can check to see if there is a plugin conflict by temporarily deactivating all plugins except for Event Espresso. If the problem goes away, then reactivate your plugins one by one until the issue returns. This will help you pinpoint the source of the conflict.', 'event_espresso' ); ?></li>
					<li>
						<strong><em><?php esc_html_e( 'A theme conflict.', 'event_espresso' ); ?></em></strong>
						<?php
							$default_theme = wp_get_theme( WP_DEFAULT_THEME );

							if ( $default_theme->exists() ) {
								 printf( esc_html__( 'If your problem is not a known issue or caused by a plugin, then try activating %s (the default WordPress theme).', 'event_espresso' ), $default_theme->get( 'Name' ) );
							} else {
								esc_html_e( 'If your problem is not a known issue or caused by a plugin, then try activating the default WordPress theme.', 'event_espresso' );
							}
						?>
						<?php esc_html_e( 'If this solves the problem for you, then something in your theme is causing this issue. Check to see if an update is available for your WordPress theme or reach out to the theme author.', 'event_espresso' ); ?>
					</li>
				</ol>
				
	<p><?php esc_html_e( 'If none of the suggestions above help you find a solution, then feel free to reach out to the support team at Event Espresso.', 'event_espresso' ); ?></p>
	<p><?php printf( esc_html__( 'Login to your account on EventEspresso.com and %1$screate a support post in our member support forums%2$s. Use a %3$sclear and descriptive title%4$s in your support post, %3$sdescribe the issue to the best of your knowledge%4$s, and %3$snever post any sensitive information such as login details%4$s. Be sure to also include %5$simportant information in the section below%2$s about your WordPress site.', 'event_espresso' ), '<a href="https://eventespresso.com/support/forums/" target="_blank">','</a>','<strong>','</strong>','<a href="#espresso_important_information_settings">' ); ?></p>

	<h4><?php esc_html_e( 'Have an emergency?', 'event_espresso' ); ?></h4>

	<p><?php printf( esc_html__( 'We offer support tokens to members that need help with a time-sensitive issue. A support token will provide you with up to 30 minutes of one-on-one time with a team member at Event Espresso. If you have an emergency and need help quickly, then please %1$spurchase a support token%2$s.', 'event_espresso' ), '<a href="https://eventespresso.com/product/premium-support-token/?utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=help_support_tab&utm_content=support_token" target="_blank">','</a>' ); ?></p>
</div>