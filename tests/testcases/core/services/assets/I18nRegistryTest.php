<?php

use EventEspresso\core\domain\DomainFactory;
use EventEspresso\core\domain\values\FilePath;
use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\core\domain\values\Version;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidFilePathException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\assets\JedLocaleData;
use EventEspresso\tests\mocks\core\services\assets\I18nRegistryMock;

class I18nRegistryTest extends EE_UnitTestCase
{

    /**
     * @var I18nRegistryMock
     */
    private $i18n;


    /**
     * @throws DomainException
     * @throws InvalidArgumentException
     * @throws InvalidClassException
     * @throws InvalidDataTypeException
     * @throws InvalidFilePathException
     * @throws InvalidInterfaceException
     * @throws EE_Error
     */
    public function setUp()
    {
        $domain = DomainFactory::getShared(
            new FullyQualifiedName(
                'EventEspresso\core\domain\Domain'
            ),
            array(
                new FilePath(EVENT_ESPRESSO_MAIN_FILE),
                Version::fromString(espresso_version())
            )
        );
        $test_map = array(
            'test' =>  array(
                'Do you have a moment to share why you are deactivating Event Espresso?',
                "Sure I'll help",
                'Skip'
            ),
        );
        $this->i18n = new I18nRegistryMock(
            $domain,
            new JedLocaleData(),
            $test_map
        );
        parent::setUp();
    }


    public function tearDown()
    {
        parent::tearDown();
        $this->i18n = null;
    }


    /**
     * see https://github.com/eventespresso/event-espresso-core/pull/458
     * @group 458
     */
    public function testInlineScriptsOnlyQueuedOnce()
    {
        // simulate registering the script handle
        $this->i18n->registerScriptI18n('test');

        //let's trigger `print_scripts_array` twice.
        apply_filters('print_scripts_array', array('test'));
        apply_filters('print_scripts_array', array('test'));

        //now we expect `registerInlineScript to have been called only once
        $this->assertEquals( 1, $this->i18n->getCountOfMethodCalled(
            'EventEspresso\tests\mocks\core\services\assets\I18nRegistryMock::registerInlineScript'
        ) );

        //register script again *gasp*
        $this->i18n->registerScriptI18n('test');

        //call apply_filters again
        apply_filters('print_scripts_array', array('test'));

        //still should only have been called once
        $this->assertEquals( 1, $this->i18n->getCountOfMethodCalled(
            'EventEspresso\tests\mocks\core\services\assets\I18nRegistryMock::registerInlineScript'
        ) );
    }
}
