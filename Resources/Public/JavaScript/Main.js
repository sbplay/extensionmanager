/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","jquery","nprogress","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/SplitButtons","TYPO3/CMS/Backend/Tooltip","TYPO3/CMS/Backend/Severity","TYPO3/CMS/Core/SecurityUtility","./Repository","./Update","./UploadForm","datatables","TYPO3/CMS/Backend/jquery.clearable"],function(n,e,t,a,o,i,r,s,l,c,u,d){"use strict";var p,f,m=new l;(f=p||(p={})).extensionlist="#typo3-extension-list",f.searchField="#Tx_Extensionmanager_extensionkey";var g=new(function(){function n(){var e=this;this.bindExtensionListActions=function(){t(".removeExtension").not(".transformed").each(function(n,a){var i=t(a);i.data("href",i.attr("href")),i.attr("href","#"),i.addClass("transformed"),i.click(function(){o.confirm(TYPO3.lang["extensionList.removalConfirmation.title"],TYPO3.lang["extensionList.removalConfirmation.question"],s.error,[{text:TYPO3.lang["button.cancel"],active:!0,btnClass:"btn-default",trigger:function(){o.dismiss()}},{text:TYPO3.lang["button.remove"],btnClass:"btn-danger",trigger:function(){e.removeExtensionFromDisk(i),o.dismiss()}}])})})},t(function(){t.fn.dataTableExt.oSort["extension-asc"]=function(e,t){return n.extensionCompare(e,t)},t.fn.dataTableExt.oSort["extension-desc"]=function(e,t){return-1*n.extensionCompare(e,t)},t.fn.dataTableExt.oSort["version-asc"]=function(e,t){return-1*n.versionCompare(e,t)},t.fn.dataTableExt.oSort["version-desc"]=function(e,t){return n.versionCompare(e,t)},e.Update=new u,e.UploadForm=new d,e.Repository=new c;var o=e.manageExtensionListing();t(document).on("click",".onClickMaskExtensionManager",function(){a.start()}).on("click","a[data-action=update-extension]",function(n){n.preventDefault(),t.ajax({url:t(e).attr("href"),dataType:"json",beforeSend:function(){a.start()},success:e.updateExtension})}).on("change","input[name=unlockDependencyIgnoreButton]",function(n){t(".t3js-dependencies").toggleClass("disabled",!t(n.currentTarget).prop("checked"))}),t(p.searchField).clearable({onClear:function(){o.search("").draw()}}),t(document).on("click",".t3-button-action-installdistribution",function(){a.start()}),i.addPreSubmitCallback(function(n){t(n.target).hasClass("t3js-save-close")&&t("#configurationform").append(t("<input />",{type:"hidden",name:"tx_extensionmanager_tools_extensionmanagerextensionmanager[action]",value:"saveAndClose"}))}),e.Repository.initDom(),e.Update.initializeEvents(),e.UploadForm.initializeEvents(),r.initialize("#typo3-extension-list [title]",{delay:{show:500,hide:100},trigger:"hover",container:"body"})})}return n.prototype.manageExtensionListing=function(){var e=t(p.searchField),a=t(p.extensionlist).DataTable({paging:!1,dom:"lrtip",lengthChange:!1,pageLength:15,stateSave:!0,drawCallback:this.bindExtensionListActions,columns:[null,null,{type:"extension"},null,{type:"version"},{orderable:!1},null,null]});e.parents("form").on("submit",function(){return!1});var o=n.getUrlVars(),i=o.search?o.search:a.search();return e.val(i),e.on("input",function(n){a.search(t(n.currentTarget).val()).draw()}),a},n.prototype.removeExtensionFromDisk=function(n){t.ajax({url:n.data("href"),beforeSend:function(){a.start()},success:function(){location.reload()},complete:function(){a.done()}})},n.getUrlVars=function(){for(var n,e=[],t=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),a=0;a<t.length;a++)n=t[a].split("="),e.push(n[0]),e[n[0]]=n[1];return e},n.versionCompare=function(n,e){if(n===e)return 0;for(var t=n.split("."),a=e.split("."),o=Math.min(t.length,a.length),i=0;i<o;i++){if(parseInt(t[i],10)>parseInt(a[i],10))return 1;if(parseInt(t[i],10)<parseInt(a[i],10))return-1}return t.length>a.length?1:t.length<a.length?-1:0},n.extensionCompare=function(n,e){var t=document.createElement("div");t.innerHTML=n;var a=t.textContent||t.innerText||n;t.innerHTML=e;var o=t.textContent||t.innerText||e;return a.trim().localeCompare(o.trim())},n.prototype.updateExtension=function(n){var e=0,i=t("<form>");t.each(n.updateComments,function(n,a){var o=t("<input>").attr({type:"radio",name:"version"}).val(n);0===e&&o.attr("checked","checked"),i.append([t("<h3>").append([o," "+m.encodeHtml(n)]),t("<div>").append(a.replace(/(\r\n|\n\r|\r|\n)/g,"\n").split(/\n/).map(function(n){return m.encodeHtml(n)}).join("<br>"))]),e++});var r=t("<div>").append([t("<h1>").text(TYPO3.lang["extensionList.updateConfirmation.title"]),t("<h2>").text(TYPO3.lang["extensionList.updateConfirmation.message"]),i]);a.done(),o.confirm(TYPO3.lang["extensionList.updateConfirmation.questionVersionComments"],r,s.warning,[{text:TYPO3.lang["button.cancel"],active:!0,btnClass:"btn-default",trigger:function(){o.dismiss()}},{text:TYPO3.lang["button.updateExtension"],btnClass:"btn-warning",trigger:function(){t.ajax({url:n.url,data:{tx_extensionmanager_tools_extensionmanagerextensionmanager:{version:t("input:radio[name=version]:checked",o.currentModal).val()}},dataType:"json",beforeSend:function(){a.start()},complete:function(){location.reload()}}),o.dismiss()}}])},n}());return void 0===TYPO3.ExtensionManager&&(TYPO3.ExtensionManager=g),g});