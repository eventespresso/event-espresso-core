<?php

namespace EventEspresso\core\domain\services\commands\transaction;

use EE_Checkout;
use EE_Error;
use EE_Line_Item;
use EE_Transaction;
use EEH_Line_Item;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\commands\CommandHandler;
use EventEspresso\core\services\commands\CommandInterface;
use InvalidArgumentException;
use ReflectionException;
use RuntimeException;

/**
 * Class CreateTransactionCommandHandler
 * generates and validates a Transaction and it's associated top-level Line Items
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class CreateTransactionCommandHandler extends CommandHandler
{
    public function __construct()
    {
        defined('EVENT_ESPRESSO_VERSION') || exit;
    }


    /**
     * @param CommandInterface|CreateTransactionCommand $command
     * @return mixed
     * @throws EE_Error
     * @throws InvalidEntityException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws RuntimeException
     */
    public function handle(CommandInterface $command)
    {
        $transaction_details = $command->transactionDetails();
        $cart_total          = null;
        if ($command->checkout() instanceof EE_Checkout) {
            // ensure cart totals have been calculated
            $command->checkout()->cart->get_grand_total()->recalculate_total_including_taxes();
            // grab the cart grand total
            $cart_total                           = $command->checkout()->cart->get_cart_grand_total();
            $transaction_details['TXN_reg_steps'] = $command->checkout()->initialize_txn_reg_steps_array();
            $transaction_details['TXN_total']     = $cart_total > 0 ? $cart_total : 0;
        }
        // create new TXN and save it so it has an ID
        $transaction = EE_Transaction::new_instance($transaction_details);
        if (! $transaction instanceof EE_Transaction) {
            throw new InvalidEntityException(get_class($transaction), 'EE_Transaction');
        }
        $transaction->save();
        // ensure grand total line item created
        $cart_total = $cart_total instanceof EE_Line_Item
            ? $cart_total
            : EEH_Line_Item::create_total_line_item($transaction);
        if (! $cart_total instanceof EE_Line_Item) {
            throw new InvalidEntityException(get_class($cart_total), 'EE_Line_Item');
        }
        $cart_total->save_this_and_descendants_to_txn($transaction->ID());
        return $transaction;
    }
}
