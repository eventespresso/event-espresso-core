<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Price_Type;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use InvalidArgumentException;
use ReflectionException;

/**
 * Class PriceType
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class PriceType extends TypeBase
{

    /**
     * PriceType constructor.
     *
     * @param EEM_Price_Type $price_type_model
     */
    public function __construct(EEM_Price_Type $price_type_model)
    {
        $this->model = $price_type_model;
        $this->setName($this->namespace. 'PriceType');
        $this->setDescription(__('A price type.', 'event_espresso'));
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
                'dbId',
                ['non_null' => 'Int'],
                'ID',
                esc_html__('Price type ID', 'event_espresso')
            ),
            new GraphQLField(
                'baseType',
                $this->namespace . 'PriceBaseTypeEnum',
                'base_type',
                esc_html__('Price Base type', 'event_espresso')
            ),
            new GraphQLField(
                'isBasePrice',
                'Boolean',
                'is_base_price',
                esc_html__('Flag indicating price type is a base price.', 'event_espresso')
            ),
            new GraphQLField(
                'isTrashed',
                'Boolean',
                'deleted',
                esc_html__('Flag indicating price type has been trashed.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isDiscount',
                'Boolean',
                'is_discount',
                esc_html__('Flag indicating price type is a discount.', 'event_espresso')
            ),
            new GraphQLField(
                'isPercent',
                'Boolean',
                'is_percent',
                esc_html__('Flag indicating price type is a percentage.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isTax',
                'Boolean',
                'is_tax',
                esc_html__('Flag indicating price is a tax.', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                esc_html__('Price type Name', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('Order in which price should be applied.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'wpUser',
                'User',
                null,
                esc_html__('Price Type Creator', 'event_espresso')
            ),
            new GraphQLInputField(
                'wpUser',
                'Int',
                null,
                esc_html__('Price Type Creator ID', 'event_espresso')
            ),
        ];
    }
}
