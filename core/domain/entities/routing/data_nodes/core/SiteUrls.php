<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

/**
 * Class SiteUrls
 * Description
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes
 * @author  Brent Christensen
 * @since   $VID:$
 */
class SiteUrls extends JsonDataNode
{
    const NODE_NAME = 'siteUrls';


    /**
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(JsonDataNodeValidator $validator)
    {
        parent::__construct($validator);
        $this->setNodeName(SiteUrls::NODE_NAME);
    }


    /**
     * @since $VID:$
     */
    public function initialize()
    {
        $this->addData('admin', admin_url('/'));
        $this->addData('home', site_url('/'));
        $this->setInitialized(true);
    }
}
