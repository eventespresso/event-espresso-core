<?php

namespace EventEspresso\Tests\Testcases\Core;

use EventEspresso\Tests\Mocks\Core\EE_Psr4Autoloader_Mock;

if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }


class EE_Psr4Autoloader_Test extends \EE_UnitTestCase {

	protected $loader;


	public function setUp() {
		$this->loader = new EE_Psr4Autoloader_Mock;
		$this->loader->setFiles( array(
			'/vendor/foo.bar/src/ClassName.php',
			'/vendor/foo.bar/src/DoomClassName.php',
			'/vendor/foo.bar/tests/ClassNameTest.php',
			'/vendor/foo.bardoom/src/ClassName.php',
			'/vendor/foo.bar.baz.dib/src/ClassName.php',
			'/vendor/foo.bar.baz.dib.zim.gir/src/ClassName.php',
		) );
		$this->loader->addNamespace(
			'Foo\Bar',
			'/vendor/foo.bar/src'
		);
		$this->loader->addNamespace(
			'Foo\Bar',
			'/vendor/foo.bar/tests'
		);
		$this->loader->addNamespace(
			'Foo\BarDoom',
			'/vendor/foo.bardoom/src'
		);
		$this->loader->addNamespace(
			'Foo\Bar\Baz\Dib',
			'/vendor/foo.bar.baz.dib/src'
		);
		$this->loader->addNamespace(
			'Foo\Bar\Baz\Dib\Zim\Gir',
			'/vendor/foo.bar.baz.dib.zim.gir/src'
		);
	}



	public function testExistingFile() {
		$actual = $this->loader->loadClass( 'Foo\Bar\ClassName' );
		$expect = '/vendor/foo.bar/src/ClassName.php';
		$this->assertSame( $expect, $actual );
		$actual = $this->loader->loadClass( 'Foo\Bar\ClassNameTest' );
		$expect = '/vendor/foo.bar/tests/ClassNameTest.php';
		$this->assertSame( $expect, $actual );
	}



	public function testMissingFile() {
		$actual = $this->loader->loadClass( 'No_Vendor\No_Package\NoClass' );
		$this->assertFalse( $actual );
	}



	public function testDeepFile() {
		$actual = $this->loader->loadClass( 'Foo\Bar\Baz\Dib\Zim\Gir\ClassName' );
		$expect = '/vendor/foo.bar.baz.dib.zim.gir/src/ClassName.php';
		$this->assertSame( $expect, $actual );
	}



	public function testConfusion() {
		$actual = $this->loader->loadClass( 'Foo\Bar\DoomClassName' );
		$expect = '/vendor/foo.bar/src/DoomClassName.php';
		$this->assertSame( $expect, $actual );
		$actual = $this->loader->loadClass( 'Foo\BarDoom\ClassName' );
		$expect = '/vendor/foo.bardoom/src/ClassName.php';
		$this->assertSame( $expect, $actual );
	}



}
// End of file EE_Psr4Autoloader_Test.php
// Location: /tests/testcases/core/EE_Psr4Autoloader_Test.php