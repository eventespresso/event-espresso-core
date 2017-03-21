<?php namespace EventEspresso\core\libraries\rest_api\changes;

/*
 * @deprecated use ChangesInBase instead
 */

abstract class Changes_In_Base {

	/**
	 * The version that these changes happened
	 * @var string
	 */
	protected $_version = null;
	/**
	 * Called when an EE4 REST API request is made to an earlier version than
	 * what is indicated in this class' name.
	 * Uses WordPress' add_filter and add_action to modify the EE4 REST API's response
	 * so that regardless of what version of EE4 core is running, API clients
	 * will have a consistent response
	 * @return void
	 */
	abstract public function set_hooks();

	/**
	 * Returns whether or not this class' name indicates its hooks should
	 * apply when a request comes in for $requested_version. A class can use
	 * other conditions when determining whether to perform their callbacks or not,
	 * but this will typically be enough
	 * @param string $requested_version eg "4.8.33"
	 * @return boolean true: this class' name indicates its filters and actions
	 * should take effect. False: this class' name indicates it shouldn't do anything
	 */
	public function applies_to_version( $requested_version ) {
		if( $this->version() > $requested_version ) {
			return true;
		}
		return false;
	}

	/**
	 * Gets the EE core version when this changes were made to the rest api.
	 * Any requests to earlier versions should have modifications made to them
	 * by the callbacks of this class.
	 * @return string eg "4.8.33"
	 * @throws \EE_Error
	 */
	public function version() {
		if( $this->_version === null ) {
			$matches = array();
			$regex = '~Changes_In_(.*)_(.*)_(.*)$~';
			$success = preg_match(
				$regex,
				get_class( $this ),
				$matches
			);
			if( ! $success ) {
				throw new \EE_Error(
					sprintf(
						__( 'The class %1$s was misnamed. It name should match the regex "%2$s"', 'event_espresso' ),
						get_class( $this ),
						$regex
					)
				);
			}
			$this->_version = $matches[1] . '.' . $matches[2] . '.' . $matches[3];
		}
		return $this->_version;
	}
}

