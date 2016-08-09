<?php
namespace EventEspresso\core;

/**
 * Class Psr4Autoloader
 *
 * A general-purpose autoloader implementation that includes the optional
 * functionality of allowing multiple base directories for a single namespace
 * prefix.
 *
 * Given a foo-bar package of classes in the file system at the following
 * paths ...
 *
 *     /path/to/packages/foo-bar/
 *         src/
 *             Baz.php             # Foo\Bar\Baz
 *             Qux/
 *                 Quux.php        # Foo\Bar\Qux\Quux
 *         tests/
 *             BazTest.php         # Foo\Bar\BazTest
 *             Qux/
 *                 QuuxTest.php    # Foo\Bar\Qux\QuuxTest
 *
 * ... add the path to the class files for the \Foo\Bar\ namespace prefix
 * as follows:
 *
 *      <?php
 *      // instantiate the loader
 *      $loader = new \Example\Psr4Autoloader;
 *
 *      // register the autoloader
 *      $loader->register();
 *
 *      // register the base directories for the namespace prefix
 *      $loader->addNamespace('Foo\Bar', '/path/to/packages/foo-bar/src');
 *      $loader->addNamespace('Foo\Bar', '/path/to/packages/foo-bar/tests');
 *
 * The following line would cause the autoloader to attempt to load the
 * \Foo\Bar\Qux\Quux class from /path/to/packages/foo-bar/src/Qux/Quux.php:
 *
 *      <?php
 *      new \Foo\Bar\Qux\Quux;
 *
 * The following line would cause the autoloader to attempt to load the
 * \Foo\Bar\Qux\QuuxTest class from /path/to/packages/foo-bar/tests/Qux/QuuxTest.php:
 *
 *      <?php
 *      new \Foo\Bar\Qux\QuuxTest;
 *
 * @package 			Event Espresso
 * @subpackage 	core
 * @author 				php-fig.org
 * @see                    http://www.php-fig.org/psr/psr-4/examples/
 * @since 				$VID:$
 *
 */
class Psr4Autoloader {

	/**
	 * namespace separator
	 */
	const NS = '\\';

	/**
	 * An associative array where the key is a namespace prefix and the value
	 * is an array of base directories for classes in that namespace.
	 *
	 * @var array
	 */
	protected $prefixes = array();



	/**
	 * returns an array of registered namespace prefixes
	 *
	 * @param string $prefix
	 * @return array
	 */
	public function prefixes( $prefix = '' ) {
		if ( ! empty( $prefix ) ) {
			// are there any base directories for this namespace prefix?
			return isset( $this->prefixes[ $prefix ] ) ? $this->prefixes[ $prefix ] : array();
		}
		return $this->prefixes;
	}



	/**
	 * Register loader with SPL autoloader stack.
	 *
	 * @return void
	 */
	public function register() {
		spl_autoload_register( array( $this, 'loadClass' ) );
	}



	/**
	 * Adds a base directory for a namespace prefix.
	 *
	 * @param string $prefix The namespace prefix.
	 * @param string $base_dir A base directory for class files in the
	 * namespace.
	 * @param bool $prepend If true, prepend the base directory to the stack
	 * instead of appending it; this causes it to be searched first rather
	 * than last.
	 * @return void
	 */
	public function addNamespace( $prefix, $base_dir, $prepend = false ) {
		// normalize namespace prefix
		$prefix = trim( $prefix, Psr4Autoloader::NS ) . Psr4Autoloader::NS;
		// normalize the base directory with a trailing separator
		$base_dir = \EEH_File::standardise_and_end_with_directory_separator( $base_dir );
		// initialize the namespace prefix array
		if ( isset( $this->prefixes[ $prefix ] ) === false ) {
			$this->prefixes[ $prefix ] = array();
		}
		// retain the base directory for the namespace prefix
		if ( $prepend ) {
			array_unshift( $this->prefixes[ $prefix ], $base_dir );
		} else {
			$this->prefixes[ $prefix ][] = $base_dir;
		}
	}



	/**
	 * Loads the class file for a given class name.
	 *
	 * @param string $class The fully-qualified class name.
	 * @return mixed The mapped file name on success, or boolean false on
	 * failure.
	 */
	public function loadClass( $class ) {
		// the current namespace prefix
		$prefix = $class;
		// work backwards through the namespace names of the fully-qualified
		// class name to find a mapped file name
		while ( false !== $pos = strrpos( $prefix, Psr4Autoloader::NS ) ) {
			// retain the trailing namespace separator in the prefix
			$prefix = substr( $class, 0, $pos + 1 );
			// the rest is the relative class name
			$relative_class = substr( $class, $pos + 1 );
			// try to load a mapped file for the prefix and relative class
			$mapped_file = $this->loadMappedFile( $prefix, $relative_class );
			if ( $mapped_file ) {
				return $mapped_file;
			}
			// remove the trailing namespace separator for the next iteration
			// of strrpos()
			$prefix = rtrim( $prefix, Psr4Autoloader::NS );
		}
		// never found a mapped file
		return false;
	}



	/**
	 * Load the mapped file for a namespace prefix and relative class.
	 *
	 * @param string $prefix The namespace prefix.
	 * @param string $relative_class The relative class name.
	 * @return mixed Boolean false if no mapped file can be loaded, or the
	 * name of the mapped file that was loaded.
	 */
	protected function loadMappedFile( $prefix, $relative_class ) {
		// look through base directories for this namespace prefix
		foreach ( $this->prefixes( $prefix ) as $base_dir ) {
			// replace the namespace prefix with the base directory,
			// replace namespace separators with directory separators
			// in the relative class name, append with .php
			$file = $base_dir
				. str_replace( Psr4Autoloader::NS, DS, $relative_class )
				. '.php';
			// if the mapped file exists, require it
			if ( $this->requireFile( $file ) ) {
				// yes, we're done
				return $file;
			}
		}
		// never found it
		return false;
	}



	/**
	 * If a file exists, require it from the file system.
	 *
	 * @param string $file The file to require.
	 * @return bool True if the file exists, false if not.
	 */
	protected function requireFile( $file ) {
		if ( file_exists( $file ) ) {
			require $file;
			return true;
		}
		return false;
	}



}
// End of file Psr4Autoloader.php
// Location: /core/Psr4Autoloader.php