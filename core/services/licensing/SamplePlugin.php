<?php

/*
Plugin Name: Sample Plugin
Plugin URI: http://pippinsplugins.com/
Description: Illustrates how to include an updater in your plugin for EDD Software Licensing
Author: Pippin Williamson
Author URI: http://pippinsplugins.com
Version: 1.0
License: GNU General Public License v2.0 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

/**
* For further details please visit http://docs.easydigitaldownloads.com/article/383-automatic-upgrades-for-wordpress-plugins
 */

// this is the URL our updater / license checker pings. This should be the URL of the site with EDD installed
define( 'EDD_SAMPLE_STORE_URL', 'http://easydigitaldownloads.com' ); // you should use your own CONSTANT name, and be sure to replace it throughout this file

// the download ID for the product in Easy Digital Downloads
define( 'EDD_SAMPLE_ITEM_ID', 123 ); // you should use your own CONSTANT name, and be sure to replace it throughout this file

// the name of the product in Easy Digital Downloads
define( 'EDD_SAMPLE_ITEM_NAME', 'Sample Plugin' ); // you should use your own CONSTANT name, and be sure to replace it throughout this file

// the name of the settings page for the license input to be displayed
define( 'EDD_SAMPLE_PLUGIN_LICENSE_PAGE', 'pluginname-license' );

if ( ! class_exists( 'EDD_SL_Plugin_Updater' ) ) {
	// load our custom updater
	include dirname( __FILE__ ) . '/EDD_SL_Plugin_Updater.php';
}

/**
 * Initialize the updater. Hooked into `init` to work with the
 * wp_version_check cron job, which allows auto-updates.
 */
function edd_sl_sample_plugin_updater() {

	// To support auto-updates, this needs to run during the wp_version_check cron job for privileged users.
	$doing_cron = defined( 'DOING_CRON' ) && DOING_CRON;
	if ( ! current_user_can( 'manage_options' ) && ! $doing_cron ) {
		return;
	}

	// retrieve our license key from the DB
	$license_key = trim( get_option( 'edd_sample_license_key' ) );

	// setup the updater
	$edd_updater = new EDD_SL_Plugin_Updater(
		EDD_SAMPLE_STORE_URL,
		__FILE__,
		array(
			'version' => '1.0',                    // current version number
			'license' => $license_key,             // license key (used get_option above to retrieve from DB)
			'item_id' => EDD_SAMPLE_ITEM_ID,       // ID of the product
			'author'  => 'Easy Digital Downloads', // author of this plugin
			'beta'    => false,
		)
	);

}
add_action( 'init', 'edd_sl_sample_plugin_updater' );


/************************************
* the code below is just a standard
* options page. Substitute with
* your own.
*************************************/

/**
 * Adds the plugin license page to the admin menu.
 *
 * @return void
 */
function edd_sample_license_menu() {
	add_plugins_page(
		__( 'Plugin License' ),
		__( 'Plugin License' ),
		'manage_options',
		EDD_SAMPLE_PLUGIN_LICENSE_PAGE,
		'edd_sample_license_page'
	);
}
add_action( 'admin_menu', 'edd_sample_license_menu' );

function edd_sample_license_page() {
	add_settings_section(
		'edd_sample_license',
		__( 'Plugin License' ),
		'edd_sample_license_key_settings_section',
		EDD_SAMPLE_PLUGIN_LICENSE_PAGE
	);
	add_settings_field(
		'edd_sample_license_key',
		'<label for="edd_sample_license_key">' . __( 'License Key' ) . '</label>',
		'edd_sample_license_key_settings_field',
		EDD_SAMPLE_PLUGIN_LICENSE_PAGE,
		'edd_sample_license',
	);
	?>
	<div class="wrap">
		<h2><?php esc_html_e( 'Plugin License Options' ); ?></h2>
		<form method="post" action="options.php">

			<?php
			do_settings_sections( EDD_SAMPLE_PLUGIN_LICENSE_PAGE );
			settings_fields( 'edd_sample_license' );
			submit_button();
			?>

		</form>
	<?php
}

/**
 * Adds content to the settings section.
 *
 * @return void
 */
function edd_sample_license_key_settings_section() {
	esc_html_e( 'This is where you enter your license key.' );
}

/**
 * Outputs the license key settings field.
 *
 * @return void
 */
function edd_sample_license_key_settings_field() {
	$license = get_option( 'edd_sample_license_key' );
	$status  = get_option( 'edd_sample_license_status' );

	?>
	<p class="description"><?php esc_html_e( 'Enter your license key.' ); ?></p>
	<?php
	printf(
		'<input type="text" class="regular-text" id="edd_sample_license_key" name="edd_sample_license_key" value="%s" />',
		esc_attr( $license )
	);
	$button = array(
		'name'  => 'edd_license_deactivate',
		'label' => __( 'Deactivate License' ),
	);
	if ( 'valid' !== $status ) {
		$button = array(
			'name'  => 'edd_license_activate',
			'label' => __( 'Activate License' ),
		);
	}
	wp_nonce_field( 'edd_sample_nonce', 'edd_sample_nonce' );
	?>
	<input type="submit" class="button-secondary" name="<?php echo esc_attr( $button['name'] ); ?>" value="<?php echo esc_attr( $button['label'] ); ?>"/>
	<?php
}

/**
 * Registers the license key setting in the options table.
 *
 * @return void
 */
function edd_sample_register_option() {
	register_setting( 'edd_sample_license', 'edd_sample_license_key', 'edd_sanitize_license' );
}
add_action( 'admin_init', 'edd_sample_register_option' );

/**
 * Sanitizes the license key.
 *
 * @param string  $new The license key.
 * @return string
 */
function edd_sanitize_license( $new ) {
	$old = get_option( 'edd_sample_license_key' );
	if ( $old && $old !== $new ) {
		delete_option( 'edd_sample_license_status' ); // new license has been entered, so must reactivate
	}

	return sanitize_text_field( $new );
}

/**
 * Activates the license key.
 *
 * @return void
 */
function edd_sample_activate_license() {

	// listen for our activate button to be clicked
	if ( ! isset( $_POST['edd_license_activate'] ) ) {
		return;
	}

	// run a quick security check
	if ( ! check_admin_referer( 'edd_sample_nonce', 'edd_sample_nonce' ) ) {
		return; // get out if we didn't click the Activate button
	}

	// retrieve the license from the database
	$license = trim( get_option( 'edd_sample_license_key' ) );
	if ( ! $license ) {
		$license = ! empty( $_POST['edd_sample_license_key'] ) ? sanitize_text_field( $_POST['edd_sample_license_key'] ) : '';
	}
	if ( ! $license ) {
		return;
	}

	// data to send in our API request
	$api_params = array(
		'edd_action'  => 'activate_license',
		'license'     => $license,
		'item_id'     => EDD_SAMPLE_ITEM_ID,
		'item_name'   => rawurlencode( EDD_SAMPLE_ITEM_NAME ), // the name of our product in EDD
		'url'         => home_url(),
		'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production',
	);

	// Call the custom API.
	$response = wp_remote_post(
		EDD_SAMPLE_STORE_URL,
		array(
			'timeout'   => 15,
			'sslverify' => false,
			'body'      => $api_params,
		)
	);

		// make sure the response came back okay
	if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

		if ( is_wp_error( $response ) ) {
			$message = $response->get_error_message();
		} else {
			$message = __( 'An error occurred, please try again.' );
		}
	} else {

		$license_data = json_decode( wp_remote_retrieve_body( $response ) );

		if ( false === $license_data->success ) {

			switch ( $license_data->error ) {

				case 'expired':
					$message = sprintf(
						/* translators: the license key expiration date */
						__( 'Your license key expired on %s.', 'edd-sample-plugin' ),
						date_i18n( get_option( 'date_format' ), strtotime( $license_data->expires, current_time( 'timestamp' ) ) )
					);
					break;

				case 'disabled':
				case 'revoked':
					$message = __( 'Your license key has been disabled.', 'edd-sample-plugin' );
					break;

				case 'missing':
					$message = __( 'Invalid license.', 'edd-sample-plugin' );
					break;

				case 'invalid':
				case 'site_inactive':
					$message = __( 'Your license is not active for this URL.', 'edd-sample-plugin' );
					break;

				case 'item_name_mismatch':
					/* translators: the plugin name */
					$message = sprintf( __( 'This appears to be an invalid license key for %s.', 'edd-sample-plugin' ), EDD_SAMPLE_ITEM_NAME );
					break;

				case 'no_activations_left':
					$message = __( 'Your license key has reached its activation limit.', 'edd-sample-plugin' );
					break;

				default:
					$message = __( 'An error occurred, please try again.', 'edd-sample-plugin' );
					break;
			}
		}
	}

		// Check if anything passed on a message constituting a failure
	if ( ! empty( $message ) ) {
		$redirect = add_query_arg(
			array(
				'page'          => EDD_SAMPLE_PLUGIN_LICENSE_PAGE,
				'sl_activation' => 'false',
				'message'       => rawurlencode( $message ),
			),
			admin_url( 'plugins.php' )
		);

		wp_safe_redirect( $redirect );
		exit();
	}

	// $license_data->license will be either "valid" or "invalid"
	if ( 'valid' === $license_data->license ) {
		update_option( 'edd_sample_license_key', $license );
	}
	update_option( 'edd_sample_license_status', $license_data->license );
	wp_safe_redirect( admin_url( 'plugins.php?page=' . EDD_SAMPLE_PLUGIN_LICENSE_PAGE ) );
	exit();
}
add_action( 'admin_init', 'edd_sample_activate_license' );

/**
 * Deactivates the license key.
 * This will decrease the site count.
 *
 * @return void
 */
function edd_sample_deactivate_license() {

	// listen for our activate button to be clicked
	if ( isset( $_POST['edd_license_deactivate'] ) ) {

		// run a quick security check
		if ( ! check_admin_referer( 'edd_sample_nonce', 'edd_sample_nonce' ) ) {
			return; // get out if we didn't click the Activate button
		}

		// retrieve the license from the database
		$license = trim( get_option( 'edd_sample_license_key' ) );

		// data to send in our API request
		$api_params = array(
			'edd_action'  => 'deactivate_license',
			'license'     => $license,
			'item_id'     => EDD_SAMPLE_ITEM_ID,
			'item_name'   => rawurlencode( EDD_SAMPLE_ITEM_NAME ), // the name of our product in EDD
			'url'         => home_url(),
			'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production',
		);

		// Call the custom API.
		$response = wp_remote_post(
			EDD_SAMPLE_STORE_URL,
			array(
				'timeout'   => 15,
				'sslverify' => false,
				'body'      => $api_params,
			)
		);

		// make sure the response came back okay
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

			if ( is_wp_error( $response ) ) {
				$message = $response->get_error_message();
			} else {
				$message = __( 'An error occurred, please try again.' );
			}

			$redirect = add_query_arg(
				array(
					'page'          => EDD_SAMPLE_PLUGIN_LICENSE_PAGE,
					'sl_activation' => 'false',
					'message'       => rawurlencode( $message ),
				),
				admin_url( 'plugins.php' )
			);

			wp_safe_redirect( $redirect );
			exit();
		}

		// decode the license data
		$license_data = json_decode( wp_remote_retrieve_body( $response ) );

		// $license_data->license will be either "deactivated" or "failed"
		if ( 'deactivated' === $license_data->license ) {
			delete_option( 'edd_sample_license_status' );
		}

		wp_safe_redirect( admin_url( 'plugins.php?page=' . EDD_SAMPLE_PLUGIN_LICENSE_PAGE ) );
		exit();

	}
}
add_action( 'admin_init', 'edd_sample_deactivate_license' );

/**
 * Checks if a license key is still valid.
 * The updater does this for you, so this is only needed if you want
 * to do somemthing custom.
 *
 * @return void
 */
function edd_sample_check_license() {

	$license = trim( get_option( 'edd_sample_license_key' ) );

	$api_params = array(
		'edd_action'  => 'check_license',
		'license'     => $license,
		'item_id'     => EDD_SAMPLE_ITEM_ID,
		'item_name'   => rawurlencode( EDD_SAMPLE_ITEM_NAME ),
		'url'         => home_url(),
		'environment' => function_exists( 'wp_get_environment_type' ) ? wp_get_environment_type() : 'production',
	);

	// Call the custom API.
	$response = wp_remote_post(
		EDD_SAMPLE_STORE_URL,
		array(
			'timeout'   => 15,
			'sslverify' => false,
			'body'      => $api_params,
		)
	);

	if ( is_wp_error( $response ) ) {
		return false;
	}

	$license_data = json_decode( wp_remote_retrieve_body( $response ) );

	if ( 'valid' === $license_data->license ) {
		echo 'valid';
		exit;
		// this license is still valid
	} else {
		echo 'invalid';
		exit;
		// this license is no longer valid
	}
}

/**
 * This is a means of catching errors from the activation method above and displaying it to the customer
 */
function edd_sample_admin_notices() {
	if ( isset( $_GET['sl_activation'] ) && ! empty( $_GET['message'] ) ) {

		switch ( $_GET['sl_activation'] ) {

			case 'false':
				$message = urldecode( $_GET['message'] );
				?>
				<div class="error">
					<p><?php echo wp_kses_post( $message ); ?></p>
				</div>
				<?php
				break;

			case 'true':
			default:
				// Developers can put a custom success message here for when activation is successful if they way.
				break;

		}
	}
}
add_action( 'admin_notices', 'edd_sample_admin_notices' );
