<?php

namespace EventEspresso\core\services\editor;

use EventEspresso\core\domain\entities\editor\BlockCollection;
use EventEspresso\core\domain\entities\editor\BlockInterface;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class BlockManager
 * Description
 *
 * @package EventEspresso\core\services\editor
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
abstract class BlockManager
{

    /**
     * @var CollectionInterface|BlockInterface[] $blocks
     */
    protected $blocks;

    /**
     * @var RequestInterface $request
     */
    protected $request;



    /**
     * BlockManager constructor.
     *
     * @param BlockCollection   $blocks
     * @param RequestInterface  $request
     */
    public function __construct(
        BlockCollection $blocks,
        RequestInterface $request
    ) {
        $this->blocks            = $blocks;
        $this->request           = $request;
        add_action($this->initHook(), array($this, 'initialize'));
    }


    /**
     *  Returns the name of a hookpoint to be used to call initialize()
     *
     * @return string
     */
    abstract public function initHook();


    /**
     * Perform any early setup required for block editors to functions
     *
     * @return void
     */
    abstract public function initialize();
}
