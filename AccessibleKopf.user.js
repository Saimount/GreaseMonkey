// ==UserScript==
// @name           AccessibleKopf
// @namespace      saimount
// @description    AccessibleKopf
// @include        *kopf*
// ==/UserScript==
(function(){

    /*** UTILS ***/

    function add_style( rules, media ) {
        el = document.createElement( 'style' );
        el.setAttribute( 'type', 'text/css' );
        for ( i=0; i<rules.length; i++ ) {
            el.innerHTML += rules[ i ] + "\n";
        }
        if ( typeof media != "undefined" ) {
            el.innerHTML = "@media " + media + " { \n" + el.innerHTML + "} \n";
        }
        document.head.appendChild( el );
    }

    add_style( [
        'html,body { height: 100%; color: #555555; font-weight: 300; font-size: 12px; padding-top: 20px; background-color: #FFF;}',
        '.form-label { color: #666;}',
        'a:link {color:inherit;}',
        'a:visited {color:inherit;}',
        'a:hover {color:inherit;}',
        'a:active {color:inherit;}',
        '.danger-action { color: #b94a48;}',
        '.box { background: #f9f9f9;}',
        '.box-invisible-content { color: #f9f9f9;}',
        'h1 { color: #555; font-variant:small-caps; font-weight: 400; }',
        'h2 { color: #555; font-variant:small-caps; font-weight: 400; }',
        'h3 { color: #555; font-variant:small-caps; font-weight: 500; }',
        'h4 { color: #666; font-variant:small-caps; font-weight: 500; }',
        'h5 { color: #777; font-variant:small-caps; font-weight: 500; }',
        'h6 { color: #999; font-variant:small-caps; font-weight: 500; }',
        '.kopf-ace-editor { width: auto; border: 1px solid #ccc; border-radius: 3px 3px 3px 3px; text-align: left; background: #fff !important;}',
        '.tooltip-inner { background: #f9f9f9; color: #333; border: 1px solid #ccc; padding: 5px 5px 5px 5px;}',
        '.bordered { border: 1px solid #ccc;}',
        '.shard { text-align: center; font-size: 11px; display: inline-block; width: 22px; height: 22px; border: 1px solid #666; border-radius: 1px 1px 1px 1px; vertical-align: middle; text-align: center; line-height: 20px; margin-left: 3px; margin-bottom: 5px; opacity: 0.6;}',
        '.shard-primary { opacity: 1;}',
        '.shard-started { background: #6A995C; color: #FFFFFF;}',
        '.shard-initializing { background: #E7E5AE; color: #909090;}',
        '.shard-relocated { background: #E7E5AE; color: #909090;}',
        '.shard-recovering { background: #E7E5AE; color: #909090;}',
        '.shard-closed { background: #ECECEB; color: #6B6969;}',
        '.shard-unallocated { background: #ECECEB; color: #6B6969;}',
        '.shard-relocation-source { border: 1px dotted;}',
        '.shard-relocation-target { border: 1px dotted; background: #FFF;}',
        '.nav-pills > li.active > a, .nav-pills > li.active > a:hover, .nav-pills > li.active > a:focus { background-color: #eeeeee; color: #333;}',
        '.validation-error { color: #b94a48; padding-top: 5px; font-size: 13px; font-weight: 300;}',
        '.modal-close-icon { float: right; font-size: 20px; color: #b94a48; padding-top: 2px; cursor: pointer;}',
        '.confirm-dialog-body { background: #fff; font-size: 13px; font-family: "Helvetica Neue",Helvetica,Arial,sans-serif; border: 0px; line-height: 18px; margin: 0px; word-break: normal; padding: 0px; color: #333;}',
        '.modal-json { font-size: 9px; background: #ffffff;}',
        '.inactive-action { color: #f0f0f0; }',
        '.remove-icon { color: #b94a48; float: right; line-height: 18px; padding-left: 5px;}',
        '.navbar-app-settings { color: #000000; background: #fff; border: 1px solid #ccc;}',
        '.navbar-app-setting { color: #555555;}',
        '.navbar-menu-item { font-size: 13px; color: #555; font-weight: 300;}',
        '.closed-index { color: #D0D0D0 !important; font-weight: 300 !important;}',
        'table { border: 1px solid #ccc;}',
        'thead.overview { border: 1px solid #ccc;}',
        '.form-control { background: #fff; border: 1px solid #ccc; color: #555;}',
        '.panel-body { background: #fff;}',
        '.panel-default > .panel-heading { background: #f5f5f5;}',
        '.panel-default { background: #fff; border: 1px solid #ddd;}',
        '.panel-default > .panel-heading + .panel-collapse .panel-body { border-top-color: #ddd}',
        '.table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td { border: 1px solid #ccc;}',
        '.table thead:first-child tr:first-child th { border-top: 1px solid #ccc;}',
        '.header-row { font-weight: 700;}',
        '.header-row > td { background: #f9f9f9 !important;}',
        '.ace-kopf { color: #666 !important;}',
        '.ace-kopf .ace_marker-layer .ace_active-line { background: #FFFFCC !important;}',
        '.ace-kopf .ace_marker-layer .ace_selection { background: #b5d5ff !important;}',
        '.ace-kopf .ace_gutter { color: #AAA !important; background: #e8e8e8 !important;}',
        '.ace-kopf .ace_indent-guide { opacity: 1.0 !important;}',
        '.ace-kopf .ace_cursor { border-left: 2px solid #000;}',
        '.ace_hidden-cursors .ace_cursor { opacity: 0.2;}',
        '.dropdown-menu .divider { background: #e5e5e5;}',
        '.table-striped > tbody > tr:nth-child(odd) > td { background: #f9f9f9;}',
        '.progress { background: #f5f5f5;}',
        '.modal-content { background: #fff;}',
        '.modal-header { border-bottom: 1px solid #e5e5e5;}',
        '.table tbody > tr > td { border-top: 1px solid #ddd;}',
        '.popover-content { background: #fff; border-left: 1px solid rgba(0,0,0,.2); border-right: 1px solid rgba(0,0,0,.2); border-bottom: 1px solid rgba(0,0,0,.2); border-radius: 0 0 5px 5px;}',
        '.popover-title { background: #f7f7f7; border: 1px solid rgba(0,0,0,.2); border-radius: 5px 5px 0 0;}',
        '.popover { border: 0px; padding: 0px;}',
        '.dropdown-menu > li > a { color: #555555;}',
        '.dropdown-menu > li > a:hover { background: #f9f9f9; color: #555555;}',
        '.dropdown-menu { background: #fff;}',
        '.jstValue { white-space: pre-wrap; font-size: 12px; font-weight: 400; font-family: Monaco, Menlo, Consolas, "Courier New", monospace; line-height: normal; display: block;}',
        '.jstComma { white-space: pre-wrap;}',
        '.jstProperty { color: #666; word-wrap: break-word;}',
        '.jstBracket { white-space: pre-wrap;}',
        '.jstBool { color: #2525CC;}',
        '.jstNum { color: #D036D0;}',
        '.jstNull { color: gray;}',
        '.jstStr { color: #2DB669;}',
        '.jstFold:after { content: " -"; cursor: pointer;}',
        '.jstExpand { white-space: normal;}',
        '.jstExpand:after { content: " +"; cursor: pointer;}',
        '.jstFolded { white-space: normal !important;}',
        '.jstHiddenBlock { display: none;}',
        '.ace-kopf { color: #000 !important;}',
        '.jstStr, .ace_string { color: #070 !important;}',
        '.jstProperty { color: #000 !important;}'
    ] );
    if (document.location.host.match('-prod')) {
        add_style( [
            '.panel-default > .panel-heading {	background: #d33; } .panel-default > .panel-heading h4 {color: #fff !important;}'
        ] );
    }

}) ();
