<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EEH_DTT_Helper;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

/**
 * Class Locale
 * Description
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
class Locale extends JsonDataNode
{
    const NODE_NAME = 'locale';


    /**
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(JsonDataNodeValidator $validator)
    {
        parent::__construct($validator);
        $this->setNodeName(Locale::NODE_NAME);
    }

    /**
     * @inheritDoc
     */
    public function initialize()
    {
        $this->addData('user', get_user_locale());
        $this->addData('site', get_locale());
        $this->addData('siteTimezone', [
            'city'   => EEH_DTT_Helper::get_timezone_string_for_display(),
            'name'   => EEH_DTT_Helper::get_valid_timezone_string(wp_timezone_string()),
            'offset' => EEH_DTT_Helper::get_site_timezone_gmt_offset(),
        ]);
        $this->setInitialized(true);
    }
}
