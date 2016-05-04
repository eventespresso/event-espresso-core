<?php
namespace EventEspresso\core\services\progress_steps;

use EventEspresso\Core\Exceptions\InvalidDataTypeException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class ProgressStep
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 */
class ProgressStep implements ProgressStepInterface{


	/**
	 * @var boolean $is_current
	 */
	protected $is_current;


	/**
	 * @var string $html_class
	 */
	protected $html_class;

	/**
	 * @var int|string $id
	 */
	protected $id;

	/**
	 * @var string $text
	 */
	protected $text;



	/**
	 * ProgressStep constructor
	 *
	 * @param int|string $id
	 * @param string     $html_class
	 * @param string     $text
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	public function __construct( $id, $html_class, $text ) {
		$this->setId( $id );
		$this->setHtmlClass( $html_class );
		$this->setText( $text );
	}



	/**
	 * @return boolean
	 */
	public function isCurrent() {
		return $this->is_current;
	}



	/**
	 * @param boolean $is_current
	 */
	public function setIsCurrent( $is_current = true ) {
		$this->is_current = filter_var( $is_current, FILTER_VALIDATE_BOOLEAN );
	}



	/**
	 * @return int|string
	 */
	public function id() {
		return $this->id;
	}



	/**
	 * @access protected
	 * @param int|string $id
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	protected function setId( $id = 0 ) {
		if ( ! ( is_int( $id ) || is_string( $id ) ) ) {
			throw new InvalidDataTypeException( '$id', $id, 'integer or string' );
		}
		$this->id = $id;
	}



	/**
	 * @return string
	 */
	public function htmlClass() {
		return $this->is_current ? $this->html_class . ' progress-step-active' : $this->html_class;
	}



	/**
	 * @access protected
	 * @param string $html_class
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	protected function setHtmlClass( $html_class ) {
		if ( ! is_string( $html_class ) ) {
			throw new InvalidDataTypeException( '$html_class', $html_class, 'string' );
		}
		if ( strpos( $html_class, 'progress-step-' ) === false ) {
			$html_class = 'progress-step-' . $html_class;
		}
		$this->html_class = $html_class;
	}



	/**
	 * @return string
	 */
	public function text() {
		return $this->text;
	}



	/**
	 * @access protected
	 * @param string $text
	 * @throws \EventEspresso\Core\Exceptions\InvalidDataTypeException
	 */
	protected function setText( $text ) {
		if ( ! is_string( $text ) ) {
			throw new InvalidDataTypeException( '$text', $text, 'string' );
		}
		$this->text = $text;
	}



}
// End of file ProgressStep.php
// Location: /ProgressStep.php