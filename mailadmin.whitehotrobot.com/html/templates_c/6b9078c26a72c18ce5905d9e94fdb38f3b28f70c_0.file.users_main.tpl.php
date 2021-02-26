<?php
/* Smarty version 3.1.32, created on 2021-02-25 20:19:52
  from '/var/www/mailadmin.whitehotrobot.com/html/templates/users_main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_603876e8e841a2_00948757',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6b9078c26a72c18ce5905d9e94fdb38f3b28f70c' => 
    array (
      0 => '/var/www/mailadmin.whitehotrobot.com/html/templates/users_main.tpl',
      1 => 1525293856,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_603876e8e841a2_00948757 (Smarty_Internal_Template $_smarty_tpl) {
?><div id="main_menu">
<table>
<?php if ($_smarty_tpl->tpl_vars['CONF']->value['vacation'] === 'YES') {?>
	<tr>
		<td nowrap="nowrap"><a target="_top" href="vacation.php"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pUsersMenu_vacation'];?>
</a></td>
		<td><?php echo $_smarty_tpl->tpl_vars['tummVacationtext']->value;?>
</td>
	</tr>
<?php }
if ($_smarty_tpl->tpl_vars['CONF']->value['edit_alias'] === 'YES') {?>
	<tr>
		<td nowrap="nowrap"><a target="_top" href="edit-alias.php"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pUsersMenu_edit_alias'];?>
</a></td>
		<td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pUsersMain_edit_alias'];?>
</td>
	</tr>
<?php }?>
	<tr>
		<td nowrap="nowrap"><a target="_top" href="password.php"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['change_password'];?>
</a></td>
		<td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pUsersMain_password'];?>
</td>
	</tr>
	<tr>
		<td nowrap="nowrap"><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_user_logout');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMenu_logout'];?>
</a></td>
		<td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMain_logout'];?>
</td>
	</tr>
</table>
</div>
<?php }
}
