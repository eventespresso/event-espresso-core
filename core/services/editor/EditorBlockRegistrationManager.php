<?php

namespace EventEspresso\core\services\editor;

use EE_Error;
use EventEspresso\core\domain\DomainInterface;
use EventEspresso\core\domain\entities\editor\EditorBlockCollection;
use EventEspresso\core\domain\entities\editor\EditorBlockInterface;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\assets\AssetRegisterCollection;
use EventEspresso\core\services\assets\Registry;
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
 * Class EditorBlockRegistrationManager
 * Loads EditorBlockInterface classes into the injected EditorBlockCollection,
 * which can be used in other classes by retrieving it from EE's Loader.
 * After loading, the EditorBlockManager gets each EditorBlock to register
 * its block type and ensures assets are enqueued at the appropriate time
 *
 * @package EventEspresso\core\domain\services\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class EditorBlockRegistrationManager extends EditorBlockManager
{

    /**
     * @var AssetRegisterCollection $asset_register_collection
     */
    protected $asset_register_collection;


    /**
     * EditorBlockRegistrationManager constructor.
     *
     * @param AssetRegisterCollection $asset_register_collection
     * @param EditorBlockCollection   $blocks
     * @param RequestInterface        $request
     * @param DomainInterface         $domain
     * @param Registry                $registry
     */
    public function __construct(
        AssetRegisterCollection $asset_register_collection,
        EditorBlockCollection $blocks,
        RequestInterface $request,
        DomainInterface $domain,
        Registry $registry
    ) {
        parent::__construct($blocks, $request, $domain, $registry);
        $this->asset_register_collection = $asset_register_collection;
    }



    /**
     *  Returns the name of a hookpoint to be used to call initialize()
     *
     * @return string
     */
    public function init_hook()
    {
        return 'AHEE__EE_System__set_hooks_for_core';
    }


    /**
     * Perform any early setup required for block editors to functions
     *
     * @return void
     * @throws Exception
     */
    public function initialize()
    {
        $this->loadEditorBlocks();
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
                    array(
                        // 'EventEspresso\core\domain\entities\editor\blocks\common',
                        // 'EventEspresso\core\domain\entities\editor\blocks\editor',
                        'EventEspresso\core\domain\entities\editor\blocks\widgets',
                    )
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
     * populates the EditorBlockCollection and calls initialize() on all installed blocks
     *
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
     * calls registerBlock() and load assets for all installed blocks
     *
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
                if(! $this->asset_register_collection->has($block->assetRegister())){
                    $this->asset_register_collection->add($block->assetRegister());
                }
                do_action(
                    'FHEE__EventEspresso_core_services_editor_EditorBlockManager__registerEditorBlocks__block_type_registered',
                    $block,
                    $block_type
                );
            }
            if ($this->asset_register_collection->hasObjects()) {
                $this->asset_register_collection->registerManifestFile();
                // register primary assets
                add_action('enqueue_block_assets', array($this, 'registerAssets'));
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * Registers assets for all classes in the AssetRegisterCollection
     */
    public function registerAssets()
    {
        $this->asset_register_collection->registerScripts();
        $this->asset_register_collection->registerStyles();
    }


}
