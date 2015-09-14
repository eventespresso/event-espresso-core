<?php
//namespace EventEspresso\core\libraries\templates;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * Class EE_Template_Part
 *
 * class for holding details about a template part
 *
 * @package               Event Espresso
 * @subpackage            core
 * @author                Brent Christensen
 * @since                 $VID:$
 *
 */
class EE_Template_Part {


	/**
	 * @type string $name
	 */
	protected $name;

	/**
	 * @type string $template
	 */
	protected $template;

	/**
	 * @type int $priority
	 */
	protected $priority;



	/**
	 *    class constructor
	 * @param string $name
	 * @param string $template
	 * @param int   $priority
	 */
	public function __construct( $name, $template, $priority = 100 ) {
		$this->set_name( $name );
		$this->set_template( $template );
		$this->set_priority( $priority );
	}



	/**
	 * @return mixed
	 */
	public function name() {
		return $this->name;
	}



	/**
	 * @param mixed $name
	 */
	public function set_name( $name ) {
		$this->name = $name;
	}



	/**
	 * @return array
	 */
	public function template() {
		return $this->template;
	}



	/**
	 * @param string $template
	 */
	public function set_template( $template ) {
		$this->template = $template;
	}



	/**
	 * @return int
	 */
	public function priority() {
		return $this->priority;
	}



	/**
	 * @param int $priority
	 */
	public function set_priority( $priority ) {
		$this->priority = intval( $priority );
	}



}
// End of file EE_Template_Part
// Location: core/libraries/templates/EE_Template_Part.class.php