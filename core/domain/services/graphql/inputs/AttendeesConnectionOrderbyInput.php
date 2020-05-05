<?php

namespace EventEspresso\core\domain\services\graphql\inputs;

use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\inputs\InputBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;

/**
 * Class AttendeesConnectionOrderbyInput
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\inputs
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class AttendeesConnectionOrderbyInput extends InputBase
{

    /**
     * AttendeesConnectionOrderbyInput constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'AttendeesConnectionOrderbyInput');
        $this->setDescription(esc_html__('Options for ordering the connection', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return GraphQLFieldInterface[]
     * @since $VID:$
     */
    protected function getFields()
    {
        return [
            new GraphQLField(
                'field',
                ['non_null' => $this->namespace . 'AttendeesConnectionOrderbyEnum']
            ),
            new GraphQLField(
                'order',
                'OrderEnum'
            ),
        ];
    }
}
