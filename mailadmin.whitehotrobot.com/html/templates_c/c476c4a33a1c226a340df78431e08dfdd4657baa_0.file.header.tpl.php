<?php
/* Smarty version 3.1.32, created on 2021-02-23 11:04:41
  from '/var/www/mailadmin.whitehotrobot.com/html/templates/header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.32',
  'unifunc' => 'content_603551c9862fe4_78909791',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'c476c4a33a1c226a340df78431e08dfdd4657baa' => 
    array (
      0 => '/var/www/mailadmin.whitehotrobot.com/html/templates/header.tpl',
      1 => 1525293856,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_603551c9862fe4_78909791 (Smarty_Internal_Template $_smarty_tpl) {
?><!-- <?php echo basename($_smarty_tpl->source->filepath);?>
 -->
<!doctype html>
<html lang="<?php if (isset($_SESSION['lang'])) {
echo $_SESSION['lang'];
}?>">
  <head>
        <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Postfix Admin - <?php echo $_SERVER['HTTP_HOST'];?>
</title>
    <link rel="shortcut icon" href="images/favicon.ico">
    <link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['CONF']->value['theme_css'];?>
" />
<?php if ($_smarty_tpl->tpl_vars['CONF']->value['theme_custom_css']) {?>
    <link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['CONF']->value['theme_custom_css'];?>
" />
<?php }?>
  </head>
  <body class="lang-<?php if (isset($_SESSION['lang'])) {
echo $_SESSION['lang'];
}?> page-<?php echo $_smarty_tpl->tpl_vars['smarty_template']->value;?>
 <?php if (isset($_smarty_tpl->tpl_vars['table']->value)) {?>page-<?php echo $_smarty_tpl->tpl_vars['smarty_template']->value;?>
-<?php echo $_smarty_tpl->tpl_vars['table']->value;
}?>">
    <div id="container">
    <div id="login_header">
    <a href='main.php'><img id="login_header_logo" src="<?php echo $_smarty_tpl->tpl_vars['CONF']->value['theme_logo'];?>
" alt="Logo" /></a>
<?php if ($_smarty_tpl->tpl_vars['CONF']->value['show_header_text'] === 'YES' && $_smarty_tpl->tpl_vars['CONF']->value['header_text']) {?>
    <h2><?php echo $_smarty_tpl->tpl_vars['CONF']->value['header_text'];?>
</h2>
<?php }?>
    </div>
<?php }
}
