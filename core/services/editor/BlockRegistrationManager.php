<?php

namespace EventEspresso\core\services\editor;

use EE_Error;
use EventEspresso\core\domain\entities\editor\BlockCollection;
use EventEspresso\core\domain\entities\editor\BlockInterface;
use EventEspresso\core\exceptions\ExceptionStackTraceDisplay;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\core\exceptions\InvalidIdentifierException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\assets\AssetRegisterCollection;
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
 * Class BlockRegistrationManager
 * Loads BlockInterface classes into the injected BlockCollection,
 * which can be used in other classes by retrieving it from EE's Loader.
 * After loading, the BlockManager gets each Block to register
 * its block type and ensures assets are enqueued at the appropriate time
 *
 * @package EventEspresso\core\domain\services\editor
 * @author  Brent Christensen
 * @since   $VID:$
 */
class BlockRegistrationManager extends BlockManager
{

    /**
     * @var AssetRegisterCollection $asset_register_collection
     */
    protected $asset_register_collection;


    /**
     * BlockRegistrationManager constructor.
     *
     * @param AssetRegisterCollection $asset_register_collection
     * @param BlockCollection         $blocks
     * @param RequestInterface        $request
     */
    public function __construct(
        AssetRegisterCollection $asset_register_collection,
        BlockCollection $blocks,
        RequestInterface $request
    ) {
        $this->asset_register_collection = $asset_register_collection;
        parent::__construct($blocks, $request);
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
        $this->loadBlocks();
        add_action('AHEE__EE_System__initialize', array($this, 'registerBlocks'));
    }


    /**
     * @return CollectionInterface|BlockInterface[]
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
    protected function populateBlockCollection()
    {
        $loader = new CollectionLoader(
            new CollectionDetails(
            // collection name
                'shortcodes',
                // collection interface
                'EventEspresso\core\domain\entities\editor\BlockInterface',
                // FQCNs for classes to add (all classes within each namespace will be loaded)
                apply_filters(
                    'FHEE__EventEspresso_core_services_editor_BlockManager__populateBlockCollection__collection_FQCNs',
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
     * populates the BlockCollection and calls initialize() on all installed blocks
     *
     * @return void
     * @throws Exception
     */
    public function loadBlocks()
    {
        try {
            $this->populateBlockCollection();
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
    public function registerBlocks()
    {
        try {
            // cycle thru block loader folders
            foreach ($this->blocks as $block) {
                // perform any setup required for the block
                $block_type = $block->registerBlock();
                if (! $block_type instanceof WP_Block_Type) {
                    throw new InvalidEntityException($block_type, 'WP_Block_Type');
                }
                if (! $this->asset_register_collection->has($block->assetRegister())) {
                    $this->asset_register_collection->add($block->assetRegister());
                }
                do_action(
                    'FHEE__EventEspresso_core_services_editor_BlockManager__registerBlocks__block_type_registered',
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
