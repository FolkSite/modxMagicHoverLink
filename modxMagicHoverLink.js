/**
 * plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2015 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */
/*global tinymce:true */
/*replacement to TinyMCE link plugin, for MODX Revolution only
forked by donshakespeare

modxMagicHoverLink.js
An ingenious way to use TinyMCE to do the infamous thing called, internal linking. A replacement to the TinyMCE link plugin, backend only. While using pdoTools to populate link_list is great for backend/frontend, some users asked for a little backend magic that harnesses the existing power of MODX; then modxMagicHoverLink was born.

Hover over Resources in Resource Tree, MODX Manager search result, Link List

  tinymce.init({
    external_plugins: {
      modxMagicHoverLink: "[[++assets_url]]components/tinymcewrapper/tinymceplugins/modxMagicHoverLink.js"
    },
    toolbar: "link unlink",
    //hoverStripMODXurl:false, //default is true
    //hoverAddCLASStoTree:false //default is true
  });
*/
var miniCSS = '<style>.moce-useMODX button{background-image: linear-gradient(to right,#3f4850 0,#365462 46%,#3e5554 60%,#42554d 68%,#573d4e 100%); box-shadow: 0 2px 0 #E4E4E4; color:white!important;}#themChecks{display:none;position:absolute;top:17px;left:140px}.mce-themChecks{display:inline;margin-left:8px !important;}.mce-themChecksMORE{height: 23px !important;width: 20px!important;background: none!important;box-shadow: none!important;border: 0!important;margin-left: 0 !important;text-align: center!important;}.mce-themChecksMORE button{padding:0!important;}.twEasyHover{padding-top:20px!important;padding-bottom:20px!important;}.twEasyHover,.twEasyHover *{cursor:default!important;}.twEasyHover:before{content:"";position:absolute;width:100%;height:100%;}</style>';
$("head").append(miniCSS);
tinyMODXselectedID = false;
$(document).on("mouseenter", "[ext\\:tree-node-id]", function() {
  if ($(".mce-useMODX").length) {
    var twEasyHover = tinymce.activeEditor.getParam('hoverAddCLASStoTree', true);
    tinyMODXselectedTEXT = $(this).find("a > span").clone().children().remove().end().text().trim();
    tinyMODXselectedTITLE = $(this).find("a > span").clone().html($(this).find("a > span").attr('qtip')).text().trim();
    tinyMODXselectedID = $(this).find("a > span > span").text().replace(/\D/g, '');
    if (tinyMODXselectedID && tinyMODXselectedTEXT) {
      if ($(".mce-themChecksURL").attr("aria-checked") == "true" || $(".mce-themChecksTXT").attr("aria-checked") == "true" || $(".mce-themChecksTITLE").attr("aria-checked") == "true") {
        if(twEasyHover){
          $(this).addClass('twEasyHover');
        }
      }
      if ($(".mce-themChecksURL").attr("aria-checked") == "true") {
        $(".mce-modxUrl input.mce-textbox").val("[[~" + tinyMODXselectedID + "]]");
      }
      if ($(".mce-themChecksTXT").attr("aria-checked") == "true") {
        $(".mce-tinyMODXselected").val(tinyMODXselectedTEXT);
      }
      if ($(".mce-themChecksTITLE").attr("aria-checked") == "true") {
        if ($(".mce-themChecksMOREdesc").hasClass("mce-active")) {
          $(".mce-modxTitle").val(tinyMODXselectedTITLE);
        } else {
          $(".mce-modxTitle").val(tinyMODXselectedTEXT);
        }
      }
    }
  }
}).on("mouseleave", "[ext\\:tree-node-id]", function() {
  $(".twEasyHover").removeClass('twEasyHover');
})
$(document).on("mouseenter", "[class^=mce-tinyMODXLinkList]", function() {
  tinyMODXselectedID = $(this).attr('class');
  if ($(".mce-useMODX").length && tinyMODXselectedID.indexOf('[[~') > -1) {
    tinyMODXselectedTEXT = $(this).find("span.mce-text").text().trim();
    tinyMODXselectedTITLE = $(this).find("span.mce-text").text().trim();
    tinyMODXselectedID = tinyMODXselectedID.replace(/\D/g, '');
    if (tinyMODXselectedID && tinyMODXselectedTEXT) {
      if ($(".mce-themChecksURL:visible").length && $(".mce-themChecksURL").attr("aria-checked") == "true") {
        $(".mce-modxUrl input.mce-textbox").val("[[~" + tinyMODXselectedID + "]]");
      }
      if ($(".mce-themChecksTXT").attr("aria-checked") == "true") {
        $(".mce-tinyMODXselected").val(tinyMODXselectedTEXT);
      }
      if ($(".mce-themChecksTITLE").attr("aria-checked") == "true") {
        if ($(".mce-themChecksMOREdesc").hasClass("mce-active")) {
          $(".mce-modxTitle").val(tinyMODXselectedTITLE);
        } else {
          $(".mce-modxTitle").val(tinyMODXselectedTEXT);
        }
      }
    }
  }
})
$(document).on("mouseenter", "div.section > p.x-combo-list-item > a", function() {
  if ($(".mce-useMODX").length) {
    tinyMODXselectedTEXT = $(this).clone().children().remove().end().text().trim();
    tinyMODXselectedTITLE = $(this).parent().next('ol').text().trim();
    tinyMODXselectedID = $(this).attr('href');
    tinyMODXselectedID = tinyMODXselectedID.split("resource/update&id=");
    tinyMODXselectedID = tinyMODXselectedID[1];
    if (tinyMODXselectedID && tinyMODXselectedTEXT) {
      if ($(".mce-themChecksURL").attr("aria-checked") == "true") {
        $(".mce-modxUrl input.mce-textbox").val("[[~" + tinyMODXselectedID + "]]");
      }
      if ($(".mce-themChecksTXT").attr("aria-checked") == "true") {
        $(".mce-tinyMODXselected").val(tinyMODXselectedTEXT);
      }
      if ($(".mce-themChecksTITLE").attr("aria-checked") == "true") {
        if ($(".mce-themChecksMOREdesc").hasClass("mce-active")) {
          $(".mce-modxTitle").val(tinyMODXselectedTITLE);
        } else {
          $(".mce-modxTitle").val(tinyMODXselectedTEXT);
        }
      }
    }
  }
})
tinymce.PluginManager.add('modxMagicHoverLink', function(editor) {
  function createLinkList(callback) {
    return function() {
      var linkList = editor.settings.link_list;
      if (typeof linkList == "string") {
        tinymce.util.XHR.send({
          url: linkList,
          success: function(text) {
            callback(tinymce.util.JSON.parse(text));
          }
        });
      } else if (typeof linkList == "function") {
        linkList(callback);
      } else {
        callback(linkList);
      }
    };
  } 
  function buildListItems(inputList, itemCallback, startItems) {
    function appendItems(values, output) {
      output = output || [];
      tinymce.each(values, function(item) {
        var menuItem = {
          text: item.text || item.title
        };
        if (item.menu) {
          menuItem.menu = appendItems(item.menu);
          menuItem.classes = "tinyMODXLinkList" + item.value; //MODX
        } else {
          menuItem.value = item.value;
          // menuItem.classes = "tinyMODXLinkList" + item.value; //MODX
          if (itemCallback) {
            itemCallback(menuItem);
          }
        }
        output.push(menuItem);
      });
      return output;
    }
    return appendItems(inputList, startItems || []);
  }

  function showDialog(linkList) {
    if (!$('.mce-useMODX').length) { //MODX
      var data = {},
        selection = editor.selection,
        dom = editor.dom,
        selectedElm, anchorElm, initialText;
      var win, onlyText, textListCtrl, linkListCtrl, relListCtrl, targetListCtrl, classListCtrl, linkTitleCtrl, value;

      function linkListChangeHandler(e) {
        var textCtrl = win.find('#text');
        if (!textCtrl.value() || (e.lastControl && textCtrl.value() == e.lastControl.text())) {
          textCtrl.value(e.control.text());
        }
        win.find('#href').value(e.control.value());
      }

      function buildAnchorListControl(url) {
        var anchorList = [];
        tinymce.each(editor.dom.select('a:not([href])'), function(anchor) {
          var id = anchor.name || anchor.id;
          if (id) {
            anchorList.push({
              text: id,
              value: '#' + id,
              selected: url.indexOf('#' + id) != -1
            });
          }
        });
        if (anchorList.length) {
          anchorList.unshift({
            text: 'None',
            value: ''
          });
          return {
            name: 'anchor',
            type: 'listbox',
            label: 'Anchors',
            values: anchorList,
            onselect: linkListChangeHandler
          };
        }
      }

      function updateText() {
        if (!initialText && data.text.length === 0 && onlyText) {
          this.parent().parent().find('#text')[0].value(this.value());
        }
      }

      function urlChange(e) {
        var meta = e.meta || {};
        if (linkListCtrl) {
          linkListCtrl.value(editor.convertURL(this.value(), 'href'));
        }
        tinymce.each(e.meta, function(value, key) {
          win.find('#' + key).value(value);
        });
        if (!meta.text) {
          updateText.call(this);
        }
      }

      function isOnlyTextSelected(anchorElm) {
        var html = selection.getContent();
        // Partial html and not a fully selected anchor element
        if (/</.test(html) && (!/^<a [^>]+>[^<]+<\/a>$/.test(html) || html.indexOf('href=') == -1)) {
          return false;
        }
        if (anchorElm) {
          var nodes = anchorElm.childNodes,
            i;
          if (nodes.length === 0) {
            return false;
          }
          for (i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeType != 3) {
              return false;
            }
          }
        }
        return true;
      }
      selectedElm = selection.getNode();
      anchorElm = dom.getParent(selectedElm, 'a[href]');
      onlyText = isOnlyTextSelected();
      data.text = initialText = anchorElm ? (anchorElm.innerText || anchorElm.textContent) : selection.getContent({
        format: 'text'
      });
      data.href = anchorElm ? dom.getAttrib(anchorElm, 'href') : '';
      if (anchorElm) {
        data.target = dom.getAttrib(anchorElm, 'target');
      } else if (editor.settings.default_link_target) {
        data.target = editor.settings.default_link_target;
      }
      if ((value = dom.getAttrib(anchorElm, 'rel'))) {
        data.rel = value;
      }
      if ((value = dom.getAttrib(anchorElm, 'class'))) {
        data['class'] = value;
      }
      if ((value = dom.getAttrib(anchorElm, 'title'))) {
        data.title = value;
      }
      if (onlyText) {
        textListCtrl = {
          name: 'text',
          classes: 'tinyMODXselected', //MODX
          type: 'textbox',
          size: 40,
          label: 'Text to display',
          onchange: function() {
            data.text = this.value();
          }
        };
      }
      if (linkList) {
        linkListCtrl = {
          type: 'listbox',
          label: 'Link list',
          values: buildListItems(linkList, function(item) {
            if(item.value.indexOf('[[~') == -1){ //MODX
              item.value = editor.convertURL(item.value || item.url, 'href');
            }
          }, [{
            text: 'None',
            value: ''
          }]),
          onselect: linkListChangeHandler,
          value: editor.convertURL(data.href, 'href'),
          onPostRender: function() {
            /*eslint consistent-this:0*/
            linkListCtrl = this;
          }
        };
      }
      if (editor.settings.target_list !== false) {
        if (!editor.settings.target_list) {
          editor.settings.target_list = [{
            text: 'None',
            value: ''
          }, {
            text: 'New window',
            value: '_blank'
          }];
        }
        targetListCtrl = {
          name: 'target',
          type: 'listbox',
          label: 'Target',
          values: buildListItems(editor.settings.target_list)
        };
      }
      if (editor.settings.rel_list) {
        relListCtrl = {
          name: 'rel',
          type: 'listbox',
          label: 'Rel',
          values: buildListItems(editor.settings.rel_list)
        };
      }
      if (editor.settings.link_class_list) {
        classListCtrl = {
          name: 'class',
          type: 'listbox',
          label: 'Class',
          values: buildListItems(editor.settings.link_class_list, function(item) {
            if (item.value) {
              item.textStyle = function() {
                return editor.formatter.getCssText({
                  inline: 'a',
                  classes: [item.value]
                });
              };
            }
          })
        };
      }
      if (editor.settings.link_title !== false) {
        linkTitleCtrl = {
          name: 'title',
          type: 'textbox',
          label: 'Title',
          classes: 'modxTitle', //MODX
          value: data.title
        };
      }
      win = editor.windowManager.open({
        title: 'Insert link',
        data: data,
        onPostRender: function() {
          var thisAppendTo = $(".mce-foot > .mce-container-body.mce-abs-layout").attr('id')
          $(".mce-foot > .mce-container-body.mce-abs-layout").append("<div id='themChecks'></div>")
          tinymce.ui.Factory.create({
            type: 'button',
            text: 'MODX Resources',
            tooltip: 'Once clicked, HOVER over any MODX Resource in Resource Tree, Search Result Tree and Link List.',
            classes: 'useMODX',
            active: true,
            style: 'position:absolute;top:10px;left:8px;',
            onPostRender: function() {
              $(".mce-useMODX").on("click", function() {
                if ($("[ext\\:tree-node-id]").length) {
                  if ($("#mce-modal-block:hidden").length) {
                  // if (parseInt($("#modx-leftbar").css('z-index')) < parseInt($("#modx-leftbar").css('z-index')) || $("#modx-leftbar").css('z-index') == 'auto') {
                    $("#mce-modal-block").show();
                    // $("#modx-leftbar").css('z-index',parseInt($("#mce-modal-block").css('z-index'))+2);
                    $("#themChecks").fadeOut('slow');
                  } else {
                    $("#mce-modal-block").fadeOut();
                    // $("#modx-leftbar").css('z-index','auto');
                    $("#themChecks").fadeIn('slow');
                  }
                } else {
                  editor.windowManager.alert("You need MODX Manager Resource Tree for this to work")
                }
              })
            }
          }).renderTo(document.getElementById(thisAppendTo));
          tinymce.ui.Factory.create({
            type: 'checkbox',
            tooltip: 'Autofill URL?',
            checked: true,
            classes: 'themChecks themChecksURL',
            text: 'URL'
          }).renderTo(document.getElementById('themChecks'));
          if ($('.mce-tinyMODXselected').length) {
            tinymce.ui.Factory.create({
              type: 'checkbox',
              tooltip: 'Autofill Text To Display?',
              classes: 'themChecks themChecksTXT',
              text: 'Text'
            }).renderTo(document.getElementById('themChecks'));
          }
          tinymce.ui.Factory.create({
            type: 'checkbox',
            tooltip: 'Autofill Title?',
            classes: 'themChecks themChecksTITLE',
            text: 'Title'
          }).renderTo(document.getElementById('themChecks'));
          tinymce.ui.Factory.create({
            type: 'menubutton',
            tooltip: 'Title Options',
            classes: 'themChecks themChecksMORE',
            menu: [{
              text: 'Use Resource Description',
              classes: 'themChecksMOREdesc',
              onclick: function() {
                if ($(".mce-themChecksMOREdesc").hasClass("mce-active")) {
                  $(".mce-themChecksMOREdesc").removeClass("mce-active")
                } else {
                  $(".mce-themChecksMOREdesc").addClass("mce-active")
                }
              }
            }]
          }).renderTo(document.getElementById('themChecks'));
        }, //MODX
        body: [{
            name: 'href',
            type: 'filepicker',
            filetype: 'file',
            size: 40,
            autofocus: true,
            label: 'Url',
            classes: 'modxUrl', //MODX
            onchange: urlChange,
            onkeyup: updateText
          },
          textListCtrl,
          linkTitleCtrl,
          buildAnchorListControl(data.href),
          linkListCtrl,
          relListCtrl,
          targetListCtrl,
          classListCtrl
        ],
        onSubmit: function(e) {
          /*eslint dot-notation: 0*/
          var href;
          data = tinymce.extend(data, e.data);
          href = data.href;
          // Delay confirm since onSubmit will move focus
          function delayedConfirm(message, callback) {
            var rng = editor.selection.getRng();
            tinymce.util.Delay.setEditorTimeout(editor, function() {
              editor.windowManager.confirm(message, function(state) {
                editor.selection.setRng(rng);
                callback(state);
              });
            });
          }

          function insertLink() {
            var linkAttrs = {
              href: href,
              target: data.target ? data.target : null,
              rel: data.rel ? data.rel : null,
              "class": data["class"] ? data["class"] : null,
              title: data.title ? data.title : null
            };
            if (anchorElm) {
              editor.focus();
              if (onlyText && data.text != initialText) {
                if ("innerText" in anchorElm) {
                  anchorElm.innerText = data.text;
                } else {
                  anchorElm.textContent = data.text;
                }
              }
              dom.setAttribs(anchorElm, linkAttrs);
              selection.select(anchorElm);
              editor.undoManager.add();
            } else {
              if (onlyText) {
                editor.insertContent(dom.createHTML('a', linkAttrs, dom.encode(data.text)));
              } else {
                editor.execCommand('mceInsertLink', false, linkAttrs);
              }
            }
          }
          if (!href) {
            editor.execCommand('unlink');
            return;
          }
          // Is email and not //user@domain.com
          if (href.indexOf('@') > 0 && href.indexOf('//') == -1 && href.indexOf('mailto:') == -1) {
            delayedConfirm('The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?', function(state) {
              if (state) {
                href = 'mailto:' + href;
              }
              insertLink();
            });
            return;
          }
          // Is not protocol prefixed
          if ((editor.settings.link_assume_external_targets && !/^\w+:/i.test(href)) || (!editor.settings.link_assume_external_targets && /^\s*www[\.|\d\.]/i.test(href))) {
            delayedConfirm('The URL you entered seems to be an external link. Do you want to add the required http:// prefix?', function(state) {
              if (state) {
                href = 'http://' + href;
              }
              insertLink();
            });
            return;
          }
          insertLink();
        }
      });
    } else {
      editor.windowManager.alert("modxMagicHoverLink does not allow multiple instances") //MODX
    }
  }
  editor.on('init change', function() { //MODX
    var hoverStripMODXurl = editor.getParam("hoverStripMODXurl", true);
    if(hoverStripMODXurl){
      $(tinymce.activeEditor.getBody()).find("a").each(function() {
        var thisHref = $(this).attr('href');
        if (thisHref && thisHref.indexOf('[[~') > -1 && thisHref.indexOf(']]') > -1) {
          split1 = thisHref.split('[[~');
          split2 = split1[1].split(']]');
          thisHref = '[[~' + split2[0] + ']]';
          $(this).attr({
            'href': thisHref,
            'data-mce-href': thisHref
          })
        }
      })
    }
  }); //MODX
  editor.addButton('link', {
    icon: 'link',
    tooltip: 'Insert/edit link',
    shortcut: 'Meta+K',
    onclick: createLinkList(showDialog),
    stateSelector: 'a[href]'
  });
  editor.addButton('unlink', {
    icon: 'unlink',
    tooltip: 'Remove link',
    cmd: 'unlink',
    stateSelector: 'a[href]'
  });
  editor.addShortcut('Meta+K', '', createLinkList(showDialog));
  editor.addCommand('mceLink', createLinkList(showDialog));
  this.showDialog = showDialog;
  editor.addMenuItem('link', {
    icon: 'link',
    text: 'Insert/edit link',
    shortcut: 'Meta+K',
    onclick: createLinkList(showDialog),
    stateSelector: 'a[href]',
    context: 'insert',
    prependToContext: true
  });
});
