<?php
namespace EventEspresso\Tests\Testcases\Core;

use EventEspresso\Tests\Mocks\Core\Psr4AutoloaderMock;

class Psr4AutoloaderTest extends \EE_UnitTestCase {

	/**
	 * @type Psr4AutoloaderMock $autoloader
	 */
	protected $autoloader;


	public function setUp() {
		parent::setUp();
		require_once( EE_TESTS_DIR . 'mocks/core/Psr4AutoloaderMock.php' );
		$this->autoloader = new Psr4AutoloaderMock;
		$this->autoloader->setFiles( array(
			'/vendor/foo.bar/src/ClassName.php',
			'/vendor/foo.bar/src/DoomClassName.php',
			'/vendor/foo.bar/tests/ClassNameTest.php',
			'/vendor/foo.bardoom/src/ClassName.php',
			'/vendor/foo.bar.baz.dib/src/ClassName.php',
			'/vendor/foo.bar.baz.dib.zim.gir/src/ClassName.php',
		) );
		$this->autoloader->addNamespace(
			'Foo\Bar',
			'/vendor/foo.bar/src'
		);
		$this->autoloader->addNamespace(
			'Foo\Bar',
			'/vendor/foo.bar/tests'
		);
		$this->autoloader->addNamespace(
			'Foo\BarDoom',
			'/vendor/foo.bardoom/src'
		);
		$this->autoloader->addNamespace(
			'Foo\Bar\Baz\Dib',
			'/vendor/foo.bar.baz.dib/src'
		);
		$this->autoloader->addNamespace(
			'Foo\Bar\Baz\Dib\Zim\Gir',
			'/vendor/foo.bar.baz.dib.zim.gir/src'
		);
	}



	public function testExistingFile() {
		$actual = $this->autoloader->loadClass( 'Foo\Bar\ClassName' );
		$expect = '/vendor/foo.bar/src/ClassName.php';
		$this->assertSame( $expect, $actual );
		$actual = $this->autoloader->loadClass( 'Foo\Bar\ClassNameTest' );
		$expect = '/vendor/foo.bar/tests/ClassNameTest.php';
		$this->assertSame( $expect, $actual );
	}



	public function testMissingFile() {
		$actual = $this->autoloader->loadClass( 'No_Vendor\No_Package\NoClass' );
		$this->assertFalse( $actual );
	}



	public function testDeepFile() {
		$actual = $this->autoloader->loadClass( 'Foo\Bar\Baz\Dib\Zim\Gir\ClassName' );
		$expect = '/vendor/foo.bar.baz.dib.zim.gir/src/ClassName.php';
		$this->assertSame( $expect, $actual );
	}



	public function testConfusion() {
		$actual = $this->autoloader->loadClass( 'Foo\Bar\DoomClassName' );
		$expect = '/vendor/foo.bar/src/DoomClassName.php';
		$this->assertSame( $expect, $actual );
		$actual = $this->autoloader->loadClass( 'Foo\BarDoom\ClassName' );
		$expect = '/vendor/foo.bardoom/src/ClassName.php';
		$this->assertSame( $expect, $actual );
	}



}
// End of file Psr4AutoloaderTest.php
// Location: /tests/testcases/core/Psr4AutoloaderTest.php