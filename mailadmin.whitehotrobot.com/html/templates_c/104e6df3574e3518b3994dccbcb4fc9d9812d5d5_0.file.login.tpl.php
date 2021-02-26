<?php
/* Smarty version 3.1.32, created on 2021-02-23 11:04:41
  from '/var/www/mailadmin.whitehotrobot.com/html/templates/login.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_603551c987bcf2_53903601',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '104e6df3574e3518b3994dccbcb4fc9d9812d5d5' => 
    array (
      0 => '/var/www/mailadmin.whitehotrobot.com/html/templates/login.tpl',
      1 => 1525293856,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_603551c987bcf2_53903601 (Smarty_Internal_Template $_smarty_tpl) {
?><div id="login">
<form name="frmLogin" method="post" action="">
<input class="flat" type="hidden" name="token" value="<?php echo rawurlencode($_SESSION['PFA_token']);?>
" />
<table id="login_table" cellspacing="10">
	<tr>
		<th colspan="2">
<?php if ($_smarty_tpl->tpl_vars['logintype']->value == 'admin') {
echo $_smarty_tpl->tpl_vars['PALANG']->value['pLogin_welcome'];?>

<?php } else {
echo $_smarty_tpl->tpl_vars['PALANG']->value['pUsersLogin_welcome'];?>

<?php }?>
	</th>
	</tr>
	<tr>
		<td class="label"><label><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pLogin_username'];?>
:</label></td>
		<td><input class="flat" type="text" name="fUsername" /></td>
	</tr>
	<tr>
		<td class="label"><label><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['password'];?>
:</label></td>
		<td><input class="flat" type="password" name="fPassword" />
<?php if ($_smarty_tpl->tpl_vars['forgotten_password_reset']->value) {?>
	<br/><a href="password-recover.php"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pUsersLogin_password_recover'];?>
</a>
<?php }?>
		</td>
	</tr>
	<tr>
		<td class="label"><label><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pLogin_language'];?>
:</label></td>
		<td><?php echo $_smarty_tpl->tpl_vars['language_selector']->value;?>
</td>
	</tr>
	<tr>
		<td class="label">&nbsp;</td>
		<td><input class="button" type="submit" name="submit" value="<?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pLogin_button'];?>
" /></td>
	</tr>
<?php if ($_smarty_tpl->tpl_vars['logintype']->value == 'admin') {?>
	<tr>
		<td colspan="2"><a href="users/"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pLogin_login_users'];?>
</a></td>
	</tr>
<?php }?>
</table>
</form>

<?php echo '<script'; ?>
 type="text/javascript">
<!--
	document.frmLogin.fUsername.focus();
// -->
<?php echo '</script'; ?>
>

</div>

<?php }
}
