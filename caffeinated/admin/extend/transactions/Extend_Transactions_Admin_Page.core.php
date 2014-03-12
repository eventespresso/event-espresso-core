<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Extend_Transactions_Admin_Page
 *
 * This is the Transactions Caffeinated admin page.
 *
 *
 * @package		Extend_Transactions_Admin_Page
 * @subpackage	caffeinated/admin/extend/transactions/Extend_Transactions_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Transactions_Admin_Page extends Transactions_Admin_Page {


	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
		define( 'TXN_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'transactions/templates/');
		define( 'TXN_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'transactions/assets/');
		define( 'TXN_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'transactions/assets/');
	}




	protected function _extend_page_config() {
		$this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'transactions';
		$new_page_routes = array(
			'reports' => '_transaction_reports'
			);

		$this->_page_routes = array_merge( $this->_page_routes, $new_page_routes );

		$new_page_config = array(
			'reports' => array(
				'nav' => array(
					'label' => __('Reports', 'event_espresso'),
					'order' => 20
					),
                'help_tabs' => array(
					'transactions_reports_help_tab' => array(
						'title' => __('Transaction Reports', 'event_espresso'),
						'filename' => 'transactions_reports'
					)
				),
				'help_tour' => array( 'Transaction_Reports_Help_Tour' ),
				'require_nonce' => FALSE
				)
			);
		$this->_page_config = array_merge( $this->_page_config, $new_page_config );
	}

	public function load_scripts_styles_reports() {
		//styles
		wp_enqueue_style('jquery-jqplot-css');

		//scripts
		global $is_IE;
		if ( $is_IE ) {
			wp_enqueue_script( 'excanvas' );
		}
		wp_enqueue_script('jqplot-all');
	}


	/**
	 * 		generates Business Reports regarding Transactions
	*		@access protected
	*		@return void
	*/
	protected function _transaction_reports() {
	
		$page_args = array();
		
		$page_args['admin_reports'][] = $this->_revenue_per_day_report( '-1 month' );  //  option: '-1 week', '-2 weeks' defaults to '-1 month'
		$page_args['admin_reports'][] = $this->_revenue_per_event_report( '-1 month' ); //  option: '-1 week', '-2 weeks' defaults to '-1 month'
//		$page_args['admin_reports'][] = 'chart1';
		
		$template_path = EE_ADMIN_TEMPLATE . 'admin_reports.template.php';
		$this->_admin_page_title = __('Transactions', 'event_espresso');
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( $template_path, $page_args, TRUE );
		
		
		// the final template wrapper
		$this->display_admin_page_with_no_sidebar();
		
	}






	/**
	 * 		generates Business Report showing Total Revenue per Day
	*		@access private
	*		@return void
	*/
	private function _revenue_per_day_report( $period = '-1 month' ) {
	
		$report_ID = 'txn-admin-revenue-per-day-report-dv';
		$report_JS = 'espresso_txn_admin_revenue_per_day';
		
		wp_enqueue_script( $report_JS, TXN_CAF_ASSETS_URL . $report_JS . '_report.js', array('jqplot-all'), '1.0', TRUE);

	    $TXN = EEM_Transaction::instance();

	    $results = $TXN->get_revenue_per_day_report( $period );	
		//printr( $results, '$registrations_per_day' );
		$revenue = array();
		$xmin = date( 'Y-m-d', strtotime( '+1 year' ));
		$xmax = 0;
		$ymax = 0;

		$results = (array) $results;

		foreach ( $results as $result ) {
			$revenue[] = array( $result->txnDate, (float)$result->revenue );
			$xmin = strtotime( $result->txnDate ) < strtotime( $xmin ) ? $result->txnDate : $xmin;
			$xmax = strtotime( $result->txnDate ) > strtotime( $xmax ) ? $result->txnDate : $xmax;
			$ymax = $result->revenue > $ymax ? $result->revenue : $ymax;
		}
		
		$xmin = date( 'Y-m-d', strtotime( date( 'Y-m-d', strtotime($xmin)) . ' -1 day' ));			
		$xmax = date( 'Y-m-d', strtotime( date( 'Y-m-d', strtotime($xmax)) . ' +1 day' ));
		// calculate # days between our min and max dates				
		$span = floor( (strtotime($xmax) - strtotime($xmin)) / (60*60*24)) + 1;

		$report_title = __( 'Total Revenue per Day' );
		
		$report_params = array(
			'title' 		=> $report_title,
			'id' 			=> $report_ID,
			'revenue' => $revenue,												
			'xmin' 		=> $xmin,
			'xmax' 		=> $xmax,
			'ymax' 		=> ceil($ymax * 1.25),
			'span' 		=> $span,
			'width'		=> ceil(900 / $span),
			'noTxnMsg'	=> sprintf( __('<h2>%s</h2><p>There are currently no transaction records in the last month for this report.</p>', 'event_espresso'), $report_title )											
		);
		wp_localize_script( $report_JS, 'txnRevPerDay', $report_params );
											
		return $report_ID;
	}






	/**
	 * 		generates Business Report showing total revenue per event
	*		@access private
	*		@return void
	*/
	private function _revenue_per_event_report( $period = '-1 month' ) {
	
		$report_ID = 'txn-admin-revenue-per-event-report-dv';
		$report_JS = 'espresso_txn_admin_revenue_per_event';
		
		wp_enqueue_script( $report_JS, TXN_CAF_ASSETS_URL . $report_JS . '_report.js', array('jqplot-all'), '1.0', TRUE);

	    $TXN = EEM_Transaction::instance();

	    $results = $TXN->get_revenue_per_event_report( $period );
	 	
		//printr( $results, '$registrations_per_event' );
		$revenue = array();
		$results = (array) $results;
		foreach ( $results as $result ) {
			$event_name = stripslashes( html_entity_decode( $result->event_name, ENT_QUOTES, 'UTF-8' ));
			$event_name = wp_trim_words( $event_name, 5, '...' );				
			$revenue[] = array( $event_name, (float)$result->revenue );
		}	

		$span = $period == 'week' ? 9 : 33;

		$report_title = __( 'Total Revenue per Event' );

		$report_params = array(
			'title' 		=> $report_title,
			'id' 			=> $report_ID,
			'revenue'	=> $revenue,												
			'span' 		=> $span,
			'width'		=> ceil(900 / $span),
			'noTxnMsg'	=> sprintf( __('<h2>%s</h2><p>There are currently no transaction records in the last month for this report.</p>', 'event_espresso'), $report_title )							
		);
		wp_localize_script( $report_JS, 'revenuePerEvent', $report_params );

		return $report_ID;
	}

}