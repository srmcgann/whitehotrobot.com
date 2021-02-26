<?php
/* Smarty version 3.1.32, created on 2021-02-23 11:04:51
  from '/var/www/mailadmin.whitehotrobot.com/html/templates/main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_603551d39ffe35_48805055',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '08759875ff9d5d961bb9c6fd49d045cdbdcc8198' => 
    array (
      0 => '/var/www/mailadmin.whitehotrobot.com/html/templates/main.tpl',
      1 => 1525293856,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_603551d39ffe35_48805055 (Smarty_Internal_Template $_smarty_tpl) {
?><!-- <?php echo basename($_smarty_tpl->source->filepath);?>
 -->
<div id="main_menu">
<table>
	<tr>
		<td nowrap="nowrap"><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_list_domain');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMenu_overview'];?>
</a></td>
		<td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMain_overview'];?>
</td>
	</tr>
	<tr>
		<td nowrap="nowrap"><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_create_alias');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['add_alias'];?>
</a></td>
		<td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMain_create_alias'];?>
</td>
	</tr>
	<tr>
		<td nowrap="nowrap"><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_create_mailbox');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['add_mailbox'];?>
</a></td>
		<td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMain_create_mailbox'];?>
</td>
	</tr>
<?php if ($_smarty_tpl->tpl_vars['CONF']->value['sendmail'] === 'YES') {?>
	<tr>
		<td nowrap="nowrap"><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_sendmail');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMenu_sendmail'];?>
</a></td>
		<td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMain_sendmail'];?>
</td>
	</tr>
<?php }?>
	<tr>
		<td nowrap="nowrap"><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_password');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMenu_password'];?>
</a></td>
		<td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMain_password'];?>
</td>
	</tr>
	<tr>
		<td nowrap="nowrap"><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_viewlog');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMenu_viewlog'];?>
</a></td>
		<td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMain_viewlog'];?>
</td>
	</tr>
	<tr>
		<td nowrap="nowrap"><a target="_top" href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_logout');?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMenu_logout'];?>
</a></td>
		<td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pMain_logout'];?>
</td>
	</tr>
</table>
</div>
<?php }
}
