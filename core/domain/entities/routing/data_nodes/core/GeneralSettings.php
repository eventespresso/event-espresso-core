<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

/**
 * Class GeneralSettings
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes
 * @author  Brent Christensen
 * @since   $VID:$
 */
class GeneralSettings extends JsonDataNode
{

    const NODE_NAME = 'generalSettings';


    /**
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(JsonDataNodeValidator $validator)
    {
        parent::__construct($validator);
        $this->setNodeName(GeneralSettings::NODE_NAME);
    }


    /**
     * @inheritDoc
     */
    public function initialize()
    {
        $this->addData('dateFormat', get_option('date_format'));
        $this->addData('timeFormat', get_option('time_format'));
        $this->addData('timezone', get_option('timezone_string'));
        $this->addData('__typename', 'GeneralSettings');
        $this->setInitialized(true);
    }
}
