<?php
/**
 * @author @haihv433
 * @copyright Copyright (c) 2020 Goomento (https://store.goomento.com)
 * @package Goomento_PromoCountdown
 * @link https://github.com/Goomento/PromoCountdown
 */

namespace Goomento\PromoCountdown\Ui;


use Goomento\PromoCountdown\Helper\Config;

/**
 * Class ConfigProvider
 * @package Goomento\PromoCountdown\Ui
 */
class ConfigProvider implements \Goomento\Base\Model\BuilderInterface
{
    const CODE = 'promo_countdown';

    /**
     * @param array $buildSubject
     * @return array
     */
    public function build(array $buildSubject)
    {
        if (!Config::staticIsActive()) {
            return $buildSubject;
        }
        $buildSubject[self::CODE] = [
            'bg_color' => Config::staticConfigGet('style/bg_color'),
            'loading_color' => Config::staticConfigGet('style/loading_color'),
            'loading_bar' => Config::staticConfigGetBool('loading_bar'),
            'message' => Config::staticConfigGet('style/message')
        ];

        return $buildSubject;
    }
}
