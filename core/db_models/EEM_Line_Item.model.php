<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Line Item Model. Mostly used for storing a snapshot of all the items in a transaction
 * as they were recorded at the time of being added to the cart.
 * There are different 'types' of line items: item, sub-item, tax, sub-total, and total.
 * Note that line items can be nested. For example, a total line item should have one-or-more
 * children sub-totals. Likewise, sub-totals should have one-or-more nested items or taxes
 * (or maybe promotions or products?). Also, items can have nested sub-items (eg. an item could be a
 * ticket, which has many sub-item prices which together make up the price of that ticket).
 * Note that line items should point to real model objects using OBJ_ID and OBJ_type (note:
 * there is a current limitation that they can only point to models with INT primary keys),
 * but this is NOT required. And in fact, the items they are related to CAN be deleted, but
 * the line item should still exist (in this case it merely shows that there was ONCE a model
 * object the line item was based off of).
 *
 * In usage, Line Items are first stored on the EE_Cart, but not saved until a user's registration is
 * finalized (like how the EE_Transaction is stored in the session until it is confirmed).
 * Many of their methods (like
 *
 *
 * @package            Event Espresso
 * @subpackage        includes/models/EEM_Line_Item.model.php
 * @author            Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EEM_Line_Item extends EEM_Base
{

    /**
     * Tax sub-total is just the total of all the taxes, which should be children
     * of this line item. There should only ever be one tax sub-total, and it should
     * be a direct child of. Its quantity and LIN_unit_price = 1.
     */
    const type_tax_sub_total = 'tax-sub-total';

    /**
     * Tax line items indicate a tax applied to all the taxable line items.
     * Should not have any children line items. Its LIN_unit_price = 0. Its LIN_percent is a percent, not a decimal
     * (eg 10% tax = 10, not 0.1). Its LIN_total = LIN_unit_price * pre-tax-total. Quantity = 1.
     */
    const type_tax = 'tax';

    /**
     * Indicating individual items purchased, or discounts or surcharges.
     * The sum of all the regular line items  plus the tax items should equal
     * the grand total.
     * Possible children are sub-line-items and cancellations.
     * For flat items, LIN_unit_price * LIN_quantity = LIN_total. Its LIN_total is the sum of all the children
     * LIN_totals. Its LIN_percent = 0.
     * For percent items, its LIN_unit_price = 0. Its LIN_percent is a percent, not a decimal (eg 10% = 10, not 0.1).
     * Its LIN_total is LIN_percent / 100 * sum of lower-priority sibling line items. Quantity = 1.
     */
    const type_line_item = 'line-item';

    /**
     * Line item indicating all the factors that make a single line item.
     * Sub-line items should have NO children line items.
     * For flat sub-items, their quantity should match their parent item, their LIN_unit_price should be this sub-item's
     * contribution towards the price of ONE of their parent items, and its LIN_total should be
     *  = LIN_quantity * LIN_unit_price. Its LIN_percent = 0.
     * For percent sub-items, the quantity should be 1, LIN_unit_price should be 0, and its LIN_total should
     * = LIN_percent / 100 * sum of lower-priority sibling line items..
     */
    const type_sub_line_item = 'sub-item';

    /**
     * Line item indicating a sub-total (eg total for an event, or pre-tax subtotal).
     * Direct children should be event subtotals.
     * Should have quantity of 1, and a LIN_total and LIN_unit_price of the sum of all its sub-items' LIN_totals.
     *
     */
    const type_sub_total = 'sub-total';

    /**
     * Line item for the grand total of an order. Its direct children
     * should be tax subtotals and (pre-tax) subtotals, and possibly a regular line item
     * indicating a transaction-wide discount/surcharge. Should have a quantity of 1, a LIN_total and LIN_unit_price of
     * the entire order's mount.
     */
    const type_total = 'total';

    /**
     * When a line item is cancelled, a sub-line-item of type 'cancellation'
     * should be created, indicating the quantity that were cancelled
     * (because a line item could have a quantity of 1, and its cancellation item
     * could be for 3, indicating that originally 4 were purchased, but 3 have been
     * cancelled, and only one remains).
     * When items are refunded, a cancellation line item should be made, which points
     * to teh payment model object which actually refunded the payment.
     * Cancellations should NOT have any children line items; the should NOT affect
     * any calculations, and are only meant as a record that cancellations have occurred.
     * Their LIN_percent should be 0.
     */
    const type_cancellation = 'cancellation';

    // private instance of the EEM_Line_Item object
    protected static $_instance = null;


    /**
     *        private constructor to prevent direct creation
     * @Constructor
     * @access protected
     * @param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
     * @return \EEM_Line_Item
     */
    protected function __construct($timezone)
    {
        $this->singular_item = __('Line Item', 'event_espresso');
        $this->plural_item = __('Line Items', 'event_espresso');

        $this->_tables = array(
            'Line_Item' => new EE_Primary_Table('esp_line_item', 'LIN_ID')
        );
        $line_items_can_be_for = apply_filters('FHEE__EEM_Line_Item__line_items_can_be_for', array('Ticket', 'Price', 'Event'));
        $this->_fields = array(
            'Line_Item' => array(
                'LIN_ID' => new EE_Primary_Key_Int_Field('LIN_ID', __("ID", "event_espresso")),
                'LIN_code' => new EE_Slug_Field('LIN_code', __("Code for index into Cart", "event_espresso"), true),
                'TXN_ID' => new EE_Foreign_Key_Int_Field('TXN_ID', __("Transaction ID", "event_espresso"), true, null, 'Transaction'),
                'LIN_name' => new EE_Full_HTML_Field('LIN_name', __("Line Item Name", "event_espresso"), false, ''),
                'LIN_desc' => new EE_Full_HTML_Field('LIN_desc', __("Line Item Description", "event_espresso"), true),
                'LIN_unit_price' => new EE_Money_Field('LIN_unit_price', __("Unit Price", "event_espresso"), false, 0),
                'LIN_percent' => new EE_Float_Field('LIN_percent', __("Percent", "event_espresso"), false, 0),
                'LIN_is_taxable' => new EE_Boolean_Field('LIN_is_taxable', __("Taxable", "event_espresso"), false, false),
                'LIN_order' => new EE_Integer_Field('LIN_order', __("Order of Application towards total of parent", "event_espresso"), false, 1),
                'LIN_total' => new EE_Money_Field('LIN_total', __("Total (unit price x quantity)", "event_espresso"), false, 0),
                'LIN_quantity' => new EE_Integer_Field('LIN_quantity', __("Quantity", "event_espresso"), true, 1),
                'LIN_parent' => new EE_Integer_Field('LIN_parent', __("Parent ID (this item goes towards that Line Item's total)", "event_espresso"), true, null),
                'LIN_type' => new EE_Enum_Text_Field('LIN_type', __("Type", "event_espresso"), false, 'line-item', array(
                        self::type_line_item => __("Line Item", "event_espresso"),
                        self::type_sub_line_item => __("Sub-Item", "event_espresso"),
                        self::type_sub_total => __("Subtotal", "event_espresso"),
                        self::type_tax_sub_total => __("Tax Subtotal", "event_espresso"),
                        self::type_tax => __("Tax", "event_espresso"),
                        self::type_total => __("Total", "event_espresso"),
                        self::type_cancellation => __('Cancellation', 'event_espresso')
                    )),
                'OBJ_ID' => new EE_Foreign_Key_Int_Field('OBJ_ID', __('ID of Item purchased.', 'event_espresso'), true, null, $line_items_can_be_for),
                'OBJ_type' => new EE_Any_Foreign_Model_Name_Field('OBJ_type', __("Model Name this Line Item is for", "event_espresso"), true, null, $line_items_can_be_for),
                'LIN_timestamp' => new EE_Datetime_Field('LIN_timestamp', __('When the line item was created', 'event_espresso'), false, EE_Datetime_Field::now, $timezone),
            )
        );
        $this->_model_relations = array(
            'Transaction' => new EE_Belongs_To_Relation(),
            'Ticket' => new EE_Belongs_To_Any_Relation(),
            'Price' => new EE_Belongs_To_Any_Relation(),
            'Event' => new EE_Belongs_To_Any_Relation()
        );
        $this->_model_chain_to_wp_user = 'Transaction.Registration.Event';
        $this->_caps_slug = 'transactions';
        parent::__construct($timezone);
    }


    /**
     * Gets all the line items for this transaction of the given type
     * @param string $line_item_type like one of EEM_Line_Item::type_*
     * @param EE_Transaction|int $transaction
     * @return EE_Line_Item[]
     */
    public function get_all_of_type_for_transaction($line_item_type, $transaction)
    {
        $transaction = EEM_Transaction::instance()->ensure_is_ID($transaction);
        return $this->get_all(array(array(
            'LIN_type' => $line_item_type,
            'TXN_ID' => $transaction
        )));
    }


    /**
     * Gets all line items unrelated to tickets that are normal line items
     * (eg shipping, promotions, and miscellaneous other stuff should probably fit in this category)
     * @param EE_Transaction|int $transaction
     * @return EE_Line_Item[]
     */
    public function get_all_non_ticket_line_items_for_transaction($transaction)
    {
        $transaction = EEM_Transaction::instance()->ensure_is_ID($transaction);
        return $this->get_all(array(array(
            'LIN_type' => self::type_line_item,
            'TXN_ID' => $transaction,
            'OR' => array(
                'OBJ_type*notticket' => array('!=', 'Ticket'),
                'OBJ_type*null' => array('IS_NULL'))
        )));
    }

    /**
     * Deletes line items with no transaction who have passed the transaction cutoff time.
     * This needs to be very efficient
     * because if there are spam bots afoot there will be LOTS of line items
     * @return int count of how many deleted
     */
    public function delete_line_items_with_no_transaction()
    {
        /** @type WPDB $wpdb */
        global $wpdb;
        $time_to_leave_alone = apply_filters(
            'FHEE__EEM_Line_Item__delete_line_items_with_no_transaction__time_to_leave_alone',
            WEEK_IN_SECONDS
        );
        $query = $wpdb->prepare(
            'DELETE li
				FROM ' . $this->table() . ' li
				LEFT JOIN ' . EEM_Transaction::instance()->table() . ' t ON li.TXN_ID = t.TXN_ID
				WHERE t.TXN_ID IS NULL AND li.LIN_timestamp < %s',
            // use GMT time because that's what TXN_timestamps are in
            date('Y-m-d H:i:s', time() - $time_to_leave_alone)
        );
        return $wpdb->query($query);
    }


    /**
     * get_line_item_for_transaction_object
     * Gets a transaction's line item record for a specific object such as a EE_Event or EE_Ticket
     *
     * @param int $TXN_ID
     * @param \EE_Base_Class $object
     * @return EE_Line_Item[]
     */
    public function get_line_item_for_transaction_object($TXN_ID, EE_Base_Class $object)
    {
        return $this->get_all(array(array(
            'TXN_ID' => $TXN_ID,
            'OBJ_type' => str_replace('EE_', '', get_class($object)),
            'OBJ_ID' => $object->ID()
        )));
    }


    /**
     * get_object_line_items_for_transaction
     * Gets all of the the object line items for a transaction, based on an object type plus an array of object IDs
     *
     * @param int $TXN_ID
     * @param string $OBJ_type
     * @param array $OBJ_IDs
     * @return EE_Line_Item[]
     */
    public function get_object_line_items_for_transaction($TXN_ID, $OBJ_type = 'Event', $OBJ_IDs = array())
    {
        $query_params = array(
            'OBJ_type' => $OBJ_type,
            // if incoming $OBJ_IDs is an array, then make sure it is formatted correctly for the query
            'OBJ_ID' => is_array($OBJ_IDs) && !isset($OBJ_IDs['IN']) ? array('IN', $OBJ_IDs) : $OBJ_IDs
        );
        if ($TXN_ID) {
            $query_params['TXN_ID'] = $TXN_ID;
        }
        return $this->get_all(array($query_params));
    }


    /**
     * get_all_ticket_line_items_for_transaction
     *
     * @param EE_Transaction $transaction
     * @return EE_Line_Item[]
     */
    public function get_all_ticket_line_items_for_transaction(EE_Transaction $transaction)
    {
        return $this->get_all(array(
            array(
                'TXN_ID' => $transaction->ID(),
                'OBJ_type' => 'Ticket',
            )
        ));
    }


    /**
     * get_ticket_line_item_for_transaction
     *
     * @param int $TXN_ID
     * @param int $TKT_ID
     * @return \EE_Line_Item
     */
    public function get_ticket_line_item_for_transaction($TXN_ID, $TKT_ID)
    {
        return $this->get_one(array(
            array(
                'TXN_ID' => EEM_Transaction::instance()->ensure_is_ID($TXN_ID),
                'OBJ_ID' => $TKT_ID,
                'OBJ_type' => 'Ticket',
            )
        ));
    }


    /**
     * get_existing_promotion_line_item
     * searches the cart for existing line items for the specified promotion
     *
     * @since   1.0.0
     *
     * @param EE_Line_Item $parent_line_item
     * @param EE_Promotion $promotion
     * @return EE_Line_Item
     */
    public function get_existing_promotion_line_item(EE_Line_Item $parent_line_item, EE_Promotion $promotion)
    {
        return $this->get_one(array(
            array(
                'TXN_ID' => $parent_line_item->TXN_ID(),
                'LIN_parent' => $parent_line_item->ID(),
                'OBJ_type' => 'Promotion',
                'OBJ_ID' => $promotion->ID()
            )
        ));
    }


    /**
     * get_all_promotion_line_items
     * searches the cart for any and all existing promotion line items
     *
     * @since   1.0.0
     *
     * @param EE_Line_Item $parent_line_item
     * @return EE_Line_Item[]
     */
    public function get_all_promotion_line_items(EE_Line_Item $parent_line_item)
    {
        return $this->get_all(array(
            array(
                'TXN_ID' => $parent_line_item->TXN_ID(),
                'LIN_parent' => $parent_line_item->ID(),
                'OBJ_type' => 'Promotion'
            )
        ));
    }

    /**
     * Gets the registration's corresponding line item.
     * Note: basically does NOT support having multiple line items for a single ticket,
     * which would happen if some of the registrations had a price modifier while others didn't.
     * In order to support that, we'd probably need a LIN_ID on registrations or something.
     * @param EE_Registration $registration
     * @return EE_Line_ITem
     */
    public function get_line_item_for_registration(EE_Registration $registration)
    {
        return $this->get_one($this->line_item_for_registration_query_params($registration));
    }

    /**
     * Gets the query params used to retrieve a specific line item for the given registration
     * @param EE_Registration $registration
     * @param array $original_query_params any extra query params you'd like to be merged with
     * @return array @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     */
    public function line_item_for_registration_query_params(EE_Registration $registration, $original_query_params = array())
    {
        return array_replace_recursive($original_query_params, array(
            array(
                'OBJ_ID' => $registration->ticket_ID(),
                'OBJ_type' => 'Ticket',
                'TXN_ID' => $registration->transaction_ID()
            )
        ));
    }


    /**
     * @return EE_Base_Class[]|EE_Line_Item[]
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public function get_total_line_items_with_no_transaction()
    {
        return $this->get_total_line_items_for_carts();
    }


    /**
     * @return EE_Base_Class[]|EE_Line_Item[]
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public function get_total_line_items_for_active_carts()
    {
        return $this->get_total_line_items_for_carts(false);
    }


    /**
     * @return EE_Base_Class[]|EE_Line_Item[]
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    public function get_total_line_items_for_expired_carts()
    {
        return $this->get_total_line_items_for_carts(true);
    }


    /**
     * Returns an array of grand total line items where the TXN_ID is 0.
     * If $expired is set to true, then only line items for expired sessions will be returned.
     * If $expired is set to false, then only line items for active sessions will be returned.
     *
     * @param null $expired
     * @return EE_Base_Class[]|EE_Line_Item[]
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function get_total_line_items_for_carts($expired = null)
    {
        $where_params = array(
            'TXN_ID' => 0,
            'LIN_type' => 'total',
        );
        if ($expired !== null) {
            /** @var EventEspresso\core\domain\values\session\SessionLifespan $session_lifespan */
            $session_lifespan = LoaderFactory::getLoader()->getShared(
                'EventEspresso\core\domain\values\session\SessionLifespan'
            );
            $where_params['LIN_timestamp'] = array(
                $expired ? '<=' : '>',
                $session_lifespan->expiration(),
            );
        }
        return $this->get_all(array($where_params));
    }


    /**
     * Returns an array of ticket total line items where the TXN_ID is 0
     * AND the timestamp is older than the session lifespan.
     *
     * @param int $timestamp
     * @return EE_Base_Class[]|EE_Line_Item[]
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function getTicketLineItemsForExpiredCarts($timestamp = 0)
    {
        if (! absint($timestamp)) {
            /** @var EventEspresso\core\domain\values\session\SessionLifespan $session_lifespan */
            $session_lifespan = LoaderFactory::getLoader()->getShared(
                'EventEspresso\core\domain\values\session\SessionLifespan'
            );
            $timestamp = $session_lifespan->expiration();
        }
        return $this->get_all(
            array(
                array(
                    'TXN_ID'        => 0,
                    'OBJ_type'      => 'Ticket',
                    'LIN_timestamp' => array('<=', $timestamp),
                )
            )
        );
    }
}
