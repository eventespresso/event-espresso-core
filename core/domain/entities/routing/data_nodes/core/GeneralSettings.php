<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EventEspresso\core\services\converters\date_time_formats\PhpToUnicode;
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
     * @var PhpToUnicode $converter
    */
    private $converter;


    /**
     * @param JsonDataNodeValidator $validator
     * @param PhpToUnicode $converter
     */
    public function __construct(JsonDataNodeValidator $validator, PhpToUnicode $converter)
    {
        $this->converter = $converter;
        parent::__construct($validator);
        $this->setNodeName(GeneralSettings::NODE_NAME);
    }


    /**
     * @inheritDoc
     */
    public function initialize()
    {
        $wpDateFormat = get_option('date_format');
        $wpTimeFormat = get_option('time_format');
        $this->addData('dateFormat', $this->converter->convertDateFormat($wpDateFormat));
        $this->addData('timeFormat', $this->converter->convertTimeFormat($wpTimeFormat));
        $this->addData('timezone', get_option('timezone_string'));
        $this->addData('__typename', 'GeneralSettings');
        $this->setInitialized(true);
    }
}
