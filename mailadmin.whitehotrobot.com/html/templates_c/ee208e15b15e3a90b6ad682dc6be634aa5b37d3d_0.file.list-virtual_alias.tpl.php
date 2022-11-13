<?php
/* Smarty version 3.1.32, created on 2021-02-23 11:52:08
  from '/var/www/mailadmin.whitehotrobot.com/html/templates/list-virtual_alias.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_60355ce8d25e85_39065144',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ee208e15b15e3a90b6ad682dc6be634aa5b37d3d' => 
    array (
      0 => '/var/www/mailadmin.whitehotrobot.com/html/templates/list-virtual_alias.tpl',
      1 => 1525293856,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:list.tpl' => 1,
  ),
),false)) {
function content_60355ce8d25e85_39065144 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_assignInScope('table', 'alias');
$_smarty_tpl->_assignInScope('struct', $_smarty_tpl->tpl_vars['alias_data']->value['struct']);
$_smarty_tpl->_assignInScope('msg', $_smarty_tpl->tpl_vars['alias_data']->value['msg']);
$_smarty_tpl->_assignInScope('id_field', $_smarty_tpl->tpl_vars['msg']->value['id_field']);
$_smarty_tpl->_assignInScope('formconf', $_smarty_tpl->tpl_vars['alias_data']->value['formconf']);
$_smarty_tpl->_assignInScope('items', $_smarty_tpl->tpl_vars['tAlias']->value);
$_smarty_tpl->_assignInScope('RAW_items', $_smarty_tpl->tpl_vars['RAW_tAlias']->value);?>

<?php $_smarty_tpl->_subTemplateRender('file:list.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

<?php }
}
