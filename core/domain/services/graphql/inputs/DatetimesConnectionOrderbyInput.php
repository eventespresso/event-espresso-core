<?php

namespace EventEspresso\core\domain\services\graphql\inputs;

use EventEspresso\core\services\graphql\fields\GraphQLFieldInterface;
use EventEspresso\core\services\graphql\inputs\InputBase;
use EventEspresso\core\services\graphql\fields\GraphQLField;
use EventEspresso\core\services\graphql\fields\GraphQLInputField;
use EventEspresso\core\services\graphql\fields\GraphQLOutputField;

/**
 * Class DatetimesConnectionOrderbyInput
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\inputs
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class DatetimesConnectionOrderbyInput extends InputBase
{

    /**
     * DatetimesConnectionOrderbyInput constructor.
     */
    public function __construct()
    {
        $this->setName('DatetimesConnectionOrderbyInput');
        $this->setDescription(__('Options for ordering the connection', 'event_espresso'));
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
                ['non_null' => 'DatetimesConnectionOrderbyEnum']
            ),
            new GraphQLField(
                'order',
                'OrderEnum'
            ),
        ];
    }
}
