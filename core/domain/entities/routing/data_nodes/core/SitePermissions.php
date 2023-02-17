<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\core;

use EventEspresso\core\domain\services\capabilities\FeatureFlags;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

class SitePermissions extends JsonDataNode
{
    const NODE_NAME = 'sitePermissions';

    /**
     * @var FeatureFlags
     */
    private $feature_flags;


    /**
     * @param FeatureFlags          $feature_flags
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(FeatureFlags $feature_flags, JsonDataNodeValidator $validator)
    {
        $this->feature_flags = $feature_flags;
        parent::__construct($validator);
        $this->setNodeName(SitePermissions::NODE_NAME);
    }


    /**
     * @inheritDoc
     */
    public function initialize()
    {
        $this->setDataArray($this->feature_flags->getAllowedFeatures());
    }
}
