/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
/*global define*/
define(
    [
        'jquery',
        'ko',
        'Magento_Checkout/js/model/totals',
        'uiComponent',
        'Magento_Checkout/js/model/step-navigator',
        'Magento_Checkout/js/model/quote'
    ],
    function ($, ko, totals, Component, stepNavigator, quote) {
        'use strict';
        return Component.extend({
            defaults: {
                template: 'IWD_Opc/summary/cart-items'
            },
            totals: totals.totals(),
            getItems: totals.getItems(),
            getItemsQty: function() {

               return parseFloat(this.totals.items_qty);
            },
            isItemsBlockExpanded: function () {
                return quote.isVirtual() || stepNavigator.isProcessed('shipping');
            }
        });
    }
);
