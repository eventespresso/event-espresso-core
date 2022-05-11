<?php
use EventEspresso\tests\mocks\core\services\commands\CommandBusMock;
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
 * 
 * @group         CommandBus
 */
class CommandHandlerManagerTest extends EE_UnitTestCase
{

    /**
     * @var ExtendedCommandHandlerManager $command_handler_manager
     */
    private $command_handler_manager;


    public function set_up()
    {
        EE_Dependency_Map::register_dependencies(
            'EventEspresso\tests\testcases\core\services\commands\ExtendedCommandHandlerManager',
            array('EventEspresso\core\services\loaders\Loader' => EE_Dependency_Map::load_from_cache,)
        );
        parent::set_up();
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
    }



    public function testGetCommandHandlerWithCompositeCommandHandler()
    {
        $this->command_handler_manager->addCommandHandler(
            new MockCompositeCommandHandler(
                new CommandBusMock(),
                EE_Registry::instance()->create('EventEspresso\core\services\commands\CommandFactory')
            ),
            'EventEspresso\tests\mocks\core\services\commands\MockCompositeCommand'
        );
        $composite_command_handler = $this->command_handler_manager->getCommandHandler(
            new MockCompositeCommand()
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