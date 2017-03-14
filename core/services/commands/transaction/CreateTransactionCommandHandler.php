<?php
namespace EventEspresso\core\services\commands\transaction;

use EE_Checkout;
use EE_Error;
use EE_Line_Item;
use EE_Transaction;
use EEH_Line_Item;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CreateTransactionCommandHandler
 * generates and validates a Transaction and it's associated top-level Line Items
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 */
class CreateTransactionCommandHandler extends CommandHandler
{


    /**
     * @param CommandInterface $command
     * @return mixed
     * @throws EE_Error
     * @throws InvalidEntityException
     */
    public function handle(CommandInterface $command)
    {
        /** @var CreateTransactionCommand $command */
        if (! $command instanceof CreateTransactionCommand) {
            throw new InvalidEntityException(get_class($command), 'CreateTransactionCommand');
        }
        $transaction_details = $command->transactionDetails();
        if ($command->checkout() instanceof EE_Checkout) {
            // ensure cart totals have been calculated
            $command->checkout()->cart->get_grand_total()->recalculate_total_including_taxes();
            // grab the cart grand total
            $cart_total = $command->checkout()->cart->get_cart_grand_total();
            $transaction_details['TXN_reg_steps'] = $command->checkout()->initialize_txn_reg_steps_array();
            $transaction_details['TXN_total'] = $cart_total > 0 ? $cart_total : 0;
        }
        // create new TXN and save it so it has an ID
        $transaction = EE_Transaction::new_instance($transaction_details);
        if (! $transaction instanceof EE_Transaction) {
            throw new InvalidEntityException(get_class($transaction), 'EE_Transaction');
        }
        $transaction->save();
        // every TXN needs a grand total line item created
        $total_line_item = EEH_Line_Item::create_total_line_item($transaction);
        if (! $total_line_item instanceof EE_Line_Item) {
            throw new InvalidEntityException(get_class($total_line_item), 'EE_Line_Item');
        }
        $total_line_item->save_this_and_descendants();
        return $transaction;
    }


}
// End of file CreateTransactionCommandHandler.php
// Location: EventEspresso\core\services\commands\transaction/CreateTransactionCommandHandler.php