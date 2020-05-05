<?php

namespace EventEspresso\core\domain\services\graphql\enums;

use EventEspresso\core\services\graphql\enums\EnumBase;

/**
 * Class AttendeesConnectionOrderbyEnum
 * Description
 *
 * @package EventEspresso\core\domain\services\graphql\enums
 * @author  Manzoor Wani
 * @since   $VID:$
 */
class AttendeesConnectionOrderbyEnum extends EnumBase
{

    /**
     * AttendeesConnectionOrderbyEnum constructor.
     */
    public function __construct()
    {
        $this->setName($this->namespace . 'AttendeesConnectionOrderbyEnum');
        $this->setDescription(esc_html__('Field to order the connection by', 'event_espresso'));
        parent::__construct();
    }


    /**
     * @return array
     * @since $VID:$
     */
    protected function getValues()
    {
        return [
            'ID'     => [
                'value'       => 'ATT_ID',
                'description' => esc_html__('Order by ID', 'event_espresso'),
            ],
            'LAST_NAME'     => [
                'value'       => 'ATT_lname',
                'description' => esc_html__('Order by last name', 'event_espresso'),
            ],
            'FIRST_NAME'     => [
                'value'       => 'ATT_fname',
                'description' => esc_html__('Order by first name', 'event_espresso'),
            ],
        ];
    }
}
