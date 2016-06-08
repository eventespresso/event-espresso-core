<?php
namespace EventEspresso\core\services\registration;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandlerInterface;
use EventEspresso\core\services\commands\CommandInterface;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class CreateRegCodeCommandHandler
 * Generates a REG_code from a CreateRegCodeCommand object
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.0
 */
class CreateRegCodeCommandHandler implements CommandHandlerInterface{



	/**
	 * @param \EventEspresso\core\services\commands\CommandInterface $command
	 * @return mixed
	 */
	public function handle( CommandInterface $command ) {
		/** @var CreateRegCodeCommand $command */
		if ( ! $command instanceof CreateRegCodeCommand ) {
			throw new InvalidEntityException( get_class( $command ), 'CreateRegCodeCommand' );
		}
		$reg_url_link = $command->regUrlLink();
		// figure out where to start parsing the reg code
		$chars = strpos( $reg_url_link, '-' ) + 5;
		// TXN_ID + TKT_ID + first 3 and last 3 chars of reg_url_link
		$new_reg_code = array(
			$command->TXN_ID(),
			$command->TKT_ID(),
			substr( $reg_url_link, 0, $chars )
		);
		// now put it all together
		$new_reg_code = implode( '-', $new_reg_code );
		return apply_filters(
			'FHEE__Create__regCode__new_reg_code',
			$new_reg_code,
			$command->TXN_ID(),
			$command->TKT_ID()
		);
	}



}
// End of file CreateRegCodeCommandHandler.php
// Location: /CreateRegCodeCommandHandler.php