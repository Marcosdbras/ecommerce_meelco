<?php
namespace Smartwave\Porto\Model\Config\Settings\Page;

class Layout implements \Magento\Framework\Option\ArrayInterface
{
    public function toOptionArray()
    {
        return [['value' => 'page-layout-1column', 'label' => __('1 Column')], ['value' => 'page-layout-2columns-left', 'label' => __('2 Columns with Left Sidebar')], ['value' => 'page-layout-2columns-right', 'label' => __('2 Columns with Right Sidebar')], ['value' => 'page-layout-3columns', 'label' => __('3 Columns')]];
    }

    public function toArray()
    {
        return ['page-layout-1column' => __('1 Column'), 'page-layout-2columns-left' => __('2 Columns with Left Sidebar'), 'page-layout-2columns-right' => __('2 Columns with Right Sidebar'), 'page-layout-3columns' => __('3 Columns')];
    }
}
