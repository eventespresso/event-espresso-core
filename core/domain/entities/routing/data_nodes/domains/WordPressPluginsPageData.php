<?php

namespace EventEspresso\core\domain\entities\routing\data_nodes\domains;

use EventEspresso\core\domain\services\admin\ExitModal;
use EventEspresso\core\services\json\JsonDataNode;
use EventEspresso\core\services\json\JsonDataNodeValidator;

/**
 * Class WordPressPluginsPageData
 * Description
 *
 * @package EventEspresso\core\domain\entities\routing\data_nodes\domains
 * @author  Brent Christensen
 * @since   $VID:$
 */
class WordPressPluginsPageData extends JsonDataNode
{

    const NODE_NAME = 'wpPluginsPage';

    /**
     * @var ExitModal $exit_modal
     */
    private $exit_modal;


    /**
     * WordPressPluginsPageData JsonDataNode constructor.
     *
     * @param ExitModal             $exit_modal
     * @param JsonDataNodeValidator $validator
     */
    public function __construct(
        ExitModal $exit_modal,
        JsonDataNodeValidator $validator
    ) {
        parent::__construct($validator);
        $this->exit_modal = $exit_modal;
        $this->setDomain(WordPressPluginsPageData::NODE_NAME);
        $this->setNodeName(WordPressPluginsPageData::NODE_NAME);
    }


    /**
     * @inheritDoc
     */
    public function initialize()
    {
        $data = $this->exit_modal->getExitSurveyInfo();
        $this->addData('eeExitSurveyInfo', $data);
    }
}