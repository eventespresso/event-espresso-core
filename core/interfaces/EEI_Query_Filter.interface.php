<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 * This interface is implemented by EEM_Base classes that will return extra
 * query params for usage in EEM_Base queries.
 *
 * @package    Event Espresso
 * @subpackage interfaces
 * @since      4.9.0
 * @author     Darren Ethier
 */
interface EEI_Query_Filter  {


	/**
	 * Detects any specific query variables in the request and uses those to setup appropriate
	 * filter for any queries.
	 * @return array
	 */
	public function filter_by_query_params();
}