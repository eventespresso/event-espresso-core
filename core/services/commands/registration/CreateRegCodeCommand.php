<?php
namespace EventEspresso\core\services\commands\registration;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\commands\Command;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CreateRegCodeCommand
 * DTO for passing data to a CreateRegCodeCommandHandler
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateRegCodeCommand extends Command
{

	/**
	 * REG_url_link for EE_Registration
	 *
	 * @var string $reg_url_link
	 */
	private $reg_url_link;

	/**
	 * ID for EE_Transaction
	 *
	 * @var int $TXN_ID
	 */
	private $TXN_ID;

	/**
	 * ID for EE_Ticket
	 *
	 * @var int $TKT_ID
	 */
	private $TKT_ID;

	/**
	 * @var string $reg_code
	 */
	protected $reg_code;



	/**
	 * @param \EE_Registration $registration
	 * @return CreateRegCodeCommand
	 */
	public static function fromRegistration(
		\EE_Registration $registration
	) {
		return new self(
			$registration->reg_url_link(),
			$registration->transaction_ID(),
			$registration->ticket_ID()
		);
	}



	/**
	 * CreateRegCodeCommand constructor.
	 *
	 * @param string              $reg_url_link
	 * @param int                 $TXN_ID
	 * @param int                 $TKT_ID
	 */
	public function __construct(
		$reg_url_link,
		$TXN_ID,
		$TKT_ID
	) {
		if ( empty( $reg_url_link ) || ! is_string( $reg_url_link ) ) {
			throw new InvalidDataTypeException( '$reg_url_link', $reg_url_link, 'string' );
		}
		$this->reg_url_link = $reg_url_link;
		$this->TXN_ID = absint( $TXN_ID );
		$this->TKT_ID = absint( $TKT_ID );
	}



	/**
	 * @return string
	 */
	public function regUrlLink() {
		return $this->reg_url_link;
	}



	/**
	 * @return int
	 */
	public function TXN_ID() {
		return $this->TXN_ID;
	}



	/**
	 * @return int
	 */
	public function TKT_ID() {
		return $this->TKT_ID;
	}



	/**
	 * @return string
	 */
	public function regCode()
	{
		return $this->reg_code;
	}





}
// End of file CreateRegCodeCommand.php
// Location: /CreateRegCodeCommand.php