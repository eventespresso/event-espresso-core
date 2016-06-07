<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\commands\SelfExecutingCommand;
use EventEspresso\core\services\commands\CommandBusInterface;

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
class CreateRegCodeCommand extends SelfExecutingCommand
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
	 * @param \EE_Registration                                          $registration
	 * @param \EE_Registry                                              $registry
	 * @param \EventEspresso\core\services\commands\CommandBusInterface $command_bus
	 * @return \EventEspresso\core\services\registration\CreateRegCodeCommand
	 */
	public static function fromRegistration(
		\EE_Registration $registration,
		\EE_Registry $registry,
		CommandBusInterface $command_bus
	) {
		return new self(
			$registration->reg_url_link(),
			$registration->transaction_ID(),
			$registration->ticket_ID(),
			$registry,
			$command_bus
		);
	}



	/**
	 * CreateRegCodeCommand constructor.
	 *
	 * @param string              $reg_url_link
	 * @param int                 $TXN_ID
	 * @param int                 $TKT_ID
	 * @param \EE_Registry        $registry
	 * @param CommandBusInterface $command_bus
	 */
	public function __construct(
		$reg_url_link,
		$TXN_ID,
		$TKT_ID,
		\EE_Registry $registry,
		CommandBusInterface $command_bus
	) {
		if ( empty( $reg_url_link ) || ! is_string( $reg_url_link ) ) {
			throw new InvalidDataTypeException( '$reg_url_link', $reg_url_link, 'string' );
		}
		$this->reg_url_link = $reg_url_link;
		$this->TXN_ID = absint( $TXN_ID );
		$this->TKT_ID = absint( $TKT_ID );
		parent::__construct( $registry, $command_bus, 'reg_code' );
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