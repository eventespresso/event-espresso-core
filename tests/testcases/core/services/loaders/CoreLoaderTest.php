<?php
use EventEspresso\core\services\loaders\CoreLoader;
use EventEspresso\core\services\loaders\LoaderInterface;

/**
 * CoreLoaderTest
 * Tests CoreLoader
 *
 * @package    EventEspresso\tests
 * @subpackage \testcases
 * @author     Brent Christenson
 * @since      4.9.38.rc
 * @group      LoaderTest
 * @group      CoreLoaderTest
 */
class CoreLoaderTest extends EE_UnitTestCase
{


    /**
     * @var LoaderInterface $loader
     */
    private $test_loader;



    public function setUp()
    {
        parent::setUp();
        $this->test_loader = new CoreLoader(EE_Registry::instance());
    }



    /**
     * testBadConstruct
     */
    public function testBadConstruct()
    {
        try {
            $this->test_loader = new CoreLoader(new stdClass());
            $this->fail('EventEspresso\core\services\loaders\CoreLoader should have thrown an InvalidArgumentException');
        } catch (Exception $e) {
            $this->assertTrue(true);
        }
    }



    /**
     * testLoad
     */
    public function testLoad()
    {
        $fqcn = '\EventEspresso\core\services\address\formatters\AddressFormatter';
        $formatter = $this->test_loader->load($fqcn);
        $this->assertInstanceOf(
            $fqcn,
            $formatter,
            sprintf(
                '%1$s is not an instance of $fqcn',
                is_object($formatter) ? get_class($formatter) : print_r($formatter, true),
                $fqcn
            )
        );
    }

}


// End of file CoreLoaderTest.php
// Location: tests/testcases/core/services/loaders/CoreLoaderTest.php