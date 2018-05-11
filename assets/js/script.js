$(document).ready(function () {  
    $('.button-collapse').sideNav();
    $('select').material_select();
});

$('.edit-button').click(function(){
    $(this).parent().parent().find('.hidden-div-edit').eq(0).css('display','block');
});

CKEDITOR.replace( 'body' );