<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * Price Model
 *
 * @package             Event Espresso
 * @subpackage          includes/models/EEM_Price.model.php
 * @author              Mike Nelson
 */
class EEM_Price extends EEM_Soft_Delete_Base
{

    /**
     * @var EEM_Price
     */
    protected static $_instance;


    /**
     * private constructor to prevent direct creation
     *
     * @param string $timezone string representing the timezone we want to set for returned Date Time Strings
     *                         (and any incoming timezone data that gets saved).
     *                         Note this just sends the timezone info to the date time model field objects.
     *                         Default is NULL
     *                         (and will be assumed using the set timezone in the 'timezone_string' wp option)
     * @throws EE_Error
     */
    protected function __construct(string $timezone = '')
    {
        require_once(EE_MODELS . 'EEM_Price_Type.model.php');
        $this->singular_item = esc_html__('Price', 'event_espresso');
        $this->plural_item   = esc_html__('Prices', 'event_espresso');

        $this->_tables          = [
            'Price' => new EE_Primary_Table('esp_price', 'PRC_ID'),
        ];
        $this->_fields          = [
            'Price' => [
                'PRC_ID'         => new EE_Primary_Key_Int_Field(
                    'PRC_ID',
                    'Price ID'
                ),
                'PRT_ID'         => new EE_Foreign_Key_Int_Field(
                    'PRT_ID',
                    esc_html__('Price type Id', 'event_espresso'),
                    false,
                    null,
                    'Price_Type'
                ),
                'PRC_amount'     => new EE_Money_Field(
                    'PRC_amount',
                    esc_html__('Price Amount', 'event_espresso'),
                    false,
                    0
                ),
                'PRC_name'       => new EE_Plain_Text_Field(
                    'PRC_name',
                    esc_html__('Name of Price', 'event_espresso'),
                    false,
                    ''
                ),
                'PRC_desc'       => new EE_Post_Content_Field(
                    'PRC_desc',
                    esc_html__('Price Description', 'event_espresso'),
                    false,
                    ''
                ),
                'PRC_is_default' => new EE_Boolean_Field(
                    'PRC_is_default',
                    esc_html__('Flag indicating whether price is a default price', 'event_espresso'),
                    false,
                    false
                ),
                'PRC_overrides'  => new EE_Integer_Field(
                    'PRC_overrides',
                    esc_html__(
                        'Price ID for a global Price that will be overridden by this Price  ( for replacing default prices )',
                        'event_espresso'
                    ),
                    true,
                    0
                ),
                'PRC_order'      => new EE_Integer_Field(
                    'PRC_order',
                    esc_html__(
                        'Order of Application of Price (lower numbers apply first?)',
                        'event_espresso'
                    ),
                    false,
                    1
                ),
                'PRC_deleted'    => new EE_Trashed_Flag_Field(
                    'PRC_deleted',
                    esc_html__('Flag Indicating if this has been deleted or not', 'event_espresso'),
                    false,
                    false
                ),
                'PRC_parent'     => new EE_Integer_Field(
                    'PRC_parent',
                    esc_html__('Indicates what PRC_ID is the parent of this PRC_ID', 'event_espresso'),
                    true,
                    0
                ),
                'PRC_wp_user'    => new EE_WP_User_Field(
                    'PRC_wp_user',
                    esc_html__('Price Creator ID', 'event_espresso'),
                    false
                ),
            ],
        ];
        $this->_model_relations = [
            'Ticket'     => new EE_HABTM_Relation('Ticket_Price'),
            'Price_Type' => new EE_Belongs_To_Relation(),
            'WP_User'    => new EE_Belongs_To_Relation(),
        ];
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ]
            = new EE_Restriction_Generator_Default_Public(
            'PRC_is_default',
            'Ticket.Datetime.Event'
        );
        // account for default tickets in the caps
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ]
            = new EE_Restriction_Generator_Default_Protected(
            'PRC_is_default',
            'Ticket.Datetime.Event'
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ]
            = new EE_Restriction_Generator_Default_Protected(
            'PRC_is_default',
            'Ticket.Datetime.Event'
        );
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ]
            = new EE_Restriction_Generator_Default_Protected(
            'PRC_is_default',
            'Ticket.Datetime.Event'
        );
        parent::__construct($timezone);
    }


    /**
     * instantiate a new price object with blank/empty properties
     *
     * @return EE_Price
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_new_price(): EE_Price
    {
        return $this->create_default_object();
    }


    /**
     * retrieve  ALL prices from db
     *
     * @return EE_Price[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_prices(): array
    {
        // retrieve all prices
        return $this->get_all(['order_by' => ['PRC_amount' => 'ASC']]);
    }


    /**
     * retrieve all active prices for a particular event
     *
     * @param int $EVT_ID
     * @return array on success
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_event_prices(int $EVT_ID = 0): array
    {
        return $this->get_all(
            [
                [
                    'EVT_ID'            => $EVT_ID,
                    'Price_Type.PBT_ID' => ['!=', EEM_Price_Type::base_type_tax],
                ],
                'order_by' => $this->_order_by_array_for_get_all_method(),
            ]
        );
    }


    /**
     * retrieve all active global prices (that are not taxes (PBT_ID=4)) for a particular event
     *
     * @param boolean $count return count
     * @param bool    $include_taxes
     * @return int|EE_Price[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_default_prices(bool $count = false, bool $include_taxes = false)
    {
        $_where = [
            'PRC_deleted'    => 0,
            'PRC_is_default' => 1,
        ];
        if (! $include_taxes) {
            $_where['Price_Type.PBT_ID'] = ['!=', 4];
        }
        $_query_params = [
            $_where,
            'order_by' => $this->_order_by_array_for_get_all_method(),
        ];
        return $count ? $this->count([$_where]) : $this->get_all($_query_params);
    }


    /**
     * retrieve all active global prices that are taxes
     *
     * @return EE_Price[]
     * @throws EE_Error
     * @throws ReflectionException
     * @since   $VID:$
     */
    public function getAllDefaultTaxes(): array
    {
        return $this->get_all(
            [
                [
                    'PRC_deleted'       => 0,
                    'PRC_is_default'    => 1,
                    'Price_Type.PBT_ID' => EEM_Price_Type::base_type_tax,
                ],
                'order_by' => [
                    'Price_Type.PRT_order' => 'ASC',
                    'PRC_order'            => 'ASC',
                ],
            ]
        );
    }


    /**
     * retrieve all prices that are taxes
     *
     * @return EE_Price[]
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_all_prices_that_are_taxes(): array
    {
        $taxes     = [];
        $all_taxes = $this->get_all(
            [
                ['Price_Type.PBT_ID' => EEM_Price_Type::base_type_tax],
                'order_by' => ['Price_Type.PRT_order' => 'ASC', 'PRC_order' => 'ASC'],
            ]
        );
        foreach ($all_taxes as $tax) {
            if ($tax instanceof EE_Price) {
                $taxes[ $tax->order() ][ $tax->ID() ] = $tax;
            }
        }
        return $taxes;
    }


    /**
     * retrieve all prices for an ticket plus default global prices, but not taxes
     *
     * @param int $TKT_ID the id of the event.  If not included then we assume that this is a new ticket.
     * @return EE_Price[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_ticket_prices_for_admin(int $TKT_ID = 0): array
    {
        $array_of_price_objects = [];
        if (empty($TKT_ID)) {
            // if there is no tkt, get prices with no tkt ID, are global, are not a tax, and are active
            // return that list
            $default_prices = $this->get_all_default_prices();

            if ($default_prices) {
                foreach ($default_prices as $price) {
                    if ($price instanceof EE_Price) {
                        $array_of_price_objects[ $price->type() ][] = $price;
                    }
                }
                return $array_of_price_objects;
            }
            return [];
        }
        $ticket_prices = $this->get_all(
            [
                [
                    'TKT_ID'      => $TKT_ID,
                    'PRC_deleted' => 0,
                ],
                'order_by' => ['PRC_order' => 'ASC'],
            ]
        );

        if (! empty($ticket_prices)) {
            foreach ($ticket_prices as $price) {
                if ($price instanceof EE_Price) {
                    $array_of_price_objects[ $price->type() ][] = $price;
                }
            }
        }
        return $array_of_price_objects;
    }


    /**
     * _sort_event_prices_by_type
     *
     * @param EE_Price $price_a
     * @param EE_Price $price_b
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function _sort_event_prices_by_type(EE_Price $price_a, EE_Price $price_b): int
    {
        if ($price_a->type_obj()->order() === $price_b->type_obj()->order()) {
            return $this->_sort_event_prices_by_order($price_a, $price_b);
        }
        return $price_a->type_obj()->order() < $price_b->type_obj()->order() ? -1 : 1;
    }


    /**
     *        _sort_event_prices_by_order
     *
     * @param EE_Price $price_a
     * @param EE_Price $price_b
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function _sort_event_prices_by_order(EE_Price $price_a, EE_Price $price_b): int
    {
        if ($price_a->order() === $price_b->order()) {
            return 0;
        }
        return $price_a->order() < $price_b->order() ? -1 : 1;
    }


    /**
     * get all prices of a specific type
     *
     * @param int $PRT_ID - PRT_ID
     * @return EE_Price[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_prices_that_are_type(int $PRT_ID): array
    {
        return $this->get_all(
            [
                [
                    'PRT_ID' => $PRT_ID,
                ],
                'order_by' => $this->_order_by_array_for_get_all_method(),
            ]
        );
    }


    /**
     * Returns an array of the normal 'order_by' query parameter provided to the get_all query.
     * Of course you don't have to use it, but this is the order we usually want to sort prices by
     *
     * @return array which can be used like so: $this->get_all(array(array(...where
     *               stuff...),'order_by'=>$this->_order_by_array_for_get_all_method()));
     */
    public function _order_by_array_for_get_all_method(): array
    {
        return [
            'PRC_order'            => 'ASC',
            'Price_Type.PRT_order' => 'ASC',
            'PRC_ID'               => 'ASC',
        ];
    }
}
