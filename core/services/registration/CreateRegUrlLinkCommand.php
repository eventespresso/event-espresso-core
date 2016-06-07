<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\services\commands\SelfExecutingCommand;
use EventEspresso\core\services\commands\CommandBusInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CreateRegUrlLinkCommand
 * DTO for passing data to a CreateRegUrlLinkCommandHandler
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateRegUrlLinkCommand extends SelfExecutingCommand
{


	/**
	 * @var int $reg_count
	 */
	private $reg_count;

	/**
	 * @var string $base_code
	 */
	private $base_code;

	/**
	 * @var string $reg_url_link
	 */
	protected $reg_url_link;



	/**
	 * CreateRegUrlLinkCommand constructor.
	 *
	 * @param int                 $reg_count
	 * @param mixed               $base_code
	 * @param \EE_Registry        $registry
	 * @param CommandBusInterface $command_bus
	 */
	public function __construct(
		$reg_count = 1,
		$base_code = '',
		\EE_Registry $registry,
		CommandBusInterface $command_bus
	) {
		$this->reg_count = absint( $reg_count );
		$this->base_code = $base_code instanceof \EE_Line_Item ? $base_code->code() : $base_code;
		if ( empty( $this->base_code ) || ! is_string( $this->base_code ) ) {
			throw new \InvalidArgumentException(
				__(
					'You must supply a valid EE_Line_Item or a non-empty string to generate a reg_url_link.',
					'event_espresso'
				)
			);
		}
		parent::__construct( $registry, $command_bus, 'reg_url_link' );
	}



	/**
	 * @return int
	 */
	public function regCount() {
		return $this->reg_count;
	}



	/**
	 * @return string
	 */
	public function baseCode() {
		return $this->base_code;
	}



	/**
	 * @return string
	 */
	public function regUrlLink()
	{
		return $this->reg_url_link;
	}



}
// End of file CreateRegUrlLinkCommand.php
// Location: /CreateRegUrlLinkCommand.php