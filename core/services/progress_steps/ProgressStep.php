<?php
namespace EventEspresso\core\services\progress_steps;

use  EventEspresso\core\exceptions\InvalidDataTypeException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class ProgressStep
 * class primarily intended for use with \EventEspresso\core\services\progress_steps\ProgressStepManager
 * that defines the details of a particular form step and it's current state within a sequence of form steps
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         4.9.0
 */
class ProgressStep implements ProgressStepInterface{


	/**
	 * @var boolean $current
	 */
	private $current = false;


	/**
	 * @var boolean $completed
	 */
	private $completed = false;


	/**
	 * @var string $html_class
	 */
	private $html_class;

	/**
	 * @var string $id
	 */
	private $id = '';

	/**
	 * @var int $order
	 */
	private $order = 0;

	/**
	 * @var string $text
	 */
	private $text = '';



	/**
	 * ProgressStep constructor
	 *
	 * @param int $order
	 * @param string $id
	 * @param string $html_class
	 * @param string $text
	 * @throws InvalidDataTypeException
	 */
	public function __construct( $order, $id, $html_class, $text ) {
		$this->setOrder( $order );
		$this->setId( $id );
		$this->setHtmlClass( $html_class );
		$this->setText( $text );
	}



	/**
	 * @return boolean
	 */
	public function isCurrent() {
		return $this->current;
	}



	/**
	 * @param boolean $current
	 */
	public function setIsCurrent( $current = true ) {
		$this->current = filter_var( $current, FILTER_VALIDATE_BOOLEAN );
	}



	/**
	 * @return boolean
	 */
	public function isCompleted() {
		return $this->completed;
	}



	/**
	 * @param boolean $completed
	 */
	public function setIsCompleted( $completed = true ) {
		$this->completed = filter_var( $completed, FILTER_VALIDATE_BOOLEAN );
	}



	/**
	 * @return string
	 */
	public function id() {
		return $this->id;
	}



	/**
	 * @access protected
	 * @param string $id
	 * @throws InvalidDataTypeException
	 */
	protected function setId( $id = '' ) {
		if ( ! is_string( $id ) ) {
			throw new InvalidDataTypeException( '$id', $id, 'string' );
		}
		$this->id = $id;
	}




	/**
	 * @return int
	 */
	public function order() {
		return $this->order;
	}



	/**
	 * @access protected
	 * @param int $order
	 * @throws InvalidDataTypeException
	 */
	protected function setOrder( $order = 0 ) {
		if ( ! is_int( $order ) ) {
			throw new InvalidDataTypeException( '$order', $order, 'integer' );
		}
		$this->order = $order;
	}



	/**
	 * @return string
	 */
	public function htmlClass() {
		$html_class = $this->html_class;
		if ( $this->isCurrent() ) {
			$html_class .= ' progress-step-active';
		} else if ( $this->isCompleted() ) {
			$html_class .= ' progress-step-completed';
		}
		return $html_class;
	}



	/**
	 * @access protected
	 * @param string $html_class
	 * @throws InvalidDataTypeException
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
	 * @throws InvalidDataTypeException
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