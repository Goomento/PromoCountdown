<?php
/**
 * @author @haihv433
 * @copyright Copyright (c) 2020 Goomento (https://store.goomento.com)
 * @package Goomento_PromoCountdown
 * @link https://github.com/Goomento/PromoCountdown
 */

namespace Goomento\PromoCountdown\Helper;

use Magento\Framework\App\Helper\Context;

/**
 * Class Config
 * @package Goomento\PromoCountdown\Helper
 */
class Config extends \Goomento\Base\Helper\AbstractConfig
{
    public function __construct(Context $context)
    {
        parent::__construct($context, ['goomento_promo_countdown', 'general']);
    }
}
