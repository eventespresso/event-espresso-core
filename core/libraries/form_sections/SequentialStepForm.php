<?php
namespace EventEspresso\core\libraries\form_sections;

use EventEspresso\Core\Exceptions\InvalidDataTypeException;
use InvalidArgumentException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class SequentialStepForm
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
abstract class SequentialStepForm extends Form implements SequentialStepFormInterface {

	/**
	 * @var int $order
	 */
	private $order = 1;



	/**
	 * SequentialStepForm constructor.
	 *
	 * @param int    $order
	 * @param string $form_name
	 * @param string $admin_name
	 * @param string $slug
	 * @throws InvalidDataTypeException
	 * @throws InvalidArgumentException
	 */
	public function __construct( $order, $form_name, $admin_name, $slug ) {
		$this->setOrder( $order );
		parent::__construct( $form_name, $admin_name, $slug );
	}



	/**
	 * @return int
	 */
	public function order() {
		return $this->order;
	}



	/**
	 * @param int $order
	 * @throws InvalidArgumentException
	 */
	public function setOrder( $order ) {
		$order = absint( $order );
		if ( ! $order > 0 ) {
			throw new InvalidArgumentException(
				__( 'The form order property must be a positive integer.', 'event_espresso' )
			);
		}
		$this->order = $order;
	}



}
// End of file SequentialStepForm.php
// Location: /SequentialStepForm.php