<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\domains;

use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

/**
 * Class GutenbergEditorData
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes\domains
 * @author  Brent Christensen
 * @since   $VID:$
 */
class GutenbergEditorData extends JsonDataNode
{

    const NODE_NAME = 'blocks';


    /**
     * WordPressPluginsPageData JsonDataNode constructor.
     *
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(JsonDataNodeValidator $validator) {
        parent::__construct($validator);
        $this->setDomain(GutenbergEditorData::NODE_NAME);
        $this->setNodeName(GutenbergEditorData::NODE_NAME);
    }


    /**
     * @inheritDoc
     */
    public function initialize()
    {
        // $this->addData('block-name', []);
    }
}
