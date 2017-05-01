<?php
use EventEspresso\tests\mocks\core\services\commands\MockCommand;
use EventEspresso\tests\mocks\core\services\commands\MockCompositeCommand;
use EventEspresso\tests\mocks\core\services\commands\MockCompositeCommandHandler;
use EventEspresso\tests\testcases\core\services\commands\ExtendedCommandHandlerManager;
use EventEspresso\tests\mocks\core\services\commands\MockCommandHandler;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class CommandHandlerManagerTest
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         $VID:$
 * @group         CommandBus
 */
class CommandHandlerManagerTest extends EE_UnitTestCase
{

    /**
     * @var ExtendedCommandHandlerManager $command_handler_manager
     */
    private $command_handler_manager;


    public function setUp()
    {
        EE_Dependency_Map::register_dependencies(
            'EventEspresso\tests\testcases\core\services\commands\ExtendedCommandHandlerManager',
            array('EE_Registry' => EE_Dependency_Map::load_from_cache,)
        );
        parent::setUp();
        $this->command_handler_manager = EE_Registry::instance()->create(
            'EventEspresso\tests\testcases\core\services\commands\ExtendedCommandHandlerManager'
        );
    }



    public function testAddCommandHandler()
    {
        $command_fqcn = 'EventEspresso\tests\mocks\core\services\commands\MockCommand';
        $this->command_handler_manager->addCommandHandler(
            new MockCommandHandler(),
            $command_fqcn
        );
        $command_handlers = $this->command_handler_manager->getCommandHandlers();
        $this->assertArrayHasKey($command_fqcn, $command_handlers);
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\commands\MockCommandHandler',
            $command_handlers[$command_fqcn]
        );
    }



    public function testGetCommandHandler()
    {
        // test regular CommandHandler
        $command_handler = $this->command_handler_manager->getCommandHandler(new MockCommand());
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\commands\MockCommandHandler',
            $command_handler
        );
        // test CompositeCommandHandler
        $command_bus = EE_Registry::instance()->create(
            '\EventEspresso\tests\mocks\core\services\commands\CommandBusMock'
        );
        /** @var MockCompositeCommandHandler $composite_command_handler */
        $composite_command_handler = $this->command_handler_manager->getCommandHandler(
            new MockCompositeCommand(),
            $command_bus
        );
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\commands\MockCompositeCommandHandler',
            $composite_command_handler
        );
        $this->assertInstanceOf(
            'EventEspresso\tests\mocks\core\services\commands\CommandBusMock',
            $composite_command_handler->commandBus()
        );
    }

}
// End of file CommandHandlerManagerTest.php
// Location: testcases/core/services/commands/CommandHandlerManagerTest.php