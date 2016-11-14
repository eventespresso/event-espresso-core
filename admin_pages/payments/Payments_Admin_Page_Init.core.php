<?php
use EventEspresso\core\services\database\TableAnalysis;
if (!defined('EVENT_ESPRESSO_VERSION') ){
	exit('NO direct script access allowed');
}
/**
 * Payments_Admin_Page_Init
 *
 * This is the init for the EE Payments Admin Pages.  See EE_Admin_Page_Init for method inline docs.
 *
 *
 * @package		Payments_Admin_Page_Init
 * @subpackage	includes/core/admin/Payments_Admin_Page_Init.core.php
 * @author		Darren Ethier
 */
class Payments_Admin_Page_Init extends EE_Admin_Page_Init {

	/**
	 * @var \EventEspresso\core\services\database\TableAnalysis $table_analysis
	 */
	protected $_table_analysis;



	/**
	 * Payments_Admin_Page_Init constructor.
	 */
	public function __construct() {
		//define some page related constants
		define( 'EE_PAYMENTS_PG_SLUG', 'espresso_payment_settings' );
		define( 'EE_PAYMENTS_ADMIN_URL', admin_url( 'admin.php?page=' . EE_PAYMENTS_PG_SLUG ));
		define( 'EE_PAYMENTS_ADMIN', EE_ADMIN_PAGES . 'payments' . DS );
		define( 'EE_PAYMENTS_TEMPLATE_PATH', EE_PAYMENTS_ADMIN . 'templates' . DS );
		define( 'EE_PAYMENTS_ASSETS_URL', EE_ADMIN_PAGES_URL . 'payments/assets/' );
		$this->_table_analysis = EE_Registry::instance()->create( 'TableAnalysis', array(), true );
		//check that there are active gateways on all admin page loads. but dont do it just yet
//		echo "constructing payments admin page";die;
		add_action('admin_notices',array($this,'check_payment_gateway_setup'));

		// Show/hide PP Standard along side PP Express.
		add_filter( 'FHEE__Payments_Admin_Page___payment_methods_list__payment_methods', array( $this, 'unset_pp_standard' ) );

		parent::__construct();
	}

	protected function _set_init_properties() {
		$this->label = __('Payment Methods', 'event_espresso');
	}



	/**
	 * _set_menu_map
	 *
	 * @return void
	 */
	protected function _set_menu_map() {
		$this->_menu_map = new EE_Admin_Page_Sub_Menu(
			array(
				'menu_group'      => 'settings',
				'menu_order'      => 30,
				'show_on_menu'    => EE_Admin_Page_Menu_Map::BLOG_ADMIN_ONLY,
				'parent_slug'     => 'espresso_events',
				'menu_slug'       => EE_PAYMENTS_PG_SLUG,
				'menu_label'      => __( 'Payment Methods', 'event_espresso' ),
				'capability'      => 'ee_manage_gateways',
				'admin_init_page' => $this,
			)
		);
	}



	/**
	 * Checks that there is at least one active gateway. If not, add a notice
	 *
	 * @throws \EE_Error
	 */
	public function check_payment_gateway_setup(){
		//ONLY do this check if models can query
		//and avoid a bug where when we nuke EE4's data that this causes a fatal error
		//because the tables are deleted just before this request runs. see https://events.codebasehq.com/projects/event-espresso/tickets/7539
		if (
			! EE_Maintenance_Mode::instance()->models_can_query()
			|| ! $this->_get_table_analysis()->tableExists( EEM_Payment_Method::instance()->table() )
		) {
			return;
		}


		// ensure Payment_Method model is loaded
		EE_Registry::instance()->load_model( 'Payment_Method' );
		$actives = EEM_Payment_Method::instance()->count_active( EEM_Payment_Method::scope_cart );
		if( $actives  < 1 ){
			$url = EE_Admin_Page::add_query_args_and_nonce(array(), EE_PAYMENTS_ADMIN_URL);
			echo '<div class="error">
				 <p>'.  sprintf(__("There are no Active Payment Methods setup for Event Espresso. Please %s activate at least one.%s", "event_espresso"),"<a href='$url'>","</a>").'</p>
			 </div>';
		}
	}
	
	/**
	 * Gets the injected table analyzer, or throws an exception
	 * @return TableAnalysis
	 * @throws \EE_Error
	 */
	protected function _get_table_analysis() {
		if( $this->_table_analysis instanceof TableAnalysis ) {
			return $this->_table_analysis;
		} else {
			throw new \EE_Error( 
				sprintf( 
					__( 'Table analysis class on class %1$s is not set properly.', 'event_espresso'), 
					get_class( $this ) 
				) 
			);
		}
	}



	/**
	 * Hide PayPal Standard for "new" users.
	 */
	public static function unset_pp_standard( $payment_method_types ) {
		$pps = EEM_Payment_Method::instance()->get_one_of_type( 'Paypal_Standard' );
		$ppstandard_active = ( ! empty($pps) ) ? $pps->active() : false;
		$ppstandard_active_before = false;
		if ( $pps ) {
			// PP Standard used before ?
			$paypal_id = $pps->get_extra_meta( 'paypal_id', TRUE );
			if ( $paypal_id && ! empty($paypal_id) ) {
				$ppstandard_active_before = true;
			}
		}

		// Not using PP Standard? Then display only PayPal Express, do not show PayPal Standard.
		if ( apply_filters( 'FHEE__EE_PMT_Paypal_Express__register_payment_methods__hide_paypal_standard', ! $ppstandard_active && ! $ppstandard_active_before ) ) {
			unset($payment_method_types['paypal_standard']);
		}
		return $payment_method_types;
	}

} //end class Payments_Admin_Page_Init
