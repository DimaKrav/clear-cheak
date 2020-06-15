jQuery(document).ready(function( $ ) {

    $('#menu .item .item-link').click(function(e){
        if($(this).parent().hasClass("has-submenu")) {
            e.preventDefault();
            $(this).parent().toggleClass('active');
        }
    });

    $('#menu__toggle').on('click', function () {

            $('#sidebar').toggleClass('active');

    })







    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();


    // let data = [{
    //     date: year + '-' + month + '-' + (date - 1),
    //     value: 'hello'
    // }, {
    //     date: year + '-' + month + '-' + date,
    //     value: '上班'
    // }, {
    //     date: new Date(year, month - 1, date + 1),
    //     value: '吃饭睡觉打豆豆'
    // }, {
    //     date: '2016-10-31',
    //     value: '2016-10-31'
    // }];

// inline
    let $ca = $('#time-picker-module').calendar({
        // view: 'month',
        width: 200,
        height: 150,
        startWeek: 1,
        // selectedRang: [new Date(), null],
        // day of the week
        weekArray: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        // data: data,
        // monthArray: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthArray: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
        date: now,
        onSelected: function (view, date, data) {
            console.log('view:' + view);
            console.log('date:' + date);
            console.log('data:' + (data || 'None'));
        },
        viewChange: function (view, y, m) {
            console.log(view, y, m)

        }
    });

});

(function($){
    $(window).on("load",function(){
        $(".table-responsive").mCustomScrollbar({
            theme:"dark-3",
        });
    });


})(jQuery);



'use strict';

;( function ( document, window, index )
{
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label	 = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\\' ).pop();

            if( fileName )
                label.querySelector( 'span' ).innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });

        // Firefox bug fix
        input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
        input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
    });
}( document, window, 0 ));