<?php
/* Smarty version 3.1.32, created on 2021-02-23 11:52:08
  from '/var/www/mailadmin.whitehotrobot.com/html/templates/list-virtual_alias_domain.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_60355ce8d153d6_82806566',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '84e92828a7af6e5d957791fae73d8403734b3989' => 
    array (
      0 => '/var/www/mailadmin.whitehotrobot.com/html/templates/list-virtual_alias_domain.tpl',
      1 => 1525293856,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:list.tpl' => 1,
  ),
),false)) {
function content_60355ce8d153d6_82806566 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_assignInScope('table', 'aliasdomain');
$_smarty_tpl->_assignInScope('struct', $_smarty_tpl->tpl_vars['aliasdomain_data']->value['struct']);
$_smarty_tpl->_assignInScope('msg', $_smarty_tpl->tpl_vars['aliasdomain_data']->value['msg']);
$_smarty_tpl->_assignInScope('id_field', $_smarty_tpl->tpl_vars['msg']->value['id_field']);
$_smarty_tpl->_assignInScope('formconf', $_smarty_tpl->tpl_vars['aliasdomain_data']->value['formconf']);
$_smarty_tpl->_assignInScope('items', $_smarty_tpl->tpl_vars['tAliasDomains']->value);
$_smarty_tpl->_assignInScope('RAW_items', $_smarty_tpl->tpl_vars['RAW_tAliasDomains']->value);?>

<?php $_smarty_tpl->_subTemplateRender('file:list.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
}
}
