<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_Price;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;
use EventEspresso\core\domain\services\graphql\mutators\PriceCreate;
use EventEspresso\core\domain\services\graphql\mutators\PriceDelete;
use EventEspresso\core\domain\services\graphql\mutators\PriceUpdate;
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
        $this->setName($this->namespace . 'Price');
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
                'dbId',
                ['non_null' => 'Int'],
                'ID',
                esc_html__('Price ID', 'event_espresso')
            ),
            new GraphQLField(
                'amount',
                'Float',
                'amount',
                esc_html__('Price Amount', 'event_espresso')
            ),
            new GraphQLOutputField(
                'cacheId',
                ['non_null' => 'String'],
                null,
                esc_html__('The cache ID of the object.', 'event_espresso')
            ),
            new GraphQLField(
                'description',
                'String',
                'desc',
                esc_html__('Price description', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isBasePrice',
                'Boolean',
                'is_base_price',
                esc_html__('Flag indicating price is a base price type.', 'event_espresso')
            ),
            new GraphQLField(
                'isDefault',
                'Boolean',
                'is_default',
                esc_html__('Flag indicating price is the default one.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isDiscount',
                'Boolean',
                'is_discount',
                esc_html__('Flag indicating price is a discount.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isPercent',
                'Boolean',
                'is_percent',
                esc_html__('Flag indicating price is a percentage.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'isTax',
                'Boolean',
                'is_tax',
                esc_html__('Flag indicating price is a tax.', 'event_espresso')
            ),
            new GraphQLField(
                'isTrashed',
                'Boolean',
                'deleted',
                esc_html__('Flag indicating price has been trashed.', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                esc_html__('Price Name', 'event_espresso')
            ),
            new GraphQLField(
                'order',
                'Int',
                'order',
                esc_html__('Order of Application of Price.', 'event_espresso')
            ),
            new GraphQLField(
                'overrides',
                'Int',
                'overrides',
                esc_html__('Price ID for a global Price that will be overridden by this Price.', 'event_espresso')
            ),
            new GraphQLOutputField(
                'parent',
                $this->name(),
                null,
                esc_html__('The parent price of the current price', 'event_espresso')
            ),
            new GraphQLInputField(
                'parent',
                'ID',
                null,
                esc_html__('The parent price ID', 'event_espresso')
            ),
            new GraphQLOutputField(
                'priceType',
                $this->namespace . 'PriceType',
                'type_obj',
                esc_html__('The related price type object.', 'event_espresso')
            ),
            new GraphQLInputField(
                'priceType',
                'ID',
                null,
                esc_html__('The price type ID', 'event_espresso')
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


    /**
     * @param array $inputFields The mutation input fields.
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @since $VID:$
     */
    public function registerMutations(array $inputFields)
    {
        // Register mutation to update an entity.
        register_graphql_mutation(
            'update' . $this->name(),
            [
                'inputFields'         => $inputFields,
                'outputFields'        => [
                    lcfirst($this->name()) => [
                        'type'    => $this->name(),
                        'resolve' => [$this, 'resolveFromPayload'],
                    ],
                ],
                'mutateAndGetPayload' => PriceUpdate::mutateAndGetPayload($this->model, $this),
            ]
        );
        // Register mutation to delete an entity.
        register_graphql_mutation(
            'delete' . $this->name(),
            [
                'inputFields'         => [
                    'id'                => $inputFields['id'],
                    'deletePermanently' => [
                        'type'        => 'Boolean',
                        'description' => esc_html__('Whether to delete the entity permanently.', 'event_espresso'),
                    ],
                ],
                'outputFields'        => [
                    lcfirst($this->name()) => [
                        'type'        => $this->name(),
                        'description' => esc_html__('The object before it was deleted', 'event_espresso'),
                        'resolve'     => static function ($payload) {
                            $deleted = (object) $payload['deleted'];

                            return ! empty($deleted) ? $deleted : null;
                        },
                    ],
                ],
                'mutateAndGetPayload' => PriceDelete::mutateAndGetPayload($this->model, $this),
            ]
        );

        // remove primary key from input.
        unset($inputFields['id']);
        // Register mutation to update an entity.
        register_graphql_mutation(
            'create' . $this->name(),
            [
                'inputFields'         => $inputFields,
                'outputFields'        => [
                    lcfirst($this->name()) => [
                        'type'    => $this->name(),
                        'resolve' => [$this, 'resolveFromPayload'],
                    ],
                ],
                'mutateAndGetPayload' => PriceCreate::mutateAndGetPayload($this->model, $this),
            ]
        );
    }
}
