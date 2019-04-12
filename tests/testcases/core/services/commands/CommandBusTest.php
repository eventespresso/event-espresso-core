<?php
use EventEspresso\core\services\commands\CommandBus;
use EventEspresso\core\services\commands\middleware\CapChecker;
use EventEspresso\tests\mocks\core\domain\services\capabilities\CapabilitiesCheckerMock;
use EventEspresso\tests\mocks\core\services\commands\MockCommand;
use EventEspresso\tests\mocks\core\services\commands\MockTwoCommand;
use EventEspresso\tests\mocks\core\services\commands\MockCommandHandler;
use EventEspresso\tests\mocks\core\services\commands\RequiresCapCheckMockCommand;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CommandBusTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 *
 * @group         CommandBus
 */
class CommandBusTest extends EE_UnitTestCase
{

    /**
     * @var CommandBus $command_bus
     */
    private $command_bus;



    public function setUp()
    {
        EE_Dependency_Map::register_dependencies(
            'EventEspresso\tests\mocks\core\services\commands\CommandHandlerManagerMock',
            array('EE_Registry' => EE_Dependency_Map::load_from_cache,)
        );
        // need to override the existing alias for the CommandHandlerManagerInterface
        // or else the REAL class will still get used
        EE_Dependency_Map::instance()->add_alias(
            'EventEspresso\tests\mocks\core\services\commands\CommandHandlerManagerMock',
            'EventEspresso\core\services\commands\CommandHandlerManagerInterface'
        );
        parent::setUp();
    }


    /**
     * @param array $middleware
     * @throws \PHPUnit\Framework\Exception
     */
    protected function setupCommandBus(array $middleware = array())
    {
        // setup a Bus that uses our Mocked CommandHandlerManager
        $this->command_bus = new EventEspresso\core\services\commands\CommandBus(
            new EventEspresso\tests\mocks\core\services\commands\CommandHandlerManagerMock(),
            $middleware
        );
        $this->assertInstanceOf(
            'EventEspresso\core\services\commands\CommandBus',
            $this->command_bus
        );
    }


    /**
     * @throws \PHPUnit\Framework\Exception
     */
    public function testGetCommandHandlerManager()
    {
        $this->setupCommandBus();
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\commands\CommandHandlerManagerMock',
            $this->command_bus->getCommandHandlerManager()
        );
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\services\commands\InvalidCommandHandlerException
     * @throws \EventEspresso\core\services\commands\middleware\InvalidCommandBusMiddlewareException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testExecute()
    {
        $this->setupCommandBus();
        // final results we want to see from CommandHandler
        $you_did_it = 'you done gone an did it now';
        // create CommandHandler and set the results
        $command_handler = new MockCommandHandler();
        $command_handler->results = $you_did_it;
        // the Command we want to use
        $command_fqcn = 'EventEspresso\tests\mocks\core\services\commands\MockCommand';
        $command_handler_manager = $this->command_bus->getCommandHandlerManager();
        // associate CommandHandler with the above Command
        $command_handler_manager->addCommandHandler(
            $command_handler,
            $command_fqcn
        );
        // execute Command and get results
        $results = $this->command_bus->execute(new MockCommand());
        $this->assertEquals($you_did_it, $results);
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\services\commands\InvalidCommandHandlerException
     * @throws \EventEspresso\core\services\commands\middleware\InvalidCommandBusMiddlewareException
     * @throws \PHPUnit\Framework\Exception
     */
    public function testExecuteWithPassingCapCheck()
    {
        // add CapChecker middleware that uses Mock that always returns true
        $this->setupCommandBus(
            array(new CapChecker(new CapabilitiesCheckerMock()))
        );
        // final results we want to see from CommandHandler
        $passed = 'this command passed its cap check';
        // create CommandHandler and set the results
        $command_handler = new MockCommandHandler();
        $command_handler->results = $passed;
        // the Command we want to use
        $command_fqcn = 'EventEspresso\tests\mocks\core\services\commands\RequiresCapCheckMockCommand';
        $command_handler_manager = $this->command_bus->getCommandHandlerManager();
        // associate CommandHandler with the above Command (note that class names don't match, but that's ok)
        $command_handler_manager->addCommandHandler(
            $command_handler,
            $command_fqcn
        );
        $results = $this->command_bus->execute(new RequiresCapCheckMockCommand());
        $this->assertEquals($passed, $results);
    }


    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\services\commands\InvalidCommandHandlerException
     * @throws \EventEspresso\core\services\commands\middleware\InvalidCommandBusMiddlewareException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \PHPUnit\Framework\Exception
     */
    public function testExecuteWithFailingCapCheck()
    {
        $capabilities_checker = new CapabilitiesCheckerMock();
        // now change the CapabilitiesChecker so that ALL cap checks fail
        $capabilities_checker->cap_check_passes = false;
        // add CapChecker middleware that uses Mock that always returns true
        $this->setupCommandBus(
            array(new CapChecker($capabilities_checker))
        );
        // final results we want to see from CommandHandler
        $passed = 'this command should NOT pass its cap check';
        // create CommandHandler and set the results
        $command_handler = new MockCommandHandler();
        $command_handler->results = $passed;
        // the Command we want to use
        $command_fqcn = 'EventEspresso\tests\mocks\core\services\commands\RequiresCapCheckMockCommand';
        $command_handler_manager = $this->command_bus->getCommandHandlerManager();
        // associate CommandHandler with the above Command
        // note that the class names don't match, but that's ok,
        // because this Mock doesn't really resolve classnames and instantiate objects,
        // it just
        $command_handler_manager->addCommandHandler(
            $command_handler,
            $command_fqcn
        );
        $this->setExpectedException('EventEspresso\core\exceptions\InsufficientPermissionsException');
        $this->command_bus->execute(new RequiresCapCheckMockCommand());
        $this->fail('InsufficientPermissionsException should have been thrown');
    }

    /**
     * @throws InvalidArgumentException
     * @throws \EventEspresso\core\exceptions\InvalidDataTypeException
     * @throws \EventEspresso\core\services\commands\InvalidCommandHandlerException
     * @throws \EventEspresso\core\services\commands\middleware\InvalidCommandBusMiddlewareException
     * @throws \PHPUnit\Framework\AssertionFailedError
     * @throws \PHPUnit\Framework\Exception
     */
    public function testExecuteWithIncorrectCommand()
    {
        $this->setupCommandBus();
        // create CommandHandler and set the results
        $command_handler = new MockCommandHandler();
        // the Command that we have configured our CommandHandler to expect
        $command_handler->expected = 'EventEspresso\tests\mocks\core\services\commands\MockTwoCommand';
        // the Command we are actually going to use
        $command_fqcn = 'EventEspresso\tests\mocks\core\services\commands\MockCommand';
        // associate CommandHandler with the above Command
        $command_handler_manager = $this->command_bus->getCommandHandlerManager();
        $command_handler_manager->addCommandHandler($command_handler, $command_fqcn);
        $this->setExpectedException('EventEspresso\core\exceptions\InvalidEntityException');
        // execute Command
        $this->command_bus->execute(new MockCommand());
        $this->fail('InvalidEntityException should have been thrown');
    }
}
// End of file CommandBusTest.php
// Location: testcases/core/services/commands/CommandBusTest.php
