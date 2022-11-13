<?php
/* Smarty version 3.1.32, created on 2021-02-25 20:19:52
  from '/var/www/mailadmin.whitehotrobot.com/html/templates/users_menu.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_603876e8e7ab76_20157626',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3d550e4cd404cb69eb9f27c9e5bb1a2a96079592' => 
    array (
      0 => '/var/www/mailadmin.whitehotrobot.com/html/templates/users_menu.tpl',
      1 => 1525293856,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_603876e8e7ab76_20157626 (Smarty_Internal_Template $_smarty_tpl) {
?><div id="menu">
<ul>
  <li><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_user_main');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMenu_main'];?>
</a></li>
<?php if ($_smarty_tpl->tpl_vars['CONF']->value['vacation'] === 'YES') {?>
  <li><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_user_vacation');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pUsersMenu_vacation'];?>
</a></li>
<?php }
if ($_smarty_tpl->tpl_vars['CONF']->value['edit_alias'] === 'YES') {?>
  <li><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_user_edit_alias');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pUsersMenu_edit_alias'];?>
</a></li>
<?php }?>
  <li><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_user_password');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['change_password'];?>
</a></li>
  <li class="logout"><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_user_logout');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMenu_logout'];?>
</a></li>
</ul>
</div>
<?php }
}
