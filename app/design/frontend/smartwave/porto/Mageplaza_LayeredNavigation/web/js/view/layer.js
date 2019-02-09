/**
 * Mageplaza
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Mageplaza.com license sliderConfig is
 * available through the world-wide-web at this URL:
 * https://www.mageplaza.com/LICENSE.txt
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Mageplaza
 * @package     Mageplaza_LayeredNavigation
 * @copyright   Copyright (c) 2017 Mageplaza (http://www.mageplaza.com/)
 * @license     https://www.mageplaza.com/LICENSE.txt
 */

define([
    'jquery',
    'Mageplaza_LayeredNavigation/js/action/submit-filter',
    'Magento_Catalog/js/price-utils',
    'jquery/ui',
    'accordion',
    'productListToolbarForm'
], function ($, submitFilterAction, ultil) {
    "use strict";
    var next_page = "";
    var loading = false;
    var infinite_loaded_count = 0;
    var active = false;
    $.widget('mageplaza.layer', $.mage.accordion, {
        options: {
            openedState: 'active',
            collapsible: true,
            multipleCollapsible: true,
            animate: 200,
            productsListSelector: '#layer-product-list',
            mobileShopbyElement: '#layered-filter-block .filter-title [data-role=title]',
            collapsibleElement: '[data-role=ln_collapsible]',
            header: '[data-role=ln_title]',
            content: '[data-role=ln_content]',
            params: [],
            active: [],
            checkboxEl: 'input[type=checkbox]',
            sliderElementPrefix: '#ln_slider_',
            sliderTextElementPrefix: '#ln_slider_text_'
        },

        _create: function () {
            this.initActiveItems();
            this._super();
            this.initProductListUrl();
            this.initObserve();
            this.initSlider();
        },

        inFinite: function() {
            var self = this;
            next_page = "";
            if($(self.options.productsListSelector +' .infinite-loader').length > 0){
                active = true;
            }
            $(".pages-items li > a.next").each(function(){
                next_page = $(this).attr("href");
            });
            $(window).scroll(function(){
                if(!loading && next_page && active && $(window).scrollTop() >= $(".infinite-loader").offset().top-$(window).height()+100){
                    if(infinite_loaded_count < 2){
                        loading = true;
                        $(".pages-items li > a.next").each(function(){
                            next_page = $(this).attr("href");
                        });
                        self.ajaxInfinite(next_page);
                    }
                }
            });
            $(".infinite-loader .btn-load-more").click(function(){
                if(!loading && next_page && infinite_loaded_count >= 2){
                    loading = true;
                    self.ajaxInfinite(next_page);
                }
            });
        },

        ajaxInfinite: function (submitUrl) {
            var self = this;
            infinite_loaded_count++;
            $('.infinite-loader .btn-load-more').hide();
            $('.infinite-loader .loading').fadeIn(300);
            $.ajax({
                url: submitUrl,
                type: 'get',
                beforeSend: function () {
                    $('.infinite-loader .btn-load-more').hide();
                    $('.infinite-loader .loading').fadeIn(300);
                },
                success: function (res) {
                    loading = false;
                    var $products = $(res.products);
                    if (res.backUrl) {
                        window.location = res.backUrl;
                        return;
                    }
                    if($products){
                        $products.each(function(i,el){
                            if($(el).hasClass('products-grid')){
                                var items_grid = $(this).find('.product-items .item');
                                $(self.options.productsListSelector + ' .products.wrapper .product-items').append(items_grid);
                                $(self.options.productsListSelector).trigger('contentUpdated');
                            }
                            if($(el).hasClass('products-list')){
                                var items_list = $(this).find('.product-items .item');
                                $(self.options.productsListSelector + ' .products.wrapper .product-items').append(items_list);
                                $(self.options.productsListSelector).trigger('contentUpdated');
                            }
                            if($(el).hasClass('toolbar-products')){
                                if($(this).find('.pages a.next').length > 0){
                                    $(self.options.productsListSelector + ' .pages a.next').attr('href', $(this).find('.pages a.next').attr('href'));
                                }else{
                                    $(self.options.productsListSelector + ' .pages a.next').remove();
                                }
                            }
                        });
                        if($("form[data-role=tocart-form]").length > 0) {
                            $("form[data-role=tocart-form]").catalogAddToCart();
                        }
                        $('.main .products.grid .product-items li.product-item:nth-child(2n)').addClass('nth-child-2n');
                        $('.main .products.grid .product-items li.product-item:nth-child(2n+1)').addClass('nth-child-2np1');
                        $('.main .products.grid .product-items li.product-item:nth-child(3n)').addClass('nth-child-3n');
                        $('.main .products.grid .product-items li.product-item:nth-child(3n+1)').addClass('nth-child-3np1');
                        $('.main .products.grid .product-items li.product-item:nth-child(4n)').addClass('nth-child-4n');
                        $('.main .products.grid .product-items li.product-item:nth-child(4n+1)').addClass('nth-child-4np1');
                        $('.main .products.grid .product-items li.product-item:nth-child(5n)').addClass('nth-child-5n');
                        $('.main .products.grid .product-items li.product-item:nth-child(5n+1)').addClass('nth-child-5np1');
                        $('.main .products.grid .product-items li.product-item:nth-child(6n)').addClass('nth-child-6n');
                        $('.main .products.grid .product-items li.product-item:nth-child(6n+1)').addClass('nth-child-6np1');
                        $('.main .products.grid .product-items li.product-item:nth-child(7n)').addClass('nth-child-7n');
                        $('.main .products.grid .product-items li.product-item:nth-child(7n+1)').addClass('nth-child-7np1');
                        $('.main .products.grid .product-items li.product-item:nth-child(8n)').addClass('nth-child-8n');
                        $('.main .products.grid .product-items li.product-item:nth-child(8n+1)').addClass('nth-child-8np1');
                        var hist = submitUrl;
                        if(submitUrl.indexOf("p=") > -1){
                            var len = submitUrl.length-submitUrl.indexOf("p=");
                            var str_temp = submitUrl.substr(submitUrl.indexOf("p="),len);
                            var page_param = "";
                            if(str_temp.indexOf("&") == -1){
                                page_param = str_temp;
                            } else {
                                page_param = str_temp.substr(0,str_temp.indexOf("&"));
                            }
                            hist = submitUrl.replace(page_param, "");
                        }
                        if (typeof window.history.pushState === 'function') {
                            window.history.pushState({url: hist}, '', hist);
                        }
                        if(typeof enable_quickview != 'undefined' && enable_quickview == true) {
                            requirejs(['jquery', 'weltpixel_quickview' ],
                                function($, quickview) {
                                    $('.weltpixel-quickview').off('click').on('click', function() {
                                        var prodUrl = $(this).attr('data-quickview-url');
                                        if (prodUrl.length) {
                                            quickview.displayContent(prodUrl);
                                        }
                                    });
                                });
                        }
                        $(".products-grid .weltpixel-quickview").each(function(){
                            $(this).appendTo($(this).parent().parent().children(".product-item-photo"));
                        });
                        next_page = "";
                        $(".pages-items li > a.next").each(function(){
                            next_page = $(this).attr("href");
                        });
                        if(infinite_loaded_count >= 2){
                            $('.infinite-loader .loading').hide();
                            if(next_page){
                                $('.infinite-loader .btn-load-more').show();
                                $(".infinite-loader .btn-load-more").unbind("click").click(function(){
                                    if(!loading && next_page && infinite_loaded_count >= 2){
                                        loading = true;
                                        self.ajaxInfinite(next_page);
                                    }
                                });
                            }
                        } else {
                            $('.infinite-loader .loading').fadeOut(300);
                        }
                    }

                },
                error: function () {
                    window.location.reload();
                }
            });
        },

        initActiveItems: function () {
            var layerActives = this.options.active,
                actives = [];

            if (typeof window.layerActiveTabs !== 'undefined') {
                layerActives = window.layerActiveTabs;
            }
            if (layerActives.length) {
                this.element.find('.filter-options-item').each(function (index) {
                    if (~$.inArray($(this).attr('attribute'), layerActives)) {
                        actives.push(index);
                    }
                });
            }

            this.options.active = actives;

            return this;
        },

        initProductListUrl: function () {
            var isProcessToolbar = false;
            $.mage.productListToolbarForm.prototype.changeUrl = function (paramName, paramValue, defaultValue) {
                if (isProcessToolbar) {
                    return;
                }
                isProcessToolbar = true;

                var urlPaths = this.options.url.split('?'),
                    baseUrl = urlPaths[0],
                    urlParams = urlPaths[1] ? urlPaths[1].split('&') : [],
                    paramData = {},
                    parameters;
                for (var i = 0; i < urlParams.length; i++) {
                    parameters = urlParams[i].split('=');
                    paramData[parameters[0]] = parameters[1] !== undefined
                        ? window.decodeURIComponent(parameters[1].replace(/\+/g, '%20'))
                        : '';
                }
                paramData[paramName] = paramValue;
                if (paramValue === defaultValue) {
                    delete paramData[paramName];
                }
                paramData = $.param(paramData);
                submitFilterAction(baseUrl + (paramData.length ? '?' + paramData : ''));
            }
        },

        initObserve: function () {
            var self = this;
            infinite_loaded_count = 0;
            var currentElements = this.element.find('.filter-current a, .filter-actions a');
            currentElements.each(function (index) {
                var el = $(this),
                    link = self.checkUrl(el.prop('href'));
                if (!link) {
                    return;
                }

                el.bind('click', function (e) {
                    submitFilterAction(link);
                    e.stopPropagation();
                    e.preventDefault();
                });
            });

            var optionElements = this.element.find('.filter-options a');
            optionElements.each(function (index) {
                var el = $(this),
                    link = self.checkUrl(el.prop('href'));
                if (!link) {
                    return;
                }

                el.bind('click', function (e) {
                    if (el.hasClass('swatch-option-link-layered')) {
                        self.selectSwatchOption(el);
                    } else {
                        var checkboxEl = el.find(self.options.checkboxEl);
                        checkboxEl.prop('checked', !checkboxEl.prop('checked'));
                    }

                    self.ajaxSubmit(link);
                    e.stopPropagation();
                    e.preventDefault();
                });

                var checkbox = el.find(self.options.checkboxEl);
                checkbox.bind('click', function (e) {
                    self.ajaxSubmit(link);
                    e.stopPropagation();
                });
            });

            var swatchElements = this.element.find('.swatch-attribute');
            swatchElements.each(function (index) {
                var el = $(this);
                var attCode = el.attr('attribute-code');
                if (attCode) {
                    if (self.options.params.hasOwnProperty(attCode)) {
                        var attValues = self.options.params[attCode].split(",");
                        var swatchOptions = el.find('.swatch-option');
                        swatchOptions.each(function (option) {
                            var elOption = $(this);
                            if ($.inArray(elOption.attr('option-id'), attValues) !== -1) {
                                elOption.addClass('selected');
                            }
                        });
                    }
                }
            });
            if(typeof enable_quickview != 'undefined' && enable_quickview == true) {
                requirejs(['jquery', 'weltpixel_quickview' ],
                    function($, quickview) {
                        $('.weltpixel-quickview').off('click').on('click', function() {
                            var prodUrl = $(this).attr('data-quickview-url');
                            if (prodUrl.length) {
                                quickview.displayContent(prodUrl);
                            }
                        });
                    });
            }
            $(".products-grid .weltpixel-quickview").each(function(){
                $(this).appendTo($(this).parents('.product-item-info').children(".product-item-photo"));
            });
            self.inFinite();
        },

        selectSwatchOption: function (el) {
            var childEl = el.find('.swatch-option');
            if (childEl.hasClass('selected')) {
                childEl.removeClass('selected');
            } else {
                childEl.addClass('selected');
            }
        },

        initSlider: function () {
            var self = this,
                slider = this.options.slider;

            for (var code in slider) {
                if (slider.hasOwnProperty(code)) {
                    var sliderConfig = slider[code],
                        sliderElement = self.element.find(this.options.sliderElementPrefix + code),
                        priceFormat = sliderConfig.hasOwnProperty('priceFormat') ? JSON.parse(sliderConfig.priceFormat) : null;

                    if (sliderElement.length) {
                        sliderElement.slider({
                            range: true,
                            min: sliderConfig.minValue,
                            max: sliderConfig.maxValue,
                            values: [sliderConfig.selectedFrom, sliderConfig.selectedTo],
                            slide: function (event, ui) {
                                self.displaySliderText(code, ui.values[0], ui.values[1], priceFormat);
                            },
                            change: function (event, ui) {
                                self.ajaxSubmit(self.getSliderUrl(sliderConfig.ajaxUrl, ui.values[0], ui.values[1]));
                            }
                        });
                    }
                    self.displaySliderText(code, sliderConfig.selectedFrom, sliderConfig.selectedTo, priceFormat);
                }
            }
        },

        displaySliderText: function (code, from, to, format) {
            var textElement = this.element.find(this.options.sliderTextElementPrefix + code);
            if (textElement.length) {
                if (format !== null) {
                    from = this.formatPrice(from, format);
                    to = this.formatPrice(to, format);
                }

                textElement.html(from + ' - ' + to);
            }
        },

        getSliderUrl: function (url, from, to) {
            return url.replace('from-to', from + '-' + to);
        },

        formatPrice: function (value, format) {
            return ultil.formatPrice(value, format);
        },

        ajaxSubmit: function (submitUrl) {
            this.element.find(this.options.mobileShopbyElement).trigger('click');
            return submitFilterAction(submitUrl);
        },

        checkUrl: function (url) {
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

            return regex.test(url) ? url : null;
        }
    });

    return $.mageplaza.layer;
});
