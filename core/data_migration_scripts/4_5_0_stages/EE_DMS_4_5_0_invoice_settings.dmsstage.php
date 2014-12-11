<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * Event Espresso
 *
 * Event Registration and Ticketing Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author			    Event Espresso
 * @ copyright		(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	$VID:$
 *
 * ------------------------------------------------------------------------
 *
 * class EE_DMS_4_5_0_invoice_settings
 * The purpose of this DMS is to check that critical page shortcodes,
 * like those for the Thank You or Transactions pages, are removed from the "Posts Page"
 * in the post shortcodes array, which tracks what shortcodes are used on what posts.
 * The reason for this is because critical pages should NOT be getting displayed on the site's "Posts Page"
 * nor should those page's shortcodes be getting initialized or run.
 *
 * @package			Event Espresso
 * @subpackage		/core/data_migration_scripts/4_3_0_stages/
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_DMS_4_5_0_invoice_settings extends EE_Data_Migration_Script_Stage {

	/**
	 * Just initializes the status of the migration
	 */
	public function __construct() {
		$this->_pretty_name = __( 'Update Critical Page Shortcode Tracking', 'event_espresso' );
		parent::__construct();
	}



	/**
	 * _count_records_to_migrate
	 * Counts the records to migrate; the public version may cache it
	 *
	 * @access protected
	 * @return int
	 */
	protected function _count_records_to_migrate() {
		return 1;
	}



	/**
	 *	_migration_step
	 *
	 * @access protected
	 * @param int $num_items
	 * @throws EE_Error
	 * @return int number of items ACTUALLY migrated
	 */
	protected function _migration_step( $num_items = 1 ){
		// if this isn't set then something is really wrong
		if ( ! EE_Config::instance()->gateway instanceof EE_Gateway_Config ) {
			throw new EE_Error( __( 'It appears the Event Espresso Core Configuration is not setup correctly.', 'event_espresso' ));
		}
		$invoice_settings = isset( EE_Config::instance()->gateway->payment_settings[ 'Invoice' ] ) ? EE_Config::instance()->gateway->payment_settings[ 'Invoice' ] : NULL;
		if( ! $invoice_settings ){
			$this->add_error( __( 'Could not migrate EE4.4 invoice settings to EE4.5 because they didnt exist', 'event_espresso' ) );
		}else{
			$invoice_settings[ 'template_payment_instructions' ] = $invoice_settings[ 'pdf_instructions' ];
			$invoice_settings[ 'template_invoice_payee_name' ] = $invoice_settings[ 'payable_to' ];
			$invoice_settings[ 'template_invoice_address' ] = $invoice_settings[ 'payment_address' ];
			unset( $invoice_settings[ 'pdf_instructions' ] );
			unset( $invoice_settings[ 'payable_to' ] );
			unset( $invoice_settings[ 'payment_address' ] );
			EE_Config::instance()->gateway->payment_settings[ 'Invoice' ] = $invoice_settings;
			EE_Config::instance()->update_espresso_config(false,false);

			//@todo: check 'invoice_css' too because we can't easily affect that so we might need to set a persistent notice
			//(why is it tough to change? because we want to update the receipt and invoice message template, but
			//message templates are only initialized AFTER migrations and those two are new in 4.5. So if we wanted to
			//update them from a DMS, we'd need to have the DMS create the message templates which is quite a lot of code;
			//also we don't want to build a dependency on the messages code because it is likely to change soon
			if( ! in_array( $invoice_settings[ 'invoice_css' ], array( '', 'simple.css' ) ) ){
				EE_Error::add_persistent_admin_notice( 'invoice_css_not_updated', sprintf( __( 'You had previously set your Invoice Payment Method\'s stylesheet to be %1$s, but that setting has moved. PDF and HTML Invoices and Receipts are now Messages, which means you can easily modify them from your Wordpress Dashboard instead of using filters or uploading template files. Please visit Messages -> Receipt and Messages -> Invoice to change their stylesheets.', 'event_espresso'), $invoice_settings[ 'invoice_css' ] ), FALSE );
			}
			EE_Registry::instance()->load_helper( 'Template' );
			$templates_relative_path = 'modules/gateways/Invoice/lib/templates/';
			$overridden_invoice_body = EEH_Template::locate_template( $templates_relative_path . 'invoice_body.template.php', NULL, FALSE, FALSE, TRUE );
			$overridden_receipt_body= EEH_Template::locate_template( $templates_relative_path . 'receipt_body.template.php', NULL, FALSE, FALSE, TRUE );
			if( $overridden_invoice_body || $overridden_receipt_body ) {
				EE_Error::add_persistent_admin_notice( 'invoice_overriding_templates', sprintf( __( 'Note: in this version of Event Espresso, PDF and HTML Invoices and Receipts are now Messages are can be changed just like any other messages; however we noticed you had previously overriden the old default Invoice/Receipt templates. Because of this, your old Invoice/Receipt templates will continue to be used INSTEAD of the new Invoice/Receipt message equivalents. We recommend deleting your old Invoice/Receipt templates and modifying the new Invoice and Receipt messages\'s content in Messages -> Invoice and Messages -> Receipt.')), TRUE );
			}

		}
		//regardless of whether it worked or not, we ought to continue the migration
		$this->set_completed();
		return 1;
	}



    /**
     * 	_get_page_for_posts
     *
     * 	if the wp-option "show_on_front" is set to "page", then this is the post_name for the post set in the wp-option "page_for_posts", or "posts" if no page is selected
     *
     *
     *  @access 	private
     *  @return 	string
     */
    private function _get_page_for_posts() {
        $page_for_posts = get_option( 'page_for_posts' );
        if ( ! $page_for_posts ) {
            return 'posts';
        }
        global $wpdb;
        $SQL = 'SELECT post_name from ' . $wpdb->posts . ' WHERE post_type="posts" OR post_type="page" AND post_status="publish" AND ID=%s';
        return $wpdb->get_var( $wpdb->prepare( $SQL, $page_for_posts ));
    }



    /**
     *    _update_post_shortcodes
     *
     * @access    private
     * @param $page_for_posts
     * @return    void
     */
    private function _update_post_shortcodes( $page_for_posts = '' ) {
        // critical page shortcodes that we do NOT want added to the Posts page (blog)
        $critical_shortcodes = EE_Config::instance()->core->get_critical_pages_shortcodes_array();
        // verify that post_shortcodes is set
        EE_Config::instance()->core->post_shortcodes = isset( EE_Config::instance()->core->post_shortcodes ) && is_array( EE_Config::instance()->core->post_shortcodes ) ? EE_Config::instance()->core->post_shortcodes : array();
        //  just in case the site has ever had posts on frontpage at some time, then we should check for a "Posts Page" named "posts"
        $post_pages_to_check = $page_for_posts == 'posts' ? array( $page_for_posts ) : array( 'posts', $page_for_posts );
        // cycle thru post_shortcodes
        foreach( $post_pages_to_check as $post_page ){
            // cycle thru post_shortcodes
            foreach( EE_Config::instance()->core->post_shortcodes as $post_name => $shortcodes ){
                // are there any shortcodes to track ?
                if ( ! empty( $shortcodes )) {
                    // loop thru list of tracked shortcodes
                    foreach( $shortcodes as $shortcode => $post_id ) {
                        // if shortcode is for a critical page, BUT this is NOT the corresponding critical page for that shortcode
                        if ( isset( $critical_shortcodes[ $post_id ] ) && $post_name == $post_page ) {
                            // then remove this shortcode, because we don't want critical page shortcodes like ESPRESSO_TXN_PAGE running on the "Posts Page" (blog)
                            unset( EE_Config::instance()->core->post_shortcodes[ $post_name ][ $shortcode ] );
                        }
                        // skip the posts page, because we want all shortcodes registered for it
                        if ( $post_name == $post_page ) {
                            continue;
                        }
                        // make sure post still exists
                        $post = get_post( $post_id );
                        if ( $post ) {
                            // check that the post name matches what we have saved
                            if ( $post->post_name == $post_name ) {
                                // if so, then break before hitting the unset below
                                continue;
                            }
                        }
                        // we don't like missing posts around here >:(
                        unset( EE_Config::instance()->core->post_shortcodes[ $post_name ] );
                    }
                } else {
                    // you got no shortcodes to keep track of !
                    unset( EE_Config::instance()->core->post_shortcodes[ $post_name ] );
                }
            }
        }
   }




}
// End of file EE_DMS_4_5_0_invoice_settings.dmsstage.php
// Location: /core/data_migration_scripts/4_3_0_stages/EE_DMS_4_5_0_invoice_settings.dmsstage.php