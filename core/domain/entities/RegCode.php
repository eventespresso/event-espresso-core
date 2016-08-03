<?php
namespace EventEspresso\core\domain\entities;

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class RegCode
 * generates a REG_code
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class RegCode {


	/*
	 * @var string $reg_code
	 */
	private $reg_code;



	/**
	 * RegCode constructor.
	 *
	 * @param RegUrlLink $reg_url_link
	 * @param \EE_Transaction $transaction
	 * @param \EE_Ticket $ticket
	 */
	public function __construct(
		RegUrlLink $reg_url_link,
		\EE_Transaction $transaction,
		\EE_Ticket $ticket
	) {
		// figure out where to start parsing the reg code
		$chars = strpos( $reg_url_link, '-' ) + 5;
		// TXN_ID + TKT_ID + first 3 and last 3 chars of reg_url_link
		$this->reg_code = array(
			$transaction->ID(),
			$ticket->ID(),
			substr( $reg_url_link, 0, $chars )
		);
		// now put it all together
		$this->reg_code = apply_filters(
			'FHEE__Create__regCode__new_reg_code',
			implode( '-', $this->reg_code ),
			$transaction,
			$ticket
		);
	}



	/**
	 * Return the object as a string
	 *
	 * @return string
	 */
	public function __toString() {
		return $this->reg_code;
	}


}
// End of file RegCode.php
// Location: /RegCode.php