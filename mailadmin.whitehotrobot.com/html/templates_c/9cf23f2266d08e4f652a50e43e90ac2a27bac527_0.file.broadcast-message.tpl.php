<?php
/* Smarty version 3.1.32, created on 2021-02-24 09:28:18
  from '/var/www/mailadmin.whitehotrobot.com/html/templates/broadcast-message.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_60368cb24a0570_19503433',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9cf23f2266d08e4f652a50e43e90ac2a27bac527' => 
    array (
      0 => '/var/www/mailadmin.whitehotrobot.com/html/templates/broadcast-message.tpl',
      1 => 1525293856,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_60368cb24a0570_19503433 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'/var/www/mailadmin.whitehotrobot.com/html/lib/smarty/libs/plugins/function.html_options.php','function'=>'smarty_function_html_options',),));
?><div id="edit_form">
<form name="broadcast-message" method="post" action="">
<input class="flat" type="hidden" name="token" value="<?php echo rawurlencode($_SESSION['PFA_token']);?>
" />
<table>
  <tr>
    <th colspan="2"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pBroadcast_title'];?>
</th>
  </tr>
  <tr>
    <td class="label"><label><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['from'];?>
:</label></td>
    <td><em><?php echo $_smarty_tpl->tpl_vars['smtp_from_email']->value;?>
</em></td>
  </tr>
  <tr>
    <td class="label"><label><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pBroadcast_name'];?>
:</label></td>
    <td><input class="flat" size="43" type="text" name="name"/></td>
  </tr>
  <tr>
    <td class="label"><label><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['subject'];?>
:</label></td>
    <td><input class="flat" size="43" type="text" name="subject"/></td>
  </tr>
  <tr>
    <td class="label"><label><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['message'];?>
:</label></td>
    <td><textarea class="flat" cols="40" rows="6" name="message"></textarea></td>
  </tr>
  <tr>
    <td class="label"><label><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['broadcast_mailboxes_only'];?>
</label></td>
    <td><input type="checkbox" value="1" name="mailboxes_only"/></td>
  </tr>
  <tr>
    <td class="label"><label><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['broadcast_to_domains'];?>
</label></td>
    <td>
      <select multiple="multiple" name="domains[]">
        <?php echo smarty_function_html_options(array('output'=>$_smarty_tpl->tpl_vars['allowed_domains']->value,'values'=>$_smarty_tpl->tpl_vars['allowed_domains']->value,'selected'=>$_smarty_tpl->tpl_vars['allowed_domains']->value),$_smarty_tpl);?>

      </select>
    </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>
    <input class="button" type="submit" name="submit" value="<?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pSendmail_button'];?>
" />
    </td>
  </tr>
</table>
</form>
</div>
<?php }
}
