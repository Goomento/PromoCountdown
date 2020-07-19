<?php
/**
 * @author @haihv433
 * @copyright Copyright (c) 2020 Goomento (https://store.goomento.com)
 * @package Goomento_PromoCountdown
 * @link https://github.com/Goomento/PromoCountdown
 */

namespace Goomento\PromoCountdown\Block\Countdown;

use Magento\Catalog\Api\Data\ProductInterface;

/**
 * Class Display
 * @package Goomento\PromoCountdown\Block\Countdown
 */
class Display extends \Magento\Catalog\Block\Product\ProductList\Item\Block
{
    /**
     * @var ProductInterface
     */
    protected $product = null;
    /**
     * @var string
     */
    protected $_template = 'Goomento_PromoCountdown::countdown.phtml';

    /**
     * {@inheritdoc}
     */
    public function setProduct(ProductInterface $product)
    {
        $this->product = $product;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCountdownStartDate()
    {
        return $this->getProduct()->getSpecialFromDate();
    }

    /**
     * @return mixed
     */
    public function getCountdownEndDate()
    {
        return  $this->getProduct()->getSpecialToDate();
    }

    /**
     * Retrieve current product model
     *
     * @return ProductInterface
     */
    public function getProduct()
    {
        if ($this->product) {
            return $this->product;
        }
        $this->setProduct(\Goomento\Base\Helper\Registry::staticRegistry('product'));
        return $this->product;
    }

    /**
     * @return string
     */
    public function getCountdownJsConfig()
    {
        try {
            $data = [
                'start' => $this->getCountdownStartDate(),
                'end' => $this->getCountdownEndDate(),
            ];
        } catch (\Exception $e) {
            $data = [];
        }

        return \Zend_Json::encode($data);
    }

    /**
     * @return bool
     */
    public function couldShow()
    {
        return ($this->getCountdownStartDate() && $this->getCountdownEndDate());
    }
}
