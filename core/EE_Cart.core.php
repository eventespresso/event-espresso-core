<?php

use EventEspresso\core\interfaces\ResettableInterface;

/**
 * EE_Cart class
 * Used to keep track of which tickets the user has specified they want to purchase.
 * This data is used for generating the Transaction and Registrations, and the
 * Line Items on cart are themselves saved for creating a persistent snapshot of
 * what was purchased and for how much.
 *
 * @version        2.0
 *
 * @version        2.0
 * @subpackage     includes/core/EE_Cart.core.php
 * @author         Mike Nelson, Brent Christensen
 */
class EE_Cart implements ResettableInterface
{
    private static ?EE_Cart $_instance = null;

    protected ?EE_Session $session = null;

    /**
     * The total Line item which comprises all the children line-item subtotals,
     * which in turn each have their line items.
     * Typically, the line item structure will look like:
     * grand total
     * -tickets-sub-total
     * --ticket1
     * --ticket2
     * --...
     * -taxes-sub-total
     * --tax1
     * --tax2
     *
     * If cart is serialized, this will be an ID of the line item
     *
     * @var EE_Line_Item|null
     */
    private ?EE_Line_Item $grand_total = null;

    private int $grand_total_ID = 0;


    /**
     * singleton method used to instantiate class object
     *
     * @param EE_Line_Item|null $grand_total
     * @param EE_Session|null   $session
     * @return EE_Cart
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function instance(?EE_Line_Item $grand_total = null, ?EE_Session $session = null): ?EE_Cart
    {
        if ($grand_total instanceof EE_Line_Item && $grand_total->is_total()) {
            self::$_instance = new self($grand_total, $session);
        }
        // or maybe retrieve an existing one ?
        if (! self::$_instance instanceof EE_Cart) {
            // try getting the cart out of the session
            $saved_cart      = $session instanceof EE_Session ? $session->cart() : null;
            self::$_instance = $saved_cart instanceof EE_Cart ? $saved_cart : new self($grand_total, $session);
            unset($saved_cart);
        }
        // verify that cart is ok and grand total line item exists
        if (! self::$_instance instanceof EE_Cart || ! self::$_instance->grand_total instanceof EE_Line_Item) {
            self::$_instance = new self($grand_total, $session);
        }
        self::$_instance->get_grand_total();
        // once everything is all said and done, save the cart to the EE_Session
        add_action('shutdown', [self::$_instance, 'save_cart'], 90);
        return self::$_instance;
    }


    /**
     * private constructor to prevent direct creation
     *
     * @param EE_Line_Item|null $grand_total
     * @param EE_Session|null   $session
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function __construct(?EE_Line_Item $grand_total = null, ?EE_Session $session = null)
    {
        $this->set_session($session);
        if ($grand_total instanceof EE_Line_Item && $grand_total->is_total()) {
            $this->set_grand_total_line_item($grand_total);
        }
    }


    /**
     * Resets the cart completely (whereas empty_cart
     *
     * @param EE_Line_Item|null $grand_total
     * @param EE_Session|null   $session
     * @return EE_Cart
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function reset(?EE_Line_Item $grand_total = null, ?EE_Session $session = null): ?EE_Cart
    {
        remove_action('shutdown', [self::$_instance, 'save_cart'], 90);
        if ($session instanceof EE_Session) {
            $session->reset_cart();
        }
        self::$_instance = null;
        return self::instance($grand_total, $session);
    }


    /**
     * @return EE_Session
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function session(): EE_Session
    {
        if (! $this->session instanceof EE_Session) {
            $this->set_session();
        }
        return $this->session;
    }


    /**
     * @param EE_Session|null $session
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_session(?EE_Session $session = null)
    {
        $this->session = $session instanceof EE_Session ? $session : EE_Registry::instance()->load_core('Session');
    }


    /**
     * Sets the cart to match the line item. Especially handy for loading an old cart where you
     *  know the grand total line item on it
     *
     * @param EE_Line_Item $line_item
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_grand_total_line_item(EE_Line_Item $line_item)
    {
        $this->grand_total    = $line_item;
        $this->grand_total_ID = $line_item->ID();
    }


    /**
     * get_cart_from_reg_url_link
     *
     * @param EE_Transaction  $transaction
     * @param EE_Session|null $session
     * @return EE_Cart
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function get_cart_from_txn(EE_Transaction $transaction, ?EE_Session $session = null): EE_Cart
    {
        $grand_total = $transaction->total_line_item();
        $grand_total->get_items();
        $grand_total->tax_descendants();
        return EE_Cart::instance($grand_total, $session);
    }


    /**
     * Creates the total line item, and ensures it has its 'tickets' and 'taxes' sub-items
     *
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws ReflectionException
     */
    private function create_grand_total(): EE_Line_Item
    {
        $this->grand_total = EEH_Line_Item::create_total_line_item();
        return $this->grand_total;
    }


    /**
     * Gets all the line items of object type Ticket
     *
     * @return EE_Line_Item[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_tickets(): array
    {
        if ($this->grand_total === null) {
            return [];
        }
        return EEH_Line_Item::get_ticket_line_items($this->grand_total);
    }


    /**
     * returns the total quantity of tickets in the cart
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function all_ticket_quantity_count(): int
    {
        $tickets = $this->get_tickets();
        if (empty($tickets)) {
            return 0;
        }
        $count = 0;
        foreach ($tickets as $ticket) {
            $count += $ticket->quantity();
        }
        return $count;
    }


    /**
     * Gets all the tax line items
     *
     * @return EE_Line_Item[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_taxes(): array
    {
        return EEH_Line_Item::get_taxes_subtotal($this->grand_total)->children();
    }


    /**
     * Gets the total line item (which is a parent of all other line items) on this cart
     *
     * @return EE_Line_Item
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_grand_total(): EE_Line_Item
    {
        if ($this->grand_total instanceof EE_Line_Item) {
            return $this->grand_total;
        }
        // $this->grand_total_ID is set, use it to get the object from the db
        if ($this->grand_total_ID !== 0) {
            $this->grand_total = EEM_Line_Item::instance()->get_one_by_ID($this->grand_total_ID);
            return $this->grand_total;
        }
        return $this->create_grand_total();
    }


    /**
     * process items for adding to cart
     *
     * @param EE_Ticket $ticket
     * @param int       $qty
     * @return bool TRUE on success, FALSE on fail
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function add_ticket_to_cart(EE_Ticket $ticket, int $qty = 1): bool
    {
        EEH_Line_Item::add_ticket_purchase($this->get_grand_total(), $ticket, $qty, false);
        return $this->save_cart();
    }


    /**
     * get_cart_total_before_tax
     *
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_cart_total_before_tax(): float
    {
        return $this->get_grand_total()->recalculate_pre_tax_total();
    }


    /**
     * gets the total amount of tax paid for items in this cart
     *
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_applied_taxes(): float
    {
        return EEH_Line_Item::ensure_taxes_applied($this->grand_total);
    }


    /**
     * Gets the total amount to be paid for the items in the cart, including taxes and other modifiers
     *
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_cart_grand_total(): float
    {
        EEH_Line_Item::ensure_taxes_applied($this->grand_total);
        return $this->get_grand_total()->total();
    }


    /**
     * Gets the total amount to be paid for the items in the cart, including taxes and other modifiers
     *
     * @return float
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function recalculate_all_cart_totals(): float
    {
        $pre_tax_total = $this->get_cart_total_before_tax();
        $taxes_total   = EEH_Line_Item::ensure_taxes_applied($this->grand_total);
        $this->grand_total->set_total($pre_tax_total + $taxes_total);
        $this->grand_total->save_this_and_descendants_to_txn();
        return $this->get_grand_total()->total();
    }


    /**
     * deletes an item from the cart
     *
     * @param array|bool|string $line_item_codes
     * @return int on success, FALSE on fail
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function delete_items($line_item_codes = false): int
    {
        return (int) EEH_Line_Item::delete_items($this->get_grand_total(), $line_item_codes);
    }


    /**
     * @remove ALL items from cart and zero ALL totals
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function empty_cart(): bool
    {
        $this->grand_total = $this->create_grand_total();
        return $this->save_cart();
    }


    /**
     * remove ALL items from cart and delete total as well
     *
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function delete_cart(): bool
    {
        if ($this->grand_total instanceof EE_Line_Item) {
            $deleted = EEH_Line_Item::delete_all_child_items($this->grand_total);
            if ($deleted) {
                $this->grand_total->delete();
                $this->grand_total = null;
                return true;
            }
        }
        return false;
    }


    /**
     * save   cart to session
     *
     * @param bool $apply_taxes
     * @return bool TRUE on success, FALSE on fail
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function save_cart(bool $apply_taxes = true): bool
    {
        if ($apply_taxes && $this->grand_total instanceof EE_Line_Item) {
            EEH_Line_Item::ensure_taxes_applied($this->grand_total);
            // make sure we don't cache the transaction because it can get stale
            if (
                $this->grand_total->get_one_from_cache('Transaction') instanceof EE_Transaction
                && $this->grand_total->get_one_from_cache('Transaction')->ID()
            ) {
                $this->grand_total->clear_cache('Transaction', null, true);
            }
        }
        if ($this->session() instanceof EE_Session) {
            return $this->session()->set_cart($this);
        }
        return false;
    }


    /**
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __wakeup()
    {
        if (! $this->grand_total instanceof EE_Line_Item && $this->grand_total_ID !== 0) {
            // $this->_grand_total is actually just an ID, so use it to get the object from the db
            $this->grand_total = EEM_Line_Item::instance()->get_one_by_ID($this->grand_total_ID);
        }
    }


    /**
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function __sleep()
    {
        if ($this->grand_total instanceof EE_Line_Item && $this->grand_total->ID()) {
            $this->grand_total_ID = $this->grand_total->ID();
        }
        return ['grand_total_ID'];
    }
}
