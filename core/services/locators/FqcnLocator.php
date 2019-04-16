<?php

namespace EventEspresso\core\services\locators;

use EE_Psr4AutoloaderInit;
use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\Core\Psr4Autoloader;
use FilesystemIterator;

/**
 * Class FqcnLocator
 * Description
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 */
class FqcnLocator extends Locator
{

    /**
     * @var array $FQCNs
     */
    protected $FQCNs = array();

    /**
     * @var array $namespaces
     */
    protected $namespaces = array();


    /**
     * @access protected
     * @param string $namespace
     * @param string $namespace_base_dir
     * @throws InvalidDataTypeException
     */
    protected function setNamespace($namespace, $namespace_base_dir)
    {
        if (! is_string($namespace)) {
            throw new InvalidDataTypeException('$namespace', $namespace, 'string');
        }
        if (! is_string($namespace_base_dir)) {
            throw new InvalidDataTypeException('$namespace_base_dir', $namespace_base_dir, 'string');
        }
        $this->namespaces[ $namespace ] = $namespace_base_dir;
    }


    /**
     * @access public
     * @return array
     */
    public function getFQCNs()
    {
        return $this->FQCNs;
    }


    /**
     * @access public
     * @return int
     */
    public function count()
    {
        return count($this->FQCNs);
    }


    /**
     * given a valid namespace, will find all files that match the provided mask
     *
     * @access public
     * @param string|array $namespaces
     * @return array
     * @throws InvalidClassException
     * @throws InvalidDataTypeException
     */
    public function locate($namespaces)
    {
        if (! (is_string($namespaces) || is_array($namespaces))) {
            throw new InvalidDataTypeException('$namespaces', $namespaces, 'string or array');
        }
        foreach ((array) $namespaces as $namespace) {
            foreach ($this->findFQCNsByNamespace($namespace) as $key => $file) {
                $this->FQCNs[ $key ] = $file;
            }
        }
        return $this->FQCNs;
    }


    /**
     * given a partial namespace, will find all files in that folder
     * ** PLZ NOTE **
     * This assumes that all files within the specified folder should be loaded
     *
     * @access protected
     * @param string $partial_namespace
     * @return array
     * @throws InvalidClassException
     * @throws InvalidDataTypeException
     */
    protected function findFQCNsByNamespace($partial_namespace)
    {
        $iterator = new FilesystemIterator(
            $this->getDirectoryFromPartialNamespace($partial_namespace)
        );
        $iterator->setFlags(FilesystemIterator::CURRENT_AS_FILEINFO);
        $iterator->setFlags(FilesystemIterator::UNIX_PATHS);
        if (iterator_count($iterator) === 0) {
            return array();
        }
        foreach ($iterator as $file) {
            if ($file->isFile() && $file->getExtension() === 'php') {
                $file = $file->getPath() . DS . $file->getBasename('.php');
                foreach ($this->namespaces as $namespace => $base_dir) {
                    $namespace .= Psr4Autoloader::NS;
                    if (strpos($file, $base_dir) === 0) {
                        $this->FQCNs[] = Psr4Autoloader::NS . str_replace(
                            array($base_dir, DS),
                            array($namespace, Psr4Autoloader::NS),
                            $file
                        );
                    }
                }
            }
        }
        return $this->FQCNs;
    }


    /**
     * getDirectoryFromPartialNamespace
     *
     * @access protected
     * @param  string $partial_namespace almost fully qualified class name ?
     * @return string
     * @throws InvalidDataTypeException
     * @throws InvalidClassException
     */
    protected function getDirectoryFromPartialNamespace($partial_namespace)
    {
        if (empty($partial_namespace)) {
            throw new InvalidClassException($partial_namespace);
        }
        // load our PSR-4 Autoloader so we can get the list of registered namespaces from it
        $psr4_loader = \EE_Psr4AutoloaderInit::psr4_loader();
        // breakup the incoming namespace into segments so we can loop thru them
        $namespace_segments = explode(Psr4Autoloader::NS, trim($partial_namespace, Psr4Autoloader::NS));
        // we're only interested in the Vendor and secondary base, so pull those from the array
        $vendor_base = array_slice($namespace_segments, 0, 2);
        $namespace = $prefix = null;
        while (! empty($vendor_base)) {
            $namespace = implode(Psr4Autoloader::NS, $vendor_base);
            // check if there's a base directory registered for that namespace
            $prefix = $psr4_loader->prefixes($namespace . Psr4Autoloader::NS);
            if (! empty($prefix) && ! empty($prefix[0])) {
                // found one!
                break;
            }
            // remove base and try vendor only portion of namespace
            array_pop($vendor_base);
        }
        // nope? then the incoming namespace is invalid
        if (empty($prefix) || empty($prefix[0])) {
            throw new InvalidClassException($partial_namespace);
        }
        $this->setNamespace($namespace, $prefix[0]);
        // but if it's good, add that base directory to the rest of the path, and return it
        return $prefix[0] . implode(DS, array_diff($namespace_segments, $vendor_base)) . DS;
    }
}
