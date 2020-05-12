<?php

namespace EventEspresso\core\domain\services\admin\events\editor;

use EE_Base_Class;
use EE_Error;
use EE_Ticket;
use EEM_Price;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;

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
     * @param EEM_Price      $price_model
     */
    public function __construct(EEM_Price $price_model) {
        $this->price_model = $price_model;
    }

    /**
     * @param EE_Base_Class $entity
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function create(EE_Base_Class $entity)
    {
        if (! $entity instanceof EE_Ticket) {
            return;
        }
        $default_prices = $this->price_model->get_all_default_prices();
        foreach ($default_prices as $default_price) {
            $default_price_clone = clone $default_price;
            $default_price_clone->set('PRC_ID', null);
            $default_price_clone->save();
            $default_price_clone->_add_relation_to($entity, 'Ticket');
        }
    }
}
