<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Price;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class Price
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class Price extends TypeBase
{

    /**
     * Price constructor.
     *
     * @param EEM_Price $price_model
     */
    public function __construct(EEM_Price $price_model)
    {
        $this->model = $price_model;
        $this->setName('Price');
        $this->setDescription(__('A price.', 'event_espresso'));
        $this->setIsCustomPostType(false);
        parent::__construct();
    }


    /**
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    public function getFields()
    {
        return [
            new GraphQLField(
                'id',
                ['non_null' => 'ID'],
                null,
                esc_html__('The globally unique ID for the object.', 'event_espresso')
            ),
            new GraphQLOutputField(
                lcfirst($this->name()) . 'Id',
                ['non_null' => 'Int'],
                'ID',
                esc_html__('Price ID', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                esc_html__('Price Name', 'event_espresso')
            ),
            new GraphQLField(
                'amount',
                'Float',
                'amount',
                esc_html__('Price Amount', 'event_espresso')
            ),
            new GraphQLField(
                'desc',
                'String',
                'desc',
                esc_html__('Price description', 'event_espresso')
            ),
            new GraphQLField(
                'overrides',
                'Int',
                'overrides',
                esc_html__('Price ID for a global Price that will be overridden by this Price.', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('Order of Application of Price.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'parent',
                $this->name(),
                null,
                esc_html__('The parent price of the current price', 'event_espresso')
            ),
            new GraphQLOutputField(
                'priceType',
                'PriceType',
                'type_obj',
                esc_html__('The related price type object.', 'event_espresso')
            ),
            new GraphQLInputField(
                'parent',
                'ID',
                null,
                esc_html__('The parent price ID', 'event_espresso')
            ),
            new GraphQLField(
                'isDeleted',
                'Boolean',
                'deleted',
                esc_html__('Flag indicating price type has been trashed.', 'event_espresso')
            ),
            new GraphQLField(
                'isDefault',
                'Boolean',
                'is_default',
                esc_html__('Flag indicating price is the default one.', 'event_espresso')
            ),
            new GraphQLField(
                'isPercent',
                'Boolean',
                'is_percent',
                esc_html__('Flag indicating price is a percentage.', 'event_espresso')
            ),
            new GraphQLField(
                'isBasePrice',
                'Boolean',
                'is_base_price',
                esc_html__('Flag indicating price is a base price type.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isDiscount',
                'Boolean',
                'is_discount',
                esc_html__('Flag indicating price is a discount.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'wpUser',
                'User',
                null,
                esc_html__('Price Creator', 'event_espresso')
            ),
            new GraphQLInputField(
                'wpUser',
                'Int',
                null,
                esc_html__('Price Creator ID', 'event_espresso')
            ),
        ];
    }
}
