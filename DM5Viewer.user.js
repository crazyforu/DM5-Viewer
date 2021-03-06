// ==UserScript==
// @name         DM5 Viewer
// @version      1.0.2
// @description  Display all comic images at once.
// @author       Emma (emma2334)
// @match        http://www.dm5.com/m*
// @exclude      http://www.dm5.com/manhua-*
// @exclude      http://www.dm5.com/m*-end/
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/emma2334/DM5-Veiwer/master/DM5Viewer.user.js
// ==/UserScript==

(function(){
  // modify display
  $('.commentList').hide();
  $('.inputBar').hide();
  $('.today').hide();
  $('#showimage').html('').css('min-height', '100vh');

  // get images
  var count=1;
  var getImg = function(){
    $.ajax({
      url: "chapterfun.ashx",
      data: { cid: DM5_CID, page: count, key: $("#dm5_key").val(), language: 1, gtk: 6 },
      type: "POST",
      success: function (msg) {
        var img = eval(msg);
        for(i=0; i<img.length; i++){
          $('#showimage').append('<img src="' + img[i] + '" data-page="' + count + '"><br>');
          count++;
        }
        if(count<=DM5_IMAGE_COUNT) getImg();
      }
    });
  };
  getImg();

  // import css
  $('head').append('<link rel="stylesheet" href="http://emma2334.github.io/DM5-Viewer/files/css/style.css">');

  // add menu to toolbar
  $('.rightToolBar').append('<a href="javascript:$(\'.chapterBar.tool\').toggle();" title="目錄" class="logo_6"></a>');
  $('.chapterBar.down').clone().removeClass('down').addClass('tool').prependTo('.rightToolBar');
})();