<?php
/* Smarty version 3.1.32, created on 2021-02-23 11:06:16
  from '/var/www/mailadmin.whitehotrobot.com/html/templates/editform.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_60355228491285_26448492',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '7eee272e540959e3facb1a9d5f39dbc59cf81106' => 
    array (
      0 => '/var/www/mailadmin.whitehotrobot.com/html/templates/editform.tpl',
      1 => 1525293856,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_60355228491285_26448492 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'/var/www/mailadmin.whitehotrobot.com/html/lib/smarty/libs/plugins/function.html_options.php','function'=>'smarty_function_html_options',),1=>array('file'=>'/var/www/mailadmin.whitehotrobot.com/html/lib/smarty/libs/plugins/function.html_checkboxes.php','function'=>'smarty_function_html_checkboxes',),));
?><div id="edit_form">
<form name="edit_<?php echo $_smarty_tpl->tpl_vars['table']->value;?>
" method="post" action="">
<input class="flat" type="hidden" name="table" value="<?php echo $_smarty_tpl->tpl_vars['table']->value;?>
" />
<input class="flat" type="hidden" name="token" value="<?php echo rawurlencode($_SESSION['PFA_token']);?>
" />

<table>
	<tr>
		<th colspan="4"><?php echo $_smarty_tpl->tpl_vars['formtitle']->value;?>
</th>
	</tr>

<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['struct']->value, 'field', false, 'key');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['key']->value => $_smarty_tpl->tpl_vars['field']->value) {
?>
	<?php if ($_smarty_tpl->tpl_vars['field']->value['display_in_form'] == 1) {?>

		<?php if ($_smarty_tpl->tpl_vars['table']->value == 'foo' && $_smarty_tpl->tpl_vars['key']->value == 'bar') {?>
			<tr><td>Special handling (complete table row) for <?php echo $_smarty_tpl->tpl_vars['table']->value;?>
 / <?php echo $_smarty_tpl->tpl_vars['key']->value;?>
</td></tr>
		<?php } else { ?>
			<tr>
				<td class="label"><?php echo $_smarty_tpl->tpl_vars['field']->value['label'];?>
</td>
				<td>
				<?php if ($_smarty_tpl->tpl_vars['field']->value['editable'] == 0) {?>
					<?php if ($_smarty_tpl->tpl_vars['field']->value['type'] == 'enma') {?>
						<?php echo $_smarty_tpl->tpl_vars['struct']->value[$_smarty_tpl->tpl_vars['key']->value]['options'][$_smarty_tpl->tpl_vars['value_'.($_smarty_tpl->tpl_vars['key']->value)]->value];?>

					<?php } else { ?>
						<?php echo $_smarty_tpl->tpl_vars['value_'.($_smarty_tpl->tpl_vars['key']->value)]->value;?>

					<?php }?>
				<?php } else { ?>
					<?php if ($_smarty_tpl->tpl_vars['table']->value == 'foo' && $_smarty_tpl->tpl_vars['key']->value == 'bar') {?>
						Special handling (td content) for <?php echo $_smarty_tpl->tpl_vars['table']->value;?>
 / <?php echo $_smarty_tpl->tpl_vars['key']->value;?>

					<?php } elseif ($_smarty_tpl->tpl_vars['field']->value['type'] == 'bool') {?>
						<input class="flat" type="checkbox" value='1' name="value[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
]"<?php ob_start();
echo $_smarty_tpl->tpl_vars['value_'.($_smarty_tpl->tpl_vars['key']->value)]->value;
$_prefixVariable1 = ob_get_clean();
if ($_prefixVariable1 == 1) {?> checked="checked"<?php }?>/>
					<?php } elseif ($_smarty_tpl->tpl_vars['field']->value['type'] == 'enum') {?>
						<select class="flat" name="value[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
]">
						<?php echo smarty_function_html_options(array('output'=>$_smarty_tpl->tpl_vars['struct']->value[$_smarty_tpl->tpl_vars['key']->value]['options'],'values'=>$_smarty_tpl->tpl_vars['struct']->value[$_smarty_tpl->tpl_vars['key']->value]['options'],'selected'=>$_smarty_tpl->tpl_vars['value_'.($_smarty_tpl->tpl_vars['key']->value)]->value),$_smarty_tpl);?>

						</select>
					<?php } elseif ($_smarty_tpl->tpl_vars['field']->value['type'] == 'enma') {?>
						<select class="flat" name="value[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
]">
						<?php echo smarty_function_html_options(array('options'=>$_smarty_tpl->tpl_vars['struct']->value[$_smarty_tpl->tpl_vars['key']->value]['options'],'selected'=>$_smarty_tpl->tpl_vars['value_'.($_smarty_tpl->tpl_vars['key']->value)]->value),$_smarty_tpl);?>

						</select>
					<?php } elseif ($_smarty_tpl->tpl_vars['field']->value['type'] == 'list') {?>
						<select class="flat" name="value[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
][]" size="10" multiple="multiple">
						<?php echo smarty_function_html_options(array('output'=>$_smarty_tpl->tpl_vars['struct']->value[$_smarty_tpl->tpl_vars['key']->value]['options'],'values'=>$_smarty_tpl->tpl_vars['struct']->value[$_smarty_tpl->tpl_vars['key']->value]['options'],'selected'=>$_smarty_tpl->tpl_vars['value_'.($_smarty_tpl->tpl_vars['key']->value)]->value),$_smarty_tpl);?>

						</select>

<!-- alternative: 
						<div style='max-height:30em; overflow:auto;'>
							<?php echo smarty_function_html_checkboxes(array('name'=>"value[".((string)$_smarty_tpl->tpl_vars['key']->value)."]",'output'=>$_smarty_tpl->tpl_vars['struct']->value[$_smarty_tpl->tpl_vars['key']->value]['options'],'values'=>$_smarty_tpl->tpl_vars['struct']->value[$_smarty_tpl->tpl_vars['key']->value]['options'],'selected'=>$_smarty_tpl->tpl_vars['value_'.($_smarty_tpl->tpl_vars['key']->value)]->value,'separator'=>"<br />"),$_smarty_tpl);?>

						</div>
-->
					<?php } elseif ($_smarty_tpl->tpl_vars['field']->value['type'] == 'pass' || $_smarty_tpl->tpl_vars['field']->value['type'] == 'b64p') {?>
						<input class="flat" type="password" name="value[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
]" />
					<?php } elseif ($_smarty_tpl->tpl_vars['field']->value['type'] == 'txtl') {?>
						<textarea class="flat" rows="10" cols="35" name="value[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
]"><?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['value_'.($_smarty_tpl->tpl_vars['key']->value)]->value, 'field2', false, 'key2');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['key2']->value => $_smarty_tpl->tpl_vars['field2']->value) {
echo $_smarty_tpl->tpl_vars['field2']->value;?>

<?php
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?></textarea>
					<?php } else { ?>
						<input class="flat" type="text" name="value[<?php echo $_smarty_tpl->tpl_vars['key']->value;?>
]" value="<?php echo $_smarty_tpl->tpl_vars['value_'.($_smarty_tpl->tpl_vars['key']->value)]->value;?>
" />
					<?php }?>
				<?php }?>	
				</td>
				<td>
					<?php if ($_smarty_tpl->tpl_vars['table']->value == 'foo' && $_smarty_tpl->tpl_vars['key']->value == 'bar') {?>
						Special handling (td content) for <?php echo $_smarty_tpl->tpl_vars['table']->value;?>
 / <?php echo $_smarty_tpl->tpl_vars['key']->value;?>

					<?php } else { ?>
						<?php echo $_smarty_tpl->tpl_vars['field']->value['desc'];?>

					<?php }?>
				</td>
				<td class="error_msg"><?php echo $_smarty_tpl->tpl_vars['fielderror']->value[$_smarty_tpl->tpl_vars['key']->value];?>
</td>
			</tr>
		<?php }?>

	<?php }
}
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>

	<tr>
		<td>&nbsp;</td>
		<td colspan="3"><input class="button" type="submit" name="submit" value="<?php echo $_smarty_tpl->tpl_vars['submitbutton']->value;?>
" /></td>
	</tr>
</table>

</form>
</div>
<?php }
}
