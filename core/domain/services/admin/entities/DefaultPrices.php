<?php

namespace EventEspresso\core\domain\services\admin\entities;

use EE_Base_Class;
use EE_Error;
use EE_Price;
use EE_Price_Type;
use EE_Ticket;
use EEM_Price;
use EEM_Price_Type;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use ReflectionException;
use RuntimeException;

/**
 * Class DefaultPrices
 * Description
 *
 * @package EventEspresso\core\domain\services\admin\events\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class DefaultPrices implements DefaultEntityGeneratorInterface
{

    /**
     * @var EEM_Price $price_model
     */
    protected $price_model;

    /**
     * @var EEM_Price_Type $price_type_model
     */
    protected $price_type_model;


    /**
     * @param EEM_Price      $price_model
     * @param EEM_Price_Type $price_type_model
     */
    public function __construct(EEM_Price $price_model, EEM_Price_Type $price_type_model)
    {
        $this->price_model = $price_model;
        $this->price_type_model = $price_type_model;
    }


    /**
     * @param EE_Ticket|EE_Base_Class $entity
     * @return EE_Price[]
     * @throws EE_Error
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function create(EE_Base_Class $entity)
    {
        if (! $entity instanceof EE_Ticket) {
            throw new InvalidEntityException($entity, 'EE_Ticket');
        }
        $new_prices = [];
        $has_base_price = false;
        $default_prices = $this->price_model->get_all_default_prices();
        if (is_array($default_prices)) {
            foreach ($default_prices as $default_price) {
                if (! $default_price instanceof EE_Price) {
                    throw new InvalidEntityException($default_price, 'EE_Price');
                }
                $default_price_clone = clone $default_price;
                $default_price_clone->set('PRC_ID', null);
                $default_price_clone->set('PRC_is_default', false);
                $default_price_clone->save();
                $default_price_clone->_add_relation_to($entity, 'Ticket');
                // verify that a base price has been set
                $has_base_price = $default_price_clone->is_base_price() ? true : $has_base_price;
                $new_prices[ $default_price_clone->ID() ] = $default_price_clone;
            }
        }
        if (! $has_base_price) {
            $new_base_price = $this->createNewBasePrice($entity);
            $new_prices[ $new_base_price->ID() ] = $new_base_price;
        }
        return $new_prices;
    }


    /**
     * @param EE_Ticket $ticket
     * @return EE_Price
     * @throws EE_Error
     * @throws ReflectionException
     * @since $VID:$
     */
    protected function createNewBasePrice(EE_Ticket $ticket)
    {
        $new_base_price = $this->price_model->get_new_price();
        $base_price_type = $this->price_type_model->get_one([
            [
                'PBT_ID' => EEM_Price_Type::base_type_base_price
            ]
        ]);
        if (! $base_price_type instanceof EE_Price_Type) {
            throw new RuntimeException(
                esc_html__(
                    'A valid base price type could not be retrieved from the database.',
                    'event_espresso'
                )
            );
        }
        $new_base_price->set('PRT_ID', $base_price_type->ID());
        $new_base_price->set('PRC_is_default', false);
        $new_base_price->save();
        $new_base_price->_add_relation_to($ticket, 'Ticket');
        return $new_base_price;
    }
}
