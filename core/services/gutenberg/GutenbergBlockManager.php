<?php

namespace EventEspresso\core\services\gutenberg;

use EE_Error;
use EE_Request;
use EventEspresso\core\domain\EnqueueAssetsInterface;
use EventEspresso\core\domain\entities\gutenberg\GutenbergBlockCollection;
use EventEspresso\core\domain\entities\gutenberg\GutenbergBlockInterface;
use EventEspresso\core\domain\services\gutenberg\GutenbergBlockLoaderInterface;
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
use EventEspresso\core\services\shortcodes\ShortcodeInterface;
use Exception;
use InvalidArgumentException;
use ReflectionException;
use WP_Block_Type;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class GutenbergBlockManager
 * Loads a Collection of GutenbergBlockLoaderInterface classes,
 * which load their corresponding GutenbergBlockInterface classes.
 * GutenbergBlocks get added to the injected GutenbergBlockCollection,
 * which can be used in other classes by retrieving it from EE's Loader.
 * After loading, the GutenbergBlockManager gets each GutenbergBlock to register
 * its block type and ensures assets are enqueued at the appropriate time
 *
 * @package EventEspresso\core\domain\services\gutenberg
 * @author  Brent Christensen
 * @since   $VID:$
 */
class GutenbergBlockManager
{

    /**
     * @var CollectionInterface|GutenbergBlockInterface[] $blocks
     */
    private $blocks;

    /**
     * @var CollectionInterface|GutenbergBlockLoaderInterface[] $block_loaders
     */
    private $block_loaders;

    /**
     * @var EE_Request $request
     */
    protected $request;


    /**
     * GutenbergBlockManager constructor.
     *
     * @param GutenbergBlockCollection $blocks
     * @param EE_Request               $request
     */
    public function __construct(GutenbergBlockCollection $blocks, EE_Request $request)
    {
        $this->blocks  = $blocks;
        $this->request = $request;
        // assemble a list of installed block loaders and call initialize() on each one
        add_action(
            'AHEE__EE_System__register_shortcodes_modules_and_widgets',
            array($this, 'initializeGutenbergBlockLoaders'),
            999
        );
        //  call loadGutenbergBlock() for all installed block loaders
        add_action('AHEE__EE_System__core_loaded_and_ready', array($this, 'loadGutenbergBlocks'));
        //  call initialize() and load assets for all installed blocks
        add_action('AHEE__EE_System__initialize', array($this, 'registerGutenbergBlocks'));
    }


    /**
     * @return CollectionInterface|ShortcodeInterface[]
     * @throws ReflectionException
     * @throws InvalidArgumentException
     * @throws EE_Error
     * @throws InvalidIdentifierException
     * @throws InvalidInterfaceException
     * @throws InvalidFilePathException
     * @throws InvalidEntityException
     * @throws InvalidDataTypeException
     * @throws InvalidClassException
     */
    public function getGutenbergBlockLoaders()
    {
        if (! $this->block_loaders instanceof CollectionInterface) {
            $this->block_loaders = $this->loadGutenbergBlockLoadersCollection();
        }
        return $this->block_loaders;
    }


    /**
     * @return CollectionInterface|GutenbergBlockLoaderInterface[]
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
    protected function loadGutenbergBlockLoadersCollection()
    {
        $loader = new CollectionLoader(
            new CollectionDetails(
            // collection name
                'shortcodes',
                // collection interface
                'EventEspresso\core\domain\services\gutenberg\GutenbergBlockLoaderInterface',
                // FQCNs for classes to add (all classes within that namespace will be loaded)
                array('EventEspresso\core\domain\services\gutenberg\loaders'),
                // filepaths to classes to add
                array(),
                // file mask to use if parsing folder for files to add
                '',
                // what to use as identifier for collection entities
                // using CLASS NAME prevents duplicates (works like a singleton)
                CollectionDetails::ID_CLASS_NAME
            )
        );
        return $loader->getCollection();
    }


    /**
     * @return void
     * @throws Exception
     */
    public function initializeGutenbergBlockLoaders()
    {
        try {
            $this->block_loaders = apply_filters(
                'FHEE__EventEspresso_core_services_gutenberg_GutenbergBlockManager__registerGutenbergBlockLoaders__block_loader_collection',
                $this->getGutenbergBlockLoaders()
            );
            if (! $this->block_loaders instanceof CollectionInterface) {
                throw new InvalidEntityException(
                    $this->block_loaders,
                    'CollectionInterface',
                    sprintf(
                        esc_html__(
                            'The "FHEE__EventEspresso_core_services_gutenberg_GutenbergBlockManager__registerGutenbergBlockLoaders__block_loader_collection" filter must return a Collection of GutenbergBlockLoader objects. "%1$s" was received instead.',
                            'event_espresso'
                        ),
                        is_object($this->block_loaders)
                            ? get_class($this->block_loaders)
                            : gettype($this->block_loaders)
                    )
                );
            }
            // cycle thru block loaders and initialize each loader
            foreach ($this->block_loaders as $block_loader) {
                $block_loader->initialize();
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }


    /**
     * @return void
     * @throws Exception
     */
    public function loadGutenbergBlocks()
    {
        try {
            // cycle thru block loaders and conditionally load blocks
            foreach ($this->block_loaders as $block_loader) {
                if(
                    $block_loader->loadBlockForRequest($this->request)
                    && $this->blocks->has($block_loader->getBlockIdentifier()) === false
                ){
                    $block = $block_loader->loadGutenbergBlock();
                    if($this->blocks->add($block, $block_loader->getBlockIdentifier())) {
                        do_action(
                            'FHEE__EventEspresso_core_services_gutenberg_GutenbergBlockManager__loadGutenbergBlocks__block_loaded',
                            $block
                        );
                    }
                }
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }

    /**
     * @return void
     * @throws Exception
     */
    public function registerGutenbergBlocks()
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
                    'FHEE__EventEspresso_core_services_gutenberg_GutenbergBlockManager__registerGutenbergBlocks__block_type_registered',
                    $block,
                    $block_type
                );
                if ($block instanceof EnqueueAssetsInterface) {
                    // the following can be refactored in whatever way works best,
                    // but it should be self evident that controlling asset loading from here
                    // avoids having to add the following lines of code in every GutenbergBlock class
                    if($this->request->isAdmin()) {
                        add_action('admin_enqueue_scripts', array($block, 'registerScriptsAndStylesheets'), 10);
                        add_action('admin_enqueue_scripts', array($block, 'enqueueStylesheets'), 11);
                    } else {
                        add_action('wp_enqueue_scripts', array($block, 'registerScriptsAndStylesheets'), 10);
                        add_action('wp_enqueue_scripts', array($block, 'enqueueStylesheets'), 11);
                    }
                }
            }
        } catch (Exception $exception) {
            new ExceptionStackTraceDisplay($exception);
        }
    }
}
