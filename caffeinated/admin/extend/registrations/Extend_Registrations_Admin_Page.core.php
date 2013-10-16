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
 * Extend_Registrations_Admin_Page
 *
 * This is the Registrations Caffeinated admin page.
 *
 *
 * @package		Extend_Registrations_Admin_Page
 * @subpackage	caffeinated/admin/extend/registrations/Extend_Registrations_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Registrations_Admin_Page extends Registrations_Admin_Page {

	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
		define( 'REG_CAF_TEMPLATE_PATH', EE_CORE_CAF_ADMIN_EXTEND . 'registrations/templates/');
		define( 'REG_CAF_ASSETS', EE_CORE_CAF_ADMIN_EXTEND . 'registrations/assets/');
		define( 'REG_CAF_ASSETS_URL', EE_CORE_CAF_ADMIN_EXTEND_URL . 'registrations/assets/');
	}


	



	protected function _extend_page_config() {
		$this->_admin_base_path = EE_CORE_CAF_ADMIN_EXTEND . 'registrations';
		$new_page_routes = array(
			'reports' => '_registration_reports'
			);

		$this->_page_routes = array_merge( $this->_page_routes, $new_page_routes );

		$new_page_config = array(
			'reports' => array(
				'nav' => array(
					'label' => __('Reports', 'event_espresso'),
					'order' => 30
					)
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
		
		wp_register_script('espresso_reg_admin_regs_per_day', REG_CAF_ASSETS_URL  . 'espresso_reg_admin_regs_per_day_report.js', array('jqplot-all'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_register_script('espresso_reg_admin_regs_per_event', REG_CAF_ASSETS_URL . 'espresso_reg_admin_regs_per_event_report.js', array('jqplot-all'), EVENT_ESPRESSO_VERSION, TRUE );
	}







	/**
	 * 		generates Business Reports regarding Registrations
	*		@access protected
	*		@return void
	*/
	protected function _registration_reports() {

		do_action('AHEE_log', __FILE__, __FUNCTION__, '');
	
		$page_args = array();
		
		$page_args['admin_reports'][] = $this->_registrations_per_day_report( '-1 month' );  //  option: '-1 week', '-2 weeks' defaults to '-1 month'
		$page_args['admin_reports'][] = $this->_get_registrations_per_event_report( '-1 month' ); //  option: '-1 week', '-2 weeks' defaults to '-1 month'
//		$page_args['admin_reports'][] = 'chart1';
		
		$template_path = EE_CORE_ADMIN_TEMPLATE . 'admin_reports.template.php';
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( $template_path, $page_args, TRUE );
		
//		printr( $page_args, '$page_args' );
		
		// the final template wrapper
		$this->display_admin_page_with_no_sidebar();

	}






	/**
	 * 		generates Business Report showing total registratiopns per day
	*		@access private
	*		@return void
	*/
	private function _registrations_per_day_report( $period = '-1 month' ) {
	
		$report_ID = 'reg-admin-registrations-per-day-report-dv';
		$report_JS = 'espresso_reg_admin_regs_per_day';
		
		wp_enqueue_script( $report_JS );

		require_once ( EE_MODELS . 'EEM_Registration.model.php' );
	    $REG = EEM_Registration::instance();
	 
		if( $results = $REG->get_registrations_per_day_report( $period ) ) {		
			//printr( $results, '$registrations_per_day' );
			$regs = array();
			$xmin = date( 'Y-m-d', strtotime( '+1 year' ));
			$xmax = 0;
			$ymax = 0;
			foreach ( $results as $result ) {
				$regs[] = array( $result->regDate, (int)$result->total );
				$xmin = strtotime( $result->regDate ) < strtotime( $xmin ) ? $result->regDate : $xmin;
				$xmax = strtotime( $result->regDate ) > strtotime( $xmax ) ? $result->regDate : $xmax;
				$ymax = $result->total > $ymax ? $result->total : $ymax;
			}
			
			$xmin = date( 'Y-m-d', strtotime( date( 'Y-m-d', strtotime($xmin)) . ' -1 day' ));			
			$xmax = date( 'Y-m-d', strtotime( date( 'Y-m-d', strtotime($xmax)) . ' +1 day' ));
			// calculate # days between our min and max dates				
			$span = floor( (strtotime($xmax) - strtotime($xmin)) / (60*60*24)) + 1;
			
			$report_params = array(
					'title' 	=> __( 'Total Registrations per Day', 'event_espresso' ),
					'id' 		=> $report_ID,
					'regs' 	=> $regs,												
					'xmin' 	=> $xmin,
					'xmax' 	=> $xmax,
					'ymax' 	=> ceil($ymax * 1.25),
					'span' 	=> $span,
					'width'	=> ceil(900 / $span)												
				);
			wp_localize_script( $report_JS, 'regPerDay', $report_params );
		}
												
		return $report_ID;
	}






	/**
	 * 		generates Business Report showing total registratiopns per event
	*		@access private
	*		@return void
	*/
	private function _get_registrations_per_event_report( $period = '-1 month' ) {
	
		$report_ID = 'reg-admin-registrations-per-event-report-dv';
		$report_JS = 'espresso_reg_admin_regs_per_event';
		
		wp_enqueue_script( $report_JS );

		require_once ( EE_MODELS . 'EEM_Registration.model.php' );
	    $REG = EEM_Registration::instance();
	 
		if( $results = $REG->get_registrations_per_event_report( $period ) ) {		
			//printr( $results, '$registrations_per_event' );
			$regs = array();
			$ymax = 0;
			foreach ( $results as $result ) {
				$regs[] = array( $result->event_name, (int)$result->total );
				$ymax = $result->total > $ymax ? $result->total : $ymax;
			}	

			$span = $period == 'week' ? 9 : 33;

			$report_params = array(
				'title' 	=> __( 'Total Registrations per Event', 'event_espresso' ),
				'id' 		=> $report_ID,
				'regs' 	=> $regs,												
				'ymax' 	=> ceil($ymax * 1.25),
				'span' 	=> $span,
				'width'	=> ceil(900 / $span)								
			);
			wp_localize_script( $report_JS, 'regPerEvent', $report_params );		
		}

		return $report_ID;
	}



} //end class Registrations Admin Page