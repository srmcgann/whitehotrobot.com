<?php
/* Smarty version 3.1.32, created on 2021-02-23 11:52:08
  from '/var/www/mailadmin.whitehotrobot.com/html/templates/list-virtual_mailbox.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_60355ce8d5a086_69146724',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'cc0df8474743a215423a600252e25dcc848c25fa' => 
    array (
      0 => '/var/www/mailadmin.whitehotrobot.com/html/templates/list-virtual_mailbox.tpl',
      1 => 1525293856,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_60355ce8d5a086_69146724 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'/var/www/mailadmin.whitehotrobot.com/html/lib/smarty/libs/plugins/modifier.replace.php','function'=>'smarty_modifier_replace',),));
if (isset($_smarty_tpl->tpl_vars['search']->value['_'])) {?>
    <?php $_smarty_tpl->_assignInScope('search', $_smarty_tpl->tpl_vars['search']->value['_']);
} else { ?>
    <?php $_smarty_tpl->_assignInScope('search', '');
}?>

  <?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'tr_header');?>

    <?php if ($_smarty_tpl->tpl_vars['CONF']->value['show_status'] === 'YES') {?><td></td><?php }?>
    <td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pOverview_mailbox_username'];?>
</td>
    <?php if ($_smarty_tpl->tpl_vars['display_mailbox_aliases']->value == true) {?>
      <td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['to'];?>
</td>
    <?php }?>
    <td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['name'];?>
</td>
    <?php if ($_smarty_tpl->tpl_vars['CONF']->value['quota'] === 'YES') {?><td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pOverview_mailbox_quota'];?>
</td><?php }?>
    <td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['last_modified'];?>
</td>
    <td><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['active'];?>
</td>
    <?php $_smarty_tpl->_assignInScope('colspan', ((string)($_smarty_tpl->tpl_vars['colspan']->value-6)));?>
    <td colspan="<?php echo $_smarty_tpl->tpl_vars['colspan']->value;?>
">&nbsp;</td>
  </tr>
  <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['tMailbox']->value, 'item', false, 'i');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['i']->value => $_smarty_tpl->tpl_vars['item']->value) {
?>
    <?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'tr_hilightoff');?>

      <?php if ($_smarty_tpl->tpl_vars['CONF']->value['show_status'] === 'YES') {?>
        <td><?php echo $_smarty_tpl->tpl_vars['gen_show_status_mailbox']->value[$_smarty_tpl->tpl_vars['i']->value];?>
</td>
      <?php }?>
      <td>
        <?php if ($_smarty_tpl->tpl_vars['search']->value == '') {?>
          <?php echo $_smarty_tpl->tpl_vars['item']->value['username'];?>

        <?php } else { ?>
          <?php echo smarty_modifier_replace($_smarty_tpl->tpl_vars['item']->value['username'],$_smarty_tpl->tpl_vars['search']->value,"<span class='searchresult'>".((string)$_smarty_tpl->tpl_vars['search']->value)."</span>");?>

        <?php }?>
      </td>
      <?php if ($_smarty_tpl->tpl_vars['display_mailbox_aliases']->value == true) {?>
        <td>
        <?php if ($_smarty_tpl->tpl_vars['item']->value['goto_mailbox'] == 1) {?>
          Mailbox<br/>
        <?php } else { ?>
          Forward only<br/>
        <?php }?>
        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['item']->value['goto_other'], 'item2', false, 'j');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['j']->value => $_smarty_tpl->tpl_vars['item2']->value) {
?>
          <?php if ($_smarty_tpl->tpl_vars['search']->value == '') {?>
            <?php echo $_smarty_tpl->tpl_vars['item2']->value;?>

          <?php } else { ?>
            <?php echo smarty_modifier_replace($_smarty_tpl->tpl_vars['item2']->value,$_smarty_tpl->tpl_vars['search']->value,"<span class='searchresult'>".((string)$_smarty_tpl->tpl_vars['search']->value)."</span>");?>

          <?php }?>
          <br/>
        <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
        </td>
      <?php }?>
      <td><?php echo $_smarty_tpl->tpl_vars['item']->value['name'];?>
</td>
      <?php if ($_smarty_tpl->tpl_vars['CONF']->value['quota'] === 'YES') {?>
        <td>
        <?php if ($_smarty_tpl->tpl_vars['item']->value['quota'] == 0) {?>
          <?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pOverview_unlimited'];?>

        <?php } elseif ($_smarty_tpl->tpl_vars['item']->value['quota'] < 0) {?>
          <?php echo $_smarty_tpl->tpl_vars['PALANG']->value['pOverview_disabled'];?>

        <?php } else { ?>
          <?php if ($_smarty_tpl->tpl_vars['boolconf_used_quotas']->value) {?>

            
            <?php if ($_smarty_tpl->tpl_vars['divide_quota']->value['quota_width'][$_smarty_tpl->tpl_vars['i']->value] > 90) {?>
              <?php $_smarty_tpl->_assignInScope('quota_level', "high");?>
            <?php } elseif ($_smarty_tpl->tpl_vars['divide_quota']->value['quota_width'][$_smarty_tpl->tpl_vars['i']->value] > 55) {?>
              <?php $_smarty_tpl->_assignInScope('quota_level', "mid");?>
            <?php } else { ?> 
              <?php $_smarty_tpl->_assignInScope('quota_level', "low");?>
            <?php }?>
            <div class="quota quota_<?php echo $_smarty_tpl->tpl_vars['quota_level']->value;?>
" style="width:<?php echo $_smarty_tpl->tpl_vars['divide_quota']->value['quota_width'][$_smarty_tpl->tpl_vars['i']->value];?>
px;"></div>
            <div class="quota_bg"></div></div>
            <div class="quota_text quota_text_<?php echo $_smarty_tpl->tpl_vars['quota_level']->value;?>
"><?php echo $_smarty_tpl->tpl_vars['divide_quota']->value['current'][$_smarty_tpl->tpl_vars['i']->value];?>
 / <?php echo $_smarty_tpl->tpl_vars['divide_quota']->value['quota'][$_smarty_tpl->tpl_vars['i']->value];?>
</div>
          <?php } else { ?>
            <?php echo $_smarty_tpl->tpl_vars['divide_quota']->value['quota'][$_smarty_tpl->tpl_vars['i']->value];?>

          <?php }?>
        <?php }?>
        </td>
      <?php }?>
      <td><?php echo $_smarty_tpl->tpl_vars['item']->value['modified'];?>
</td>
      <td><a href="<?php echo $_smarty_tpl->smarty->ext->configLoad->_getConfigVariable($_smarty_tpl, 'url_editactive');?>
mailbox&amp;id=<?php echo rawurlencode($_smarty_tpl->tpl_vars['item']->value['username']);?>
&amp;active=<?php if (($_smarty_tpl->tpl_vars['item']->value['active'] == 0)) {?>1<?php } else { ?>0<?php }?>&amp;token=<?php echo rawurlencode($_SESSION['PFA_token']);?>
"
        ><?php if ($_smarty_tpl->tpl_vars['item']->value['active'] == 1) {
echo $_smarty_tpl->tpl_vars['PALANG']->value['YES'];
} else {
echo $_smarty_tpl->tpl_vars['PALANG']->value['NO'];
}?></a></td>
      <?php if ($_smarty_tpl->tpl_vars['CONF']->value['vacation_control_admin'] === 'YES' && $_smarty_tpl->tpl_vars['CONF']->value['vacation'] === 'YES') {?>
        <?php if ($_smarty_tpl->tpl_vars['item']->value['v_active'] !== -1) {?>
          <?php if ($_smarty_tpl->tpl_vars['item']->value['v_active'] == 1) {?>
            <?php $_smarty_tpl->_assignInScope('v_active', $_smarty_tpl->tpl_vars['PALANG']->value['pOverview_vacation_edit']);?>
          <?php } else { ?>
            <?php $_smarty_tpl->_assignInScope('v_active', $_smarty_tpl->tpl_vars['PALANG']->value['pOverview_vacation_option']);?>
          <?php }?>
          <td><a href="vacation.php?username=<?php echo rawurlencode($_smarty_tpl->tpl_vars['item']->value['username']);?>
"><?php echo $_smarty_tpl->tpl_vars['v_active']->value;?>
</a></td>
        <?php }?>
      <?php } else { ?>
          <td>&nbsp;</td>
      <?php }?>
      <?php $_smarty_tpl->_assignInScope('edit_aliases', 0);?>
      <?php if ($_smarty_tpl->tpl_vars['authentication_has_role']->value['global_admin'] !== true && $_smarty_tpl->tpl_vars['CONF']->value['alias_control_admin'] === 'YES') {
$_smarty_tpl->_assignInScope('edit_aliases', 1);
}?>
      <?php if ($_smarty_tpl->tpl_vars['authentication_has_role']->value['global_admin'] == true && $_smarty_tpl->tpl_vars['CONF']->value['alias_control'] === 'YES') {
$_smarty_tpl->_assignInScope('edit_aliases', 1);
}?>
      <?php if ($_smarty_tpl->tpl_vars['edit_aliases']->value == 1) {?>
        <td><a href="edit.php?table=alias&amp;edit=<?php echo rawurlencode($_smarty_tpl->tpl_vars['item']->value['username']);?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['alias'];?>
</a></td>
      <?php }?>
      <td><a href="edit.php?table=mailbox&amp;edit=<?php echo rawurlencode($_smarty_tpl->tpl_vars['item']->value['username']);?>
"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['edit'];?>
</a></td>
      <td><a href="delete.php?table=mailbox&amp;delete=<?php echo rawurlencode($_smarty_tpl->tpl_vars['item']->value['username']);?>
&amp;token=<?php echo rawurlencode($_SESSION['PFA_token']);?>
"
        onclick="return confirm ('<?php echo $_smarty_tpl->tpl_vars['PALANG']->value['confirm'];
echo $_smarty_tpl->tpl_vars['PALANG']->value['mailboxes'];?>
: <?php echo $_smarty_tpl->tpl_vars['item']->value['username'];?>
');"><?php echo $_smarty_tpl->tpl_vars['PALANG']->value['del'];?>
</a></td>
    </tr>
  <?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
</table>
<?php }
}
