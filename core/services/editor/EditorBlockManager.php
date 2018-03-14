<?php

namespace EventEspresso\core\services\editor;

use EE_Error;
use EventEspresso\core\domain\EnqueueAssetsInterface;
use EventEspresso\core\domain\entities\editor\EditorBlockCollection;
use EventEspresso\core\domain\entities\editor\EditorBlockInterface;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\collections\CollectionDetails;
use EventEspresso\core\services\collections\CollectionInterface;
use EventEspresso\core\services\collections\CollectionLoader;
use EventEspresso\core\services\request\RequestInterface;
use Exception;
use InvalidArgumentException;
use ReflectionException;
use WP_Block_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class EditorBlockManager
 * Loads EditorBlockInterface classes into the injected EditorBlockCollection,
 * which can be used in other classes by retrieving it from EE's Loader.
 * After loading, the EditorBlockManager gets each EditorBlock to register
 * its block type and ensures assets are enqueued at the appropriate time
 *
 * @package EventEspresso\core\domain\services\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EditorBlockManager
{

    /**
     * @var CollectionInterface|EditorBlockInterface[] $blocks
     */
    private $blocks;

    /**
     * @var RequestInterface $request
     */
    protected $request;


    /**
     * EditorBlockManager constructor.
     *
     * @param EditorBlockCollection $blocks
     * @param RequestInterface         $request
     */
    public function __construct(EditorBlockCollection $blocks, RequestInterface $request)
    {
        $this->blocks  = $blocks;
        $this->request = $request;
        //  populates the EditorBlockCollection and calls initialize() on all installed blocks
        add_action('AHEE__EE_System__core_loaded_and_ready', array($this, 'loadEditorBlocks'));
        //  call initialize() and load assets for all installed blocks
        add_action('AHEE__EE_System__initialize', array($this, 'registerEditorBlocks'));
    }


    /**
     * @return CollectionInterface|EditorBlockInterface[]
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws EE_Error
     * @throws InvalidClassException
     * @throws InvalidDataTypeException
     * @throws InvalidEntityException
     * @throws InvalidFilePathException
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     */
    protected function populateEditorBlockCollection()
    {
        $loader = new CollectionLoader(
            new CollectionDetails(
            // collection name
                'shortcodes',
                // collection interface
                'EventEspresso\core\domain\entities\editor\EditorBlockInterface',
                // FQCNs for classes to add (all classes within each namespace will be loaded)
                apply_filters(
                    'FHEE__EventEspresso_core_services_editor_EditorBlockManager__populateEditorBlockCollection__collection_FQCNs',
                    array('EventEspresso\core\domain\entities\editor\blocks')
                ),
                // filepaths to classes to add
                array(),
                // file mask to use if parsing folder for files to add
                '',
                // what to use as identifier for collection entities
                // using CLASS NAME prevents duplicates (works like a singleton)
                CollectionDetails::ID_CLASS_NAME
            ),
            $this->blocks
        );
        return $loader->getCollection();
    }


    /**
     * @return void
     * @throws Exception
     */
    public function loadEditorBlocks()
    {
        try {
            $this->populateEditorBlockCollection();
            // cycle thru block loaders and initialize each loader
            foreach ($this->blocks as $block) {
                $block->initialize();
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @return void
     * @throws Exception
     */
    public function registerEditorBlocks()
    {
        try {
            // cycle thru block loader folders
            foreach ($this->blocks as $block) {
                // perform any setup required for the block
                $block_type = $block->registerBlock();
                if (! $block_type instanceof WP_Block_Type) {
                    throw new InvalidEntityException($block_type, 'WP_Block_Type');
                }
                do_action(
                    'FHEE__EventEspresso_core_services_editor_EditorBlockManager__registerEditorBlocks__block_type_registered',
                    $block,
                    $block_type
                );
                if ($block instanceof EnqueueAssetsInterface) {
                    // the following can be refactored in whatever way works best,
                    // but it should be self evident that controlling asset loading from here
                    // avoids having to add the following lines of code in every EditorBlock class
                    add_action('enqueue_block_assets', array($block, 'registerScripts'));
                    add_action('enqueue_block_assets', array($block, 'registerStyles'));
                }
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }
}
