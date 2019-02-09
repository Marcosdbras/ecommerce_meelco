define([
        'jquery',
        'Magento_Ui/js/modal/modal',
        'jquery/ui',
        'jquery/validate',
        'IWD_Opc/js/iwd/plugins/jquery.nicescroll.min'
    ],
    function ($, modal) {
        'use strict';
        $.widget('mage.iwdOpc', {
            popup: null,
            init: function () {
                this.showModal();
                this.inputText();
                this.cvvText();
                //this.niceScrollOpc();
            },

            //niceScrollOpc: function(){
            //    $(document).ready(
            //        function() {
            //            //$('.iwd-checkout-agreements-modal').closest('.modal-content').niceScroll();
            //        }
            //    );
            //},

            inputText: function () {
                $(document).off('blur', '#authorizenet_directpost_cc_number');
                $(document).on('blur', '#authorizenet_directpost_cc_number', function (e) {

                    if ($('#authorizenet_directpost_cc_number').val() == 0) {
                        $(this).closest('div.number').find('label').removeClass('focus');
                    }
                });

                $(document).off('focus', '#authorizenet_directpost_cc_number');
                $(document).on('focus', '#authorizenet_directpost_cc_number', function (e) {

                    $(this).closest('div.number').find('label').addClass('focus');


                });
            },
            cvvText: function () {
                $(document).off('blur', '#authorizenet_directpost_cc_cid');
                $(document).on('blur', '#authorizenet_directpost_cc_cid', function (e) {

                    if ($('#authorizenet_directpost_cc_cid').val() == 0) {
                        $(this).closest('div.cvv').find('label').removeClass('focus');
                    }
                });

                $(document).off('focus', '#authorizenet_directpost_cc_cid');
                $(document).on('focus', '#authorizenet_directpost_cc_cid', function (e) {

                    $(this).closest('div.cvv').find('label').addClass('focus');


                });
            },
            showModal: function () {
                var _self = this;
                $(document).off('click touchstart', '.actions-toolbar .remind');
                $(document).on('click touchstart', '.actions-toolbar .remind', function (e) {
                    e.preventDefault();
                    console.log("tester1");
                    _self.displayModal();
                });
            },
            displayModal: function () {
                var modalContent = $(".iwd-opc-forgotpassword");
                this.popup = modalContent.modal({
                    autoOpen: true,
                    type: 'popup',
                    //content: modalContent,
                    modalClass: 'iwd-opc-forgot-wrapper',
                    title: '',
                    buttons: [{
                        class: "iwd-hidden-button-for-popup",
                        text: 'Back to Login',
                        click: function () {
                            this.closeModal();
                        }
                    }]
                });
            }
        });

        return $.mage.iwdOpc;

    });