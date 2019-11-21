<?php

namespace EventEspresso\core\domain\services\graphql\types;

use EEM_State;
use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\types\TypeBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;

/**
 * Class State
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\types
 * @author  Brent Christensen
 * @since   $VID:$
 */
class State extends TypeBase
{

    /**
     * State constructor.
     *
     * @param EEM_State $state_model
     */
    public function __construct(EEM_State $state_model)
    {
        $this->model = $state_model;
        $this->setName('State');
        $this->setDescription(__('A state', 'event_espresso'));
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
                esc_html__('State ID', 'event_espresso')
            ),
            new GraphQLField(
                'abbreviation',
                'String',
                'abbrev',
                esc_html__('State Abbreviation', 'event_espresso')
            ),
            new GraphQLField(
                'name',
                'String',
                'name',
                esc_html__('State Name', 'event_espresso')
            ),
            new GraphQLField(
                'isActive',
                'Boolean',
                'active',
                esc_html__('State Active Flag', 'event_espresso')
            ),
            new GraphQLOutputField(
                'country',
                'Country',
                null,
                esc_html__('Country for the state', 'event_espresso')
            ),
            new GraphQLInputField(
                'country',
                'String',
                null,
                esc_html__('Country ISO Code', 'event_espresso')
            ),
        ];
    }
}
