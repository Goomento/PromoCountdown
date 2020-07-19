/**
 * @author @haihv433
 * @copyright Copyright (c) 2020 Goomento (https://store.goomento.com)
 * @package Goomento_PromoCountdown
 * @link https://github.com/Goomento/PromoCountdown
 */

define([
    'jquery',
    'ko',
    'mage/translate',
    'jquery/ui'
], function ($, ko) {
    "use strict"

    $.widget('goomento.promo_countdown', {
        options: {
            days: ko.observable(''),
            hours: ko.observable('00'),
            minutes: ko.observable('00'),
            seconds: ko.observable('00'),
            start: 0,
            end: 0,
        },
        config: {
            barHeight: 20,
            message: $.mage.__('Promotion expired!'),
            bg_color: '#BDC3C7',
            loading_color: '#C0392B',
            loading_bar: 1,
        },
        /**
         * @return {boolean}
         */
        showProgressBar: function() {
            return !!this.config.loading_bar;
        },
        /**
         *
         * @return {string}
         */
        template: function() {
            return(
                '<div class="countdown_bar">' +
                    (
                        this.showProgressBar()
                        ?
                        '<div class="countdown_bar-loading" style="width: 100%; background-color: '+ this.config.bg_color +'">' +
                            '<div class="countdown_bar-loading-progress" style="width: 100%; ' +
                                                'background-color: '+ this.config.loading_color + ';' +
                                                'height: '+ this.config.barHeight + 'px;' + '"></div>' +
                        '</div>'
                        : ''
                    ) +
                    '<div class="countdown_bar-timer" style="width: 100%;">'+
                        '<span data-bind="text: days"></span>&nbsp;'+
                        '<span data-bind="text: hours">00</span>:'+
                        '<span data-bind="text: minutes">00</span>:'+
                        '<span data-bind="text: seconds">00</span>'+
                    '</div>'        +
                '</div>'
            );
        },
        /**
         *
         * @return {goomento.promo_countdown}
         * @private
         */
        _create: function() {
            return this;
        },
        /**
         *
         * @return {goomento.promo_countdown|null}
         * @private
         */
        _init: function () {
            if (!this.options.end || !this.options.start) {
                return null;
            }

            Object.assign(this.config, window.Goomento.promo_countdown);

            this.options.end = new Date(this.options.end);
            this.options.start = new Date(this.options.start);
            this.renderHtml();
            this.applyBindings();
            this.countdown();

            return this;
        },
        /**
         * Bind Ko
         */
        applyBindings: function() {
            ko.applyBindings(this.options,this.element.get(0));
        },
        /**
         * render HTML
         */
        renderHtml: function() {
            this.element.html(this.template());
        },
        /**
         * Countdown
         */
        countdown: function () {
            let self = this;
            let now = new Date();
            let nowTime = now.getTime();
            let promoDistancing = self.options.end.getTime() - self.options.start.getTime();
            let $progressBar = self.element.find('.countdown_bar-loading-progress');
            let $timerBar = self.element.find('.countdown_bar-timer');
            $progressBar.css({
                'width': 0,
                'background-color': self.config.loading_color
            });

            let interval = setInterval(function() {
                let remainTime = self.options.end.getTime() - nowTime;
                let promoStared = nowTime - self.options.start.getTime();
                let width = parseFloat((promoStared/promoDistancing)*100);
                if (width<=0 || width > 100) {
                    width = 100;
                }
                $progressBar.width(`${width}%`);
                if (remainTime <= 0) {
                    clearInterval(interval);
                    if (self.config.message)
                        $timerBar.text(self.config.message);
                    return null;
                }
                self.setTimer(remainTime);
                nowTime += 1000;
            }, 1000);
        },

        /**
         *
         * @param timestamp
         * @returns {int}
         */
        setTimer: function(timestamp) {
            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(timestamp / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timestamp % (1000 * 60)) / 1000);
            if(hours < 10) {
                hours = "0" + hours;
            }
            this.options.hours(hours);

            if(minutes < 10) {
                minutes = "0" + minutes;
            }
            this.options.minutes(minutes);

            if(seconds < 10) {
                seconds = "0" + seconds;
            }
            this.options.seconds(seconds);

            if(days !== 0) {
                if(days === 1) {
                    days = days + " " + $.mage.__('day');
                } else {
                    days = days + " " + $.mage.__('days');
                }
            } else {
                days = '';
            }
            this.options.days(days);
        },
    });

    return $.goomento.promo_countdown;
});
