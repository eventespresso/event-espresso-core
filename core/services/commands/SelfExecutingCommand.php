<?php
namespace EventEspresso\core\services\commands;

use EventEspresso\core\exceptions\InvalidDataTypeException;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class SelfExecutingCommand
 * Commands that implement SelfExecutingCommandInterface
 * will automatically execute upon instantiation.
 * If passed a valid property name,
 * will assign the returned value from execute() to that property
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class SelfExecutingCommand extends Command implements SelfExecutingCommandInterface
{



	/**
	 * Command constructor
	 *
	 * @param \EE_Registry $registry
	 * @param CommandBusInterface $command_bus
	 * @param string              $property if passed the name of a valid property on the Command object,
	 *                                      will set it's value equal to that returned from execute()
	 */
	public function __construct( \EE_Registry $registry, CommandBusInterface $command_bus, $property = '' ) {
		parent::__construct( $registry, $command_bus );
		if ( ! empty( $property ) ) {
			if ( ! is_string( $property ) ) {
				throw new InvalidDataTypeException( '$property', $property, 'string' );
			}
			if ( ! property_exists( $this, $property ) ) {
				throw new \InvalidArgumentException(
					sprintf(
						__( 'The "%1$s" property does not exist on the %2$s class.', 'event_espresso' ),
						$property,
						get_class( $this )
					)
				);
			}
			$this->{$property} = $this->execute();
		} else {
			$this->execute();
		}
	}



	/**
	 * @return mixed
	 */
	public function execute() {
		return $this->commandBus()->execute( $this );
	}

}
// End of file SelfExecutingCommand.php
// Location: /SelfExecutingCommand.php