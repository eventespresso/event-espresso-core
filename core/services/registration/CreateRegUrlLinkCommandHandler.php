<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CreateRegUrlLinkCommandHandler
 * generates a REG_URL_LINK from a CreateRegUrlLinkCommand
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateRegUrlLinkCommandHandler extends CommandHandler
{

	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return mixed
	 */
	public function handle( CommandInterface $command ) {
		/** @var CreateRegUrlLinkCommand $command */
		if ( ! $command instanceof CreateRegUrlLinkCommand ) {
			throw new InvalidEntityException( get_class( $command ), 'CreateRegUrlLinkCommand' );
		}
		return apply_filters(
			'FHEE__\EventEspresso\core\services\registration\CreateRegUrlLinkCommandHandler__handle__new_reg_url_link',
			$command->regCount() . '-' . md5( $command->baseCode() . microtime() ),
			$command
		);
	}

}
// End of file CreateRegUrlLinkCommandHandler.php
// Location: /CreateRegUrlLinkCommandHandler.php