<?php
namespace EventEspresso\core\services\adapters;

use Dompdf\Autoloader;
use Dompdf\Dompdf;
use Dompdf\Options;

/**
 * Class PdfAdapter
 *
 * @package EventEspresso\core\services\adapters
 */
class PdfAdapter
{
    /**
     * @var Options|null
     */
    private $options;

    /**
     * @var string
     */
    private $content;


    /**
     * PdfAdapter constructor.
     */
    public function __construct()
    {
        $this->options = null;
        $this->content = '';
    }


    /**
     * @return Options|null
     */
    public function get_options()
    {
        // only load dompdf if nobody else has yet...
        if (! class_exists('Dompdf\Autoloader') and is_readable(EE_THIRD_PARTY . 'dompdf/src/Autoloader.php')) {
            require_once(EE_THIRD_PARTY . 'dompdf/src/Autoloader.php');
            Autoloader::register();
        }
        if (! class_exists('Dompdf\Options')) {
            return null;
        }
        $options = new Options();
        $options->set('isRemoteEnabled', true);
        $options->set('isJavascriptEnabled', false);
        if (defined('DOMPDF_FONT_DIR')) {
            $options->setFontDir(DOMPDF_FONT_DIR);
            $options->setFontCache(DOMPDF_FONT_DIR);
        }
        // Allow changing the paper size.
        if (defined('DOMPDF_DEFAULT_PAPER_SIZE')) {
            $options->set('defaultPaperSize', DOMPDF_DEFAULT_PAPER_SIZE);
        }
        return $options;
    }


    /**
     * @param Options $options
     * @return $this
     */
    public function set_options(Options $options): self
    {
        $this->options = $options;
        return $this;
    }


    /**
     * @param string $content
     * @return $this
     */
    public function set_content(string $content): self
    {
        $this->content = $content;
        return $this;
    }


    /**
     * @param string $filename
     * @param bool $download
     * @return void
     */
    public function generate(string $filename, bool $download): void
    {
        if ($this->options instanceof Options && ! empty($this->content)) {
            $dompdf = new Dompdf($this->options);
            $dompdf->loadHtml($this->content);
            $dompdf->render();
            $dompdf->stream($filename, ['Attachment' => $download]);
        }
    }
}