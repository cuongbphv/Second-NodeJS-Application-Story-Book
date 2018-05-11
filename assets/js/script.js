$(document).ready(function () {  
    $('.button-collapse').sideNav();
    $('select').material_select();
});

$('#edit-button').click(function(){
    $('.hidden-div-edit').css('display','block');
});

CKEDITOR.replace( 'body' );