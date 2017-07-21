<?php
namespace EventEspresso\core\services\commands\transaction;

use EE_Checkout;
use EventEspresso\core\domain\services\capabilities\CapCheck;
use EventEspresso\core\domain\services\capabilities\CapCheckInterface;
use EventEspresso\core\domain\services\capabilities\PublicCapabilities;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\services\commands\Command;
use EventEspresso\core\services\commands\CommandRequiresCapCheckInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CreateTransactionCommand
 * DTO for passing data to a CreateTransactionCommandHandler
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CreateTransactionCommand extends Command implements CommandRequiresCapCheckInterface
{

    /**
     * @var EE_Checkout $checkout
     */
    protected $checkout;

    /**
     * @var array $transaction_details
     */
    protected $transaction_details;



    /**
     * CreateTransactionCommand constructor.
     *
     * @param EE_Checkout $checkout
     * @param array       $transaction_details
     */
    public function __construct(EE_Checkout $checkout = null, array $transaction_details = array())
    {
        $this->checkout = $checkout;
        $this->transaction_details = $transaction_details;
    }



    /**
     * @return CapCheckInterface
     * @throws InvalidDataTypeException
     */
    public function getCapCheck()
    {
        // need cap for non-AJAX admin requests
        if (! (defined('DOING_AJAX') && DOING_AJAX) && is_admin()) {
            // there's no specific caps for editing/creating transactions,
            // so that's why we are using ee_edit_registrations
            return new CapCheck('ee_edit_registrations', 'create_new_transaction');
        }
        return new PublicCapabilities('', 'create_new_transaction');
    }



    /**
     * @return EE_Checkout
     */
    public function checkout()
    {
        return $this->checkout;
    }



    /**
     * @return array
     */
    public function transactionDetails()
    {
        return $this->transaction_details;
    }



}
// End of file CreateTransactionCommand.php
// Location: EventEspresso\core\services\commands\transaction/CreateTransactionCommand.php