<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\services\commands\AbstractCommand;
use EventEspresso\core\services\commands\CommandBusInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CreateRegUrlLinkCommand
 * DTO for generating a REG_URL_LINK
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateRegUrlLinkCommand extends AbstractCommand
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
	 * CreateRegUrlLinkCommand constructor.
	 *
	 * @param int                 $reg_count
	 * @param mixed               $base_code
	 * @param CommandBusInterface $command_bus
	 */
	public function __construct(
		$reg_count = 1,
		$base_code = '',
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
		parent::__construct( $command_bus );
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



}
// End of file CreateRegUrlLinkCommand.php
// Location: /CreateRegUrlLinkCommand.php