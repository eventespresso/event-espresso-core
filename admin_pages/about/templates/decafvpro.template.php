<h2 style="text-align: left;">Who uses Event Espresso?</h2>
<p>Event Espresso is used by over 40,000 event organizers across the world. They host <a href="https://eventespresso.com/use-cases/conference-registration/?utm_source=wordpress_org&amp;utm_medium=link&amp;utm_campaign=decaf_about_page&amp;utm_content=Decaf+vs+Regular">conferences</a>, <a href="https://eventespresso.com/use-cases/paint-wine-party-ticketing-software/?utm_source=wordpress_org&amp;utm_medium=link&amp;utm_campaign=decaf_about_page&amp;utm_content=Decaf+vs+Regular">art classes</a>, training courses, concerts, fundraisers, workshops, <a href="https://eventespresso.com/use-cases/film-festival-ticketing-software/?utm_source=wordpress_org&amp;utm_medium=link&amp;utm_campaign=decaf_about_page&amp;utm_content=Decaf+vs+Regular">film festivals</a>, and more.</p>
<p>We offer a free version of Event Espresso 4 called Decaf which is a good fit for basic events. Need more features like custom registration forms and advanced email notifications? <a href="https://eventespresso.com/pricing/?ee_ver=ee4&utm_source=wordpress_org&amp;utm_medium=link&amp;utm_campaign=decaf_about_page&amp;utm_content=Decaf+vs+Regular">Check out Event Espresso 4</a>.<br>
<?php
/**
 * Features
 */

$features = array(
	'slider-options' => array(
		'label'   	=> __( 'Handle multiple dates and pricing options', 'brilliance' ),
		'decaf'     	=> '<span class="dashicons dashicons-no-alt"></span>',
		'regular'	=> '<span class="dashicons dashicons-yes"></span></i>'
	),
	'woocommerce' => array(
		'label'  	=> __( 'Create custom registration forms', 'brilliance' ),
		'decaf'     	=> '<span class="dashicons dashicons-no-alt"></span>',
		'regular' 	=> '<span class="dashicons dashicons-yes"></span></i>'
	),
	'reorder-sections' => array(
		'label'       => __( 'Customize advanced email notifications', 'brilliance' ),
		'decaf'     => '<span class="dashicons dashicons-no-alt"></span>',
		'regular' => '<span class="dashicons dashicons-yes"></span></i>'
	),
	'custom-colors'    => array(
		'label'       => __( 'Manage taxes', 'brilliance' ),
		'decaf'     => '<span class="dashicons dashicons-no-alt"></span>',
		'regular' => '<span class="dashicons dashicons-yes"></span></i>'
	),
	'typography'       => array(
		'label'       => __( 'Accept additional payment options', 'brilliance' ),
		'decaf'     => '<span class="dashicons dashicons-no-alt"></span>',
		'regular' => '<span class="dashicons dashicons-yes"></span></i>'
	),
	'dedicated-support' => array(
		'label'       => __( 'Compatibility with add-ons', 'brilliance' ),
		'decaf'     => '<span class="dashicons dashicons-no-alt"></span>',
		'regular' => '<span class="dashicons dashicons-yes"></span></i>'
	),
	'security-updates' => array(
		'label'       => __( 'Best in class support', 'brilliance' ),
		'decaf'     => '<span class="dashicons dashicons-no-alt"></span>',
		'regular' => '<span class="dashicons dashicons-yes"></span></i>'
	),
);
?>
<div class="featured-section features">
    <table class="decaf-regular-table">
        <thead>
        <tr>
            <th></th>
            <th><?php _e( 'Decaf', 'brilliance' ) ?></th>
            <th><?php _e( 'Regular', 'brilliance' ) ?></th>
        </tr>
        </thead>
        <tbody>
		<?php foreach ( $features as $feature ): ?>
            <tr>
                <td class="feature">
                    <h3>
						<?php echo $feature['label']; ?>
                    </h3>
                </td>
                <td class="decaf-feature">
					<?php echo $feature['decaf']; ?>
                </td>
                <td class="regular-feature">
					<?php echo $feature['regular']; ?>
                </td>
            </tr>
		<?php endforeach; ?>
        <tr>
            <td></td>
            <td colspan="2" class="text-right"><a href="https://eventespresso.com/pricing/?utm_source=wordpress_org&amp;utm_medium=link&amp;utm_campaign=decaf_about_page&amp;utm_content=Decaf+vs+Regular" target="_blank"
                               class="button button-primary button-hero"><span class="dashicons dashicons-cart"></span><?php _e( 'Upgrade Now!', 'event_espresso' ) ?></a></td>
        </tr>
        </tbody>
    </table>
</div>