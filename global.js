/*
http://patorjk.com/software/taag/#p=display&f=Small&t=width

   __                    
  / _|_ _ __ _ _ __  ___ 
 |  _| '_/ _` | '  \/ -_)
 |_| |_| \__,_|_|_|_\___|
                         
*/



function _checkapp() {
    var useragent = navigator.userAgent;
    var regex = new RegExp(/(WebView|(iPhone|iPod|iPad)(?!.*Safari\/)|Android.*(wv|.0.0.0))/gi);
    var str = Boolean(useragent.match(regex));
    return str;
}
function _s_get(name) { if(_checkapp()) { return $.session.get(name); } else { return localStorage.getItem(name); } }
function _s_set(name, input) { var date = new Date(), minutes = 30;
    date.setTime(date.getTime() + (minutes * 24 * 60 * 1000));
    if(_checkapp()) { return $.session.set(name, input); } else { return localStorage.setItem(name, input); }
}
function _s_clear() { if(_checkapp()) { $.session.clear(); } else { localStorage.clear(); }}
function _get_json(func, url, input1, input2) {
    //console.log( 'url', 'https://sub.hmm-shop.com/__others/mxd/presentation/'+url )
    $.ajax({
        url:            url,
        type:           'GET',
        dataType:       'json', 
        data: {},
        error: function(xhr) {},
        success: function(response) {
            //console.log('return: ', response);
        },
        complete: function(response) {
            var data = JSON.parse(response.responseText);
            //console.log('complete: ', data);
            func(data, input1, input2);
        }
    });
}













/*

       _     _          _ 
  __ _| |___| |__  __ _| |
 / _` | / _ \ '_ \/ _` | |
 \__, |_\___/_.__/\__,_|_|
 |___/                    

*/

var globalmenu = {};
var currenturlstr = '';
var baseurl = '';
function _getbaseurl(input) {
    if(String(input).indexOf('http')>-1) { //console.log(input)
        return input;
    } else {
        if(input==undefined) return '';
        //return baseurl + input;
        return input;
    }
}
function _encodehtml(input) {
    return input
        .replace(/&/g, '嚗�amp;')
        //.replace(//g, '嚗�gt;')
        .replace(/"/g, '嚗�quot;')
        .replace(/'/g, '嚗�apos;');
}
function _decodehtml(input) {
    return input.replace(/嚗�apos;/g, "'")
        .replace(/嚗�quot;/g, '"')
        .replace(/嚗�gt;/g, '>')
        .replace(/嚗�lt;/g, '<')
        .replace(/嚗�amp;/g, '&');
}
function _formatnumber(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
function _checkblank(obj, msg){
    if(obj.val()=='') {
        obj.parent().find('.msg.error').remove();
        obj.parent().safeAppend('<span class="msg error">'+msg+'</span>');
        return false;
    }
    return true;
}
function _checknumber(obj, msg) {
    if(isNaN(parseFloat(obj.val()))) {
        obj.parent().find('.msg.error').remove();
        obj.parent().safeAppend('<span class="msg error">'+msg+'</span>');
        return false;
    }
    return true;
}
function _getlang() {
    if($('body').hasClass('lang-en')) return 'en';
    else return 'tw';
}
function _reverselang(input) {
    if(input=='zh-tw') return 'en-us';
    else return 'zh-tw';
}
function _getparam(input, from) {
    var tmp = from.split('&');
    for(var n=0; n<tmp.length; n++) {
        var tmp2 = tmp[n].split('=');
        if(tmp2[0]==input) return tmp2[1];
    }
    return false;
}
function _setloader() {
    $('body').safeAppend('<div class="loader"></div>');
    setTimeout(function() {
        _removeloader();
    }, 5000);
}
function _removeloader() {
    $('body .loader').remove();
}
function _setloading(obj) {
    //return;
    $(obj).css({height:$(window).width()*.25});
    $(obj).safeAppend('<div class="loader"></div>');
}
function _removeloading(obj) {
    $(obj).css({height:'auto'});
    $(obj).find('.loader').remove();
}
function _mlink_checkclass(obj) {
    var tmp = '';
    //if(obj.title=='銝𦠜��砍虬�亙藁蝬�')    console.log(obj, obj.link, obj.menu )
    if(obj.menu!=undefined && obj.link==undefined) tmp = 'nolink';
    if(obj.menu!=undefined && obj.link=='') tmp = 'nolink';
    if(obj.link!=undefined && obj.link!='' && String(obj.link).indexOf('html')>0 ) tmp = '';
    if(String(_getbaseurl(obj.link)).indexOf('http')>-1) tmp += ' outlink';
    return tmp;
}
function _mlink_link(obj) {
    //if(obj.title=='銝𦠜��砍虬�亙藁蝬�')    console.log(obj, obj.link, obj.menu )
    //_getbaseurl(dd[m1].link);
    if(obj.link!=undefined) {
        var tmp = ' href="'+obj.link+'" ';
        if(String(obj.link).indexOf('http')>-1) {tmp += 'target="_blank" ';}
        return tmp;
    } else {
        return '';
    }
}
function _mlink_sideli(obj) {
    var tmp = 'nolink ';
    //if(obj.title=='銝𦠜��砍虬�亙藁蝬�')    console.log(obj, obj.link, obj.menu )
    if(obj.link!=undefined && obj.link!='') tmp = ' withlink ';
    return tmp;
}
function _init_menu() {

    // getdata
        function _setmenu(data) {
            var d = data.data; 
                globalmenu = d;
            var b = '';
            //b += '<a class="btn-next"></a>';
            //b += '<ul class="nav fullh">';
                //b += '<li class="mobileonly"><a class="menu level1">擐㚚�</a></li>';
            for(var n=0; n<d.length; n++) {
                b += '<li class="onlevel1">';
                    b += '<a class="menu level1" data-code="'+d[n].code+'" href="" alt="'+d[n].title+'">'+d[n].title+'</a>';

                        
                        b += '<div class="megatabset tabset tabset'+(n+1)+'">';
                        for(var m=0; m<d[n].menu.length; m++) {
                            b += '<a href="#" class="level2 tab tab'+(m+1)+'" alt="'+d[n].menu[m].title+'">'+d[n].menu[m].title+'</a>';
                        }
                            b += '<a href="#" class="btn-close"></a>';
                        b += '</div>';

                    b += '<div class="megamenu mega'+(n+1)+'">';
                        b += '<a href="#" class="btn-prev"></a>';
                        // b += '<div class="tabset">';
                        // for(var m=0; m<d[n].menu.length; m++) {
                        //     b += '<a href="#" class="level2 tab tab'+(m+1)+'" alt="'+d[n].menu[m].title+'">'+d[n].menu[m].title+'</a>';
                        // }
                        // b += '</div>';
                        
                        // content
                        for(var m=0; m<d[n].menu.length; m++) {
                            var dd = d[n].menu[m].menu; 
                            var ad = d[n].menu[m].ad; 
                            b += '<div class="con con'+(m+1)+'" data-order="'+(m+1)+'">';
                                b += '<ul>';
                                b += '<a href=""></a>';
                                
                                //console.log('2.', dd);
                                if(dd!=undefined) {

                                    for(var m1=0; m1<dd.length; m1++) {
                                        // level3
                                        var ongap = false;
                                        if(dd[m1].menu!=undefined) {
                                            b += '<li>';
                                            //b += '<ol class="group">';
                                                var ll = '';
                                                    b += '<li><a class="level3 '+_mlink_checkclass(dd[m1])+'" '+_mlink_link(dd[m1])+' alt="'+dd[m1].title+'">'+dd[m1].title+'</a></li>';

                                                ongap = true;
                                                for(var m2=0; m2<dd[m1].menu.length; m2++) {
                                                    // level4
                                                    b += '<li><a class="level4 '+_mlink_checkclass(dd[m1].menu[m2])+'" '+_mlink_link(dd[m1].menu[m2])+' alt="'+dd[m1].menu[m2].title+'">'+dd[m1].menu[m2].title+'</a></li>';
                                                    if(dd[m1].menu[m2].menu!=undefined) {
                                                        for(var m3=0; m3<dd[m1].menu[m2].menu.length; m3++) {
                                                            // level5
                                                            b += '<li><a class="level5 '+_mlink_checkclass(dd[m1].menu[m2].menu[m3])+'" '+_mlink_link(dd[m1].menu[m2].menu[m3])+' alt="'+dd[m1].menu[m2].menu[m3].title+'">'+dd[m1].menu[m2].menu[m3].title+'</a></li>';
                                                        }
                                                    }
                                                }
                                            //b += '</ol>';
                                        } else {
                                            b += '<li><a class="level3 '+_mlink_checkclass(dd[m1])+' " '+_mlink_link(dd[m1])+' alt="'+dd[m1].title+'">'+dd[m1].title+'</a></li>';
                                        }
                                        if(ongap) b += '<span class="gap"></span>';
                                    }

                                }
                                if(ad!=null && ad!=undefined) {
                                    if(ad.length>0) {
                                        b += '<span class="ad larger">';
                                            for(var m3=0; m3<ad.length; m3++) {
                                                b += '<a class="" href="'+_getbaseurl(ad[m3].link)+'" alt="'+ad[m3].title+'">';
                                                    b += '<img src="'+ad[m3].image+'">';
                                                    b += '<strong>'+ad[m3].title+'</strong>';
                                                    b += '<p>'+ad[m3].content+'</p>';
                                                b += '</a>';
                                            }
                                        b += '</span>';
                                    }
                                }

                                b += '</ul>';
                            b += '</div>';
                        }

                        

                b += '</li>';
            }
            //b += '</ul>';
            $('.fullmenu .nav.fullh li').remove();
            $('.fullmenu .nav.fullh').safePrepend(b);
            $('.fullmenu').safeAppend('<a class="btn-next"></a>');
            $('.fullmenu').addClass('disabled');


            setTimeout(function() {
                $('.fullmenu').removeClass('disabled');
                _settopmenuevent();
            }, 1000);



            // event

                var onhoverint;
                var onhovert = 0;
                var onmega = false;
                function _closemenu() {
                    clearTimeout(onhoverint);
                    clearTimeout(onhoverint);
                    onmega = false;
                    $('html,body').removeClass('noscroll');
                    $('.overlay').hide();
                    $('.header .nav li').removeClass('hover');
                    $('.header').removeClass('hover');
                    $('.megamenu').removeClass('hover');
                    $('.megatabset').removeClass('hover');
                }
                function _caltotalgapheight() {
                    $('.megamenu').find('.con').each(function() {
                        var total = $(this).find('a').length;
                        var _gap = $(window).width()*0.03;
                        var h = total/4 * _gap;
                        var withad = false;
                        if( $(this).find('.ad').length>0 ) withad = true;

                        if($(window).width()<641) {
                            var ww = 100 / $(this).find('.tabset .tab').length;
                            $(this).find('.tabset .tab').css({width:ww+'%', left:$(window).width() });
                            $(this).find('.con').css({height:$(window).height() - ($(this).find('.tabset').height()+140) });
                        } else {

                            h = total/2 * _gap;
                            /*
                            if(total<=5) {
                                h = total/1*_gap;
                                if(h>$(window).height()*.6) h = total/2 * _gap;
                            } else if(total>5 && total<=25) {
                                h = total/2*_gap;
                                if(h>$(window).height()*.6) h = total/3 * _gap;
                            } else {
                                */
                                var coll = 4;
                                    if(withad) coll = 3;
                                    if($(window).width()<1090) {
                                        coll = 3;
                                        if(withad) coll = 2;
                                    }

                                var th = total*50;
                                    th = 0;
                                    $(this).find('li, .gap').each(function() {
                                        th += $(this).height();
                                    });
                                    h = th / coll;
                                    h += 200;//憓𧼮�牐�𠹺�讠�嗵蒾蝛粹��
                                    //console.log( 'on >48', total, h)
                            //}
                            if(h<180) h = 180;
                            if( $(this).find('.ad.larger').length>0 && $(this).find('.ad.larger').height()!=undefined && $(this).find('.ad.larger').height()>0) {
                                //console.log(h, $(this).find('.ad.larger').height() )
                                if( ($(this).find('.ad.larger').height()+40)>h ) {
                                    h = $(this).find('.ad.larger').height()+40;
                                }
                            }
                        }
                        $(this).find('ul').css({maxHeight:h, height:h});
                        $(this).attr('data-total', total);
                        $(this).attr('data-h', h);
                        $(this).find('a,button').last().addClass('conlast');
                    });
                    $('body .debug').append('run');
                    //$('.mega2').show();
                }
                //$('body').append('<div class="debug"></div>');
                function _resize() {
                    _onapp = _checkapp();
                    if(_onapp) {
                        $('.header .nav.fullh .cover').hide();
                        $('body').addClass('onapp');
                    } else {
                        $('.header .nav.fullh .cover').show();
                        $('body').removeClass('onapp');
                    }
                    //$('body').append('<div class="debug">'+_onapp+'</div>');

                    if($(window).width()<641) {
                        $('.header .nav').hide();
                        $('.header').find('.nav.fullh .topright .nav').show();
                        $('.megamenu .tabset').css({
                            left:$(window).width(),
                        });
                        $('.fullmenu').removeClass('switcher');
                    } else {
                        $('.header .nav').show().css({display:'flex', left:0,});
                        $('.header').find('.nav.fullh .topright .nav').hide();
                        $('.header>.megatabset').remove();
                        $('.megamenu .tabset').css({
                            top:$('header').height()+$(window).width()*.005,
                            left:0, display:'flex',
                        });

                        // switch
                            var allowswitch = false;
                            var _zhw = 1500;//1060;
                            var _enw = 1500;//1400;
                            if($('body').hasClass('lang-zh-tw') && $(window).width()<_zhw) { allowswitch = true; }
                            if($('body').hasClass('lang-en-us') && $(window).width()<_enw) { allowswitch = true; }
                            if(allowswitch && $(window).width()>640) {
                                $('.fullmenu').addClass('switcher');
                            } else {
                                $('.fullmenu').removeClass('switcher');
                            }

                        // menu
                        _caltotalgapheight();
                    }
                }
                _caltotalgapheight();


                function _rundebug(input) {
                    $('body .debug').remove();
                    var b = '<div class="debug">'+input+'</div>';
                    $('body').append(b);
                }

                function _openmm(obj, num) {
                    $('.overlay').show();
                    $('.header .nav li').removeClass('hover');
                    $('.header').addClass('hover');
                    obj.addClass('hover');
                    $('.megamenu').removeClass('hover');
                    $('.mega'+num).addClass('hover');
                    $('.megatabset').removeClass('hover');
                    $('.megatabset.tabset'+num).addClass('hover').show();
                    onmega = true;
                    //if(mouseposy<92) 
                        _caltotalgapheight();
                }

                var allowcounting = true;
                var allowcounter = 0;
                var allowint;
                //$('.header .nav.fullh').safeAppend( '<div class="cover"></div>' );
                function _checkposyformenu() {
                    allowcounting = false;
                    allowint = setTimeout(function() {
                        // allowcounter++;
                        // if(allowcounter>1) {
                        //     allowcount = true;
                            // $('.header .nav.fullh .cover').hide();
                            // clearTimeout(allowint);
                            // clearTimeout(allowint);
                        //}
                    }, 10);
                }
                var mouseposy;
                $(window).mousemove(function(e) {
                    mouseposy = e.clientY;
                    if($(window).width()<640) return;
                    if(e.clientY<90 && e.clientY>50) {
                        if(!allowcounting) return;
                        //_checkposyformenu();
                    } else {
                        allowcounter = 0;
                        allowcounting = true;
                        clearTimeout(allowint);
                        $('.header .nav.fullh .cover').show();
                    }
                });
                $('.header .nav').mousedown(function(e) {
                    if(mouseposy<92 || e.clientY<92) {
                        _caltotalgapheight();
                    }
                });
                $('.level1').on('mousedown, click, touchstart', function(e) {
                    if(mouseposy<92) {
                        _caltotalgapheight();
                    }
                });
                $('.header .nav li .level1').mouseover(function(e) {
                    
                    if($(window).width()<641) {
                        // mobile m
                        e.preventDefault();

                        $('.header>.megatabset').remove();
                        $('.header>.megamenu').remove();

                        $('.megamenu').removeClass('hover');
                        var num = $(this).closest('li').index()+1;
                        $('.mega'+(num)).addClass('hover').show();
                        //$(this).find('.megamenu').find('.tabset').hide();
                        $(this).find('.megatabset').hide();
                        $('.header').safeAppend( $('.mega'+(num)).clone() );
                        $('.header').safeAppend( $('.megatabset.tabset'+(num)).clone() );
                
                        $('.header>.megamenu').addClass('top');
                        $('.header>.megatabset').addClass('top');
                            var ttotal = $('.header>.megatabset.top .tab').length;
                            $('.header>.megatabset.top .tab').css({width: (100/ttotal)+'%' });
                        $('.header>.megamenu .btn-prev').click(function() {
                            TweenMax.to($('.header .nav'), .7, {left:0, ease:Expo.easeInOut});
                            TweenMax.to($('.header>.megamenu.top'), .7, {left:$(window).width(), ease:Expo.easeInOut});
                            TweenMax.to($('.header>.megatabset.top'), .7, {left:$(window).width(), ease:Expo.easeInOut,
                                onComplete:function() {
                                    $('.header>.megamenu.top').remove();
                                    $('.header>.megamenu.top .btn-prev').hide();
                                }
                            });
                        });
                        // animation
                            TweenMax.fromTo($('.header .nav'), .7, {left:0}, {left:-$(window).width(), ease:Expo.easeInOut});
                            TweenMax.fromTo($('.header>.megamenu.top'), .7, {left:$(window).width()}, {left:0, ease:Expo.easeInOut});
                            TweenMax.fromTo($('.header>.megatabset.top'), .7, {display:'flex', left:$(window).width()}, {left:0, ease:Expo.easeInOut});
                            $('.header>.megatabset.top').show();

                        $('.header>.megatabset.top').find('.tab').click(function() {
                            $('.header>.megamenu.top').find('.con').hide();
                            $('.header>.megamenu.top').find('.con').eq( $(this).index() ).show();
                            $('.header>.megatabset.top').find('.tab').removeClass('selected');
                            $(this).addClass('selected');
                        });

                    } else {
                        e.preventDefault();
                        var num = ($(this).parent().index()+1);
                        var obj = $(this).parent();
                        _openmm(obj, num);
                    }
                });
                $('.header .nav li').find('a').each(function() {
                    if( String($(this).attr('href')).indexOf('http')>-1 ) {
                        $(this).attr('target', '_blank');
                    }
                });
                $('.header .nav>li>a').click(function(e) {
                    e.preventDefault();
                    if(mouseposy<92) {
                        var num = ($(this).parent().index()+1);
                        var obj = $(this);
                        _openmm(obj, num);

                    }
                });
                $('.fullmenu .btn-next').click(function() {
                    var tx = 0;
                    if(!$('.fullmenu .btn-next').hasClass('open')) {
                        tx = 0 - $('.fullmenu').width()*.8;
                        $('.fullmenu .btn-next').addClass('open');
                    } else {
                        tx = 0;
                        $('.fullmenu .btn-next').removeClass('open');
                    }
                    TweenMax.to($('.fullmenu .nav'), .5, {left:tx });
                });
                $('.header .btn-menu').click(function(e) {
                    $('.header').addClass('hover');
                    if(!$('.header .nav').hasClass('open')) {
                        $('body').addClass('noscroll');
                        $(this).addClass('open');
                        $('.header').addClass('open');
                        $('.header .nav').slideDown('fast');
                        $('.header .nav').show();
                        $('.header .nav').addClass('open');
                    } else {
                        $(this).removeClass('open');
                        $('.header').removeClass('open');
                        //$('.header .nav').slideUp();
                        $('.header .nav').hide();
                        $('.header .nav').removeClass('open');
                        $('html,body').removeClass('noscroll');
                    }
                });
                $('.megamenu, .header').mouseleave(function() {
                    //_closemenu();
                });
                $('.header .nav').mouseleave(function() {
                    _closemenu();
                });
                $('.overlay').on('mousedown, mousemove, touchend', function() {
                    _closemenu();
                });
                $('.megatabset .btn-close').click(function(e) {
                    e.preventDefault();
                    $(this).closest('li').find('.megamenu').removeClass('hover').hide();
                    $(this).closest('li').find('.megatabset').removeClass('hover').hide();
                    $('.header .nav li').removeClass('hover');
                    $('html,body').removeClass('noscroll');
                    $('.overlay').hide();
                });
                $('.megatabset').each(function() {
                    var obj = $(this).parent().find('.megamenu');
                    $(this).parent().find('.megamenu .con').hide();
                    $(this).parent().find('.megamenu .con').first().show();
                    $(this).find('.tab').first().addClass('selected');
                    $(this).find('.tab').click(function() {
                        var total = $(this).find('a').length;
                        obj.find('.con').hide();
                        obj.find('.con').eq( $(this).index() ).show();
                        if( obj.find('.con').eq( $(this).index() ).find('.group').length>0 ) {
                            var currenth = parseInt(obj.find('.con').eq( $(this).index() ).find('ul').css('maxHeight'));
                            var theh = ( obj.find('.con').eq( $(this).index() ).find('.group').height() );
                            if((theh+80)>currenth) {
                                //console.log( '��齿鰵閮��烾�睃漲', currenth, theh );
                                obj.find('.con').eq( $(this).index() ).find('ul').css({maxHeight:theh + 80});
                            }
                        }
                        $(this).parent().find('.tab').removeClass('selected');
                        $(this).addClass('selected');
                        _caltotalgapheight();

                    });
                });

                function _checkapp() {
                    let check = false;
                    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
                    return check;
                }
                var _onapp = _checkapp();
                _resize();
                $(window).resize(function() {_resize();});

                // after menu, set
                var url = document.location.pathname;
                currenturlstr = url.substr( 6 );
                if(currenturlstr.indexOf('?')>0)
                    currenturlstr = currenturlstr.substr( 0, parseInt(currenturlstr.indexOf('?')) );
                _init_scroll();
                _init_accessbility();
                _init_runsidemenu();
        }

        function _getlangjson(input) {
            if(input=='zh-tw') {
                _get_json(_setmenu, _menulink_tw);
            } else {
                _get_json(_setmenu, _menulink_en);
            }
            _setbodylang(_onlang);
        }
        function _gohome() {
            document.location = encodeURI('/'+_onlang+'/index.html');
        }

    // init

        $('a').click(function(e) {if($(e.target).attr('href')=='') e.preventDefault();});
        $('.btn-home').click(function() { _gohome(); });
        $('.header').find('.logo').click(function() { _gohome(); });
        if( $('section.title').find('.formblock').length<1 ) {
            $('section.title').safeAppend('<form class="formblock flex open"></form>');
        }
        var megah = $(window).height()*.55;
        _getlangjson(_onlang);


        function _settopmenuevent() {
            $('.btn-menuchange').click(function(e) {
                e.preventDefault();
                var metastr = $('meta[name="language-toggle"]').attr('content');
                if(metastr!=undefined) {
                    document.location = metastr;
                    return;
                }

                var tmp = ( String(document.location).substr(String(document.location).indexOf('?')));
                    if(tmp.substr(0,1)!='?') tmp = '';
                var str = '/'+_reverselang(_onlang)+''+String(document.location.pathname).substr(6)+tmp;
                document.location = encodeURI(str);
            });
        }
}
function _setbodylang(input) {
    $('body').removeClass('lang-en-us lang-zh-tw');
    $('body').addClass('lang-'+input);
}






var onmenu = 0;
function _init_sidemenu(num) {
    // init
    $('body').addClass('section'+num);
    $('body').addClass('sidemenuopen');
    onmenu = num;
}
function _getcurrentsection() {
    var tmp = currenturlstr.substr(1);
    var tmp2 = tmp.substr(0, tmp.indexOf('/') );
    for(var n=0; n<globalmenu.length; n++) {
        //console.log(tmp2, globalmenu[n].code)
        if(tmp2==globalmenu[n].code) {
            return (n+1);
        }
    }
    return 0;
}
function _init_runsidemenu() {

    // getdata
        function _setmenu(d, num) {
            //console.log(num, d )

            if(num==undefined) num = 1;
            if(num==-1) num = 11;

            var b = '';
            b += '<div class="btn-show">��见�笔�湔��詨鱓</div>';
            b += '<a role="button" accesskey="s" class="accesskey access-s" title="�湔��詨鱓">:::</a>';
            if(d[num]!=undefined) {
                b += '<div class="nav nav'+(num+1)+'" data-title="'+d[num].title+'" data-url="'+d[num].link+'">';
                for(var n=0; n<d.length; n++) {
                    if(n==num) {
                            
                        // content
                        for(var m=0; m<d[n].menu.length; m++) {
                            b += '<strong>';
                                //b += ((n+1)+'.'+(m+1)+' '); //listnumber
                                b += d[n].menu[m].title+'</strong>';
                            var dd = d[n].menu[m].menu; 
                                //console.log( dd );
                            b += '<div class="con con'+(m+1)+'">';
                                b += '<ul>';
                                b += '<a href=""></a>';

                                if(dd!=undefined) {

                                    for(var m1=0; m1<dd.length; m1++) {
                                        //console.log( dd[m1].menu.length )
                                        // level3
                                        var ongap = false;
                                        var ex = ( (dd[m1].external==true)?' outlink" target="_blank':'' );
                                        if(dd[m1].menu!=undefined) {
                                            b += '<li><ol class="group group3">';
                                                b += '<a class="btn-arrow"><span class="img"></span></a>';
                                                b += '<li class="level3 '+_mlink_sideli(dd[m1])+'" ><a class="'+_mlink_checkclass(dd[m1])+'" '+_mlink_link(dd[m1])+'>'+dd[m1].title+'</a></li>';

                                                ongap = true;
                                                for(var m2=0; m2<dd[m1].menu.length; m2++) {
                                                    // level4
                                                    b += '<li class="level4 '+_mlink_sideli(dd[m1].menu[m2])+'"><a class="'+_mlink_checkclass(dd[m1].menu[m2])+'" '+_mlink_link(dd[m1].menu[m2])+' alt="'+dd[m1].menu[m2].title+'">'+dd[m1].menu[m2].title+'</a></li>';
                                                    if(dd[m1].menu[m2].menu!=undefined) {
                                                        b += '<span class="group group4">'
                                                        for(var m3=0; m3<dd[m1].menu[m2].menu.length; m3++) {
                                                            // level5
                                                            b += '<li class="level5"><a '+_mlink_link(dd[m1].menu[m2].menu[m3])+' alt="'+dd[m1].menu[m2].menu[m3].title+'">'+dd[m1].menu[m2].menu[m3].title+'</a></li>';
                                                        }
                                                        b += '</span>';
                                                    }
                                                }
                                            b += '</ol>';
                                        } else {
                                            b += '<li class="level3 '+_mlink_sideli(dd[m1])+'" ><a class="'+_mlink_checkclass(dd[m1])+'" '+_mlink_link(dd[m1])+'>'+dd[m1].title+'</a></li>';
                                        }
                                        if(ongap) b += '<span class="gap"></span>';
                                    }

                                }
                                b += '</ul>';
                            b += '</div>';
                        }

                    }
                }
            }
            b += '</div>';
            $('.sidemenu').empty().safeAppend( b );
            $('.sidemenu').css({height: $('.container').height() - $('.footer').height() + (16*13.5) });
            if(!$('header').hasClass('home'))
                $('.mega'+(num+1)).closest('li').addClass('selected');
            




            // event
                $('.sidemenu').find('.level4, .level5').each(function() {
                    $(this).hide();
                });
                var bb = '';
                var allowbb = true;
                function _getbread(obj) {
                    if(!allowbb) return;
                    bb += '<a class="btn-sidemenu" href=""></a>';
                    /*1*/ bb += '<a role="button" class="nolink" href="'+obj.closest('.nav').attr('data-link')+'" alt="'+obj.closest('.nav').attr('data-title')+'">'+obj.closest('.nav').attr('data-title')+'</a>';
                    /*2*/ bb += '<a role="button" class="nolink" href="'+obj.closest('.con').prev().attr('href')+'" alt="'+obj.closest('.con').prev().text()+'">'+obj.closest('.con').prev().text()+'</a>'; //listnumber
                    /*3*/ 
                        if(obj.parent().hasClass('level3') && obj.parent().find('.group4').length>0 ) {
                            var strtmp = '';
                            if(obj.closest('.group3').find('.level3').attr('href')=='' || obj.closest('.group3').find('.level3').attr('href')==undefined) {
                                strtmp = ' class="nolink" '; } else { strtmp = ''; }
                            bb += '<a role="button"'+strtmp+' href="'+obj.closest('.group3').find('.level3').attr('href')+'" alt="'+obj.closest('.group3').find('.level3').text()+'">'+obj.closest('.group3').find('.level3').text()+'</a>'; //listnumber
                        }
                    /*4*/
                        if(obj.parent().hasClass('level4') && obj.closest('.group3').find('.level3').text()!='' ) {
                            var strtmp = '';
                            if(obj.closest('.group4').find('.level4').attr('href')=='' || obj.closest('.group4').find('.level4').attr('href')==undefined) {
                                strtmp = ' class="nolink" '; } else { strtmp = ''; }
                            bb += '<a role="button"'+strtmp+' href="'+obj.closest('.group4').find('.level4').attr('href')+'" alt="'+obj.closest('.group3').find('.level3').text()+'">'+obj.closest('.group3').find('.level3').text()+'</a>';
                        }
                        if(obj.parent().hasClass('level5') && obj.parent().parent().hasClass('group4') ) {
                            //console.log('got 54', obj.closest('.group3').find('.level3 > a').text() );
                            var strtmp = '';
                            if(obj.closest('.group3').find('.level3 > a').attr('href')=='' || obj.closest('.group3').find('.level3 > a').attr('href')==undefined) {
                                strtmp = ' class="nolink" '; } else { strtmp = ''; }
                            bb += '<a role="button"'+strtmp+' href="'+obj.closest('.group3').find('.level3>a').attr('href')+'" alt="'+obj.closest('.group3').find('.level3>a').text()+'">'+obj.closest('.group3').find('.level3>a').text()+'</a>';
                        }

                    /*5*/
                        if(obj.parent().hasClass('level5') && obj.closest('.group4').prev().find('a').text()!='' ) {
                            var strtmp = '';
                            if(obj.closest('.group4').prev().find('a').attr('href')=='' || obj.closest('.group4').prev().find('a').attr('href')==undefined) {
                                strtmp = ' class="nolink" '; } else { strtmp = ''; }
                            bb += '<a role="button"'+strtmp+' href="'+obj.closest('.group4').prev().find('a').attr('href')+'" alt="'+obj.closest('.group4').prev().find('a').text()+'">'+obj.closest('.group4').prev().find('a').text()+'</a>';
                        }
                        bb += '<a role="button" href="'+obj.attr('href')+'" alt="'+obj.text()+'">'+obj.text()+'</a>';


                    /*hint*/
                        if(!_s_get('breadcrumbhintobjshow'))
                            bb += '<div class="hintobj">'+((_onlang=='zh-tw')?'暺墧�羓悌��蝚西��<br>�朖�虾�𤣰����湧�詨鱓':'Click on icon to<br>toggle sidemenu')+'</div>';

                        allowbb = false;

                    return bb;
                }
                function _runselectside(str) {
                    var nowstr = String($(this).attr('href'));
                    var tmpstr = nowstr.substr(0, nowstr.lastIndexOf('/'));
                    var metastr = $('meta[name="path"]').attr('content');
                    $('.sidemenu').find('a').each(function() {
                        
                        if(allowbb) {
                            //console.log('>>', str,  $(this).attr('href'),  String($(this).attr('href')).indexOf(str) );
                            //console.log('>>', $(this).attr('href'),  String($(this).attr('href')).indexOf(str) );
                            
                            if(metastr!=undefined) {
                                if( metastr==nowstr ) {
                                    $(this).closest('.group3').addClass('open');
                                    $(this).closest('.group4').addClass('open');
                                    $(this).addClass('selected');
                                    opened = true;
                                    bb = _getbread($(this));
                                } else {
                                    if(String($(this).attr('href')) == metastr ) {
                                        $(this).closest('.group3').addClass('open');
                                        $(this).closest('.group4').addClass('open');
                                        $(this).addClass('selected');
                                        opened = true;
                                        bb = _getbread($(this));
                                    }
                                }
                            } else if( String($(this).attr('href')).indexOf(str)>0 ) {
                                $(this).closest('.group3').addClass('open');
                                $(this).closest('.group4').addClass('open');
                                $(this).addClass('selected');
                                opened = true;
                                bb = _getbread($(this));
                            }
                            if( String($(this).attr('href')).indexOf('http')>-1 ) {
                                $(this).attr('target', '_blank');
                            }
                            if($(this).hasClass('selected')) {
                                // 閮剖�朞䌊��閙遝���
                                    var scrolltt = $(this).closest('li').position().top;
                                    if($(this).closest('.group4').length>0) scrolltt += $(this).closest('.group4').position().top;
                                    if($(this).closest('.group3').length>0) scrolltt += $(this).closest('.group3').position().top;
                                    if($(this).closest('.con').length>0) scrolltt += $(this).closest('.con').position().top;
                                    scrolltt += $(this).closest('.sidemenu').position().top;
                                    scrolltt += 100;
                                    //console.log( scrolltt, $(window).height()-140 )
                                        if(scrolltt<$(window).height()-140) return;
                                        TweenMax.to($('.sidemenu'), .7, {scrollTop:scrolltt, ease:Expo.easeInOut});
                            }
                        }
                    });
                    $('.breadcrumb').empty().safeAppend( bb );
                    $('.breadcrumb .hintobj').click(function() {
                        $('.breadcrumb .hintobj').remove();
                        _s_set('breadcrumbhintobjshow', false);
                    });
                    // check if breadcrumb
                    if(bb=='') {
                        $('body').removeClass('sidemenuopen');
                        $('body').addClass('nosidemenu');
                    }
                }

                var opened = false;
                _runselectside(currenturlstr);
                if(!opened) {
                    var newstr = currenturlstr.substr(0, currenturlstr.lastIndexOf('/') );
                    //_runselectside(newstr);
                }


                function _closesidemenu() {
                    $('.sidemenu').find('.nav').hide();
                    $('.breadcrumb .btn-sidemenu').removeClass('open');
                    $('body').removeClass('sidemenuopen');
                }
                function _opensidemenu() {
                    $('.sidemenu').find('.nav').show();
                    $('.breadcrumb .btn-sidemenu').addClass('open');
                    $('body').addClass('sidemenuopen');
                }
                $('.breadcrumb .btn-sidemenu').click(function(e) {
                    //$('.sidemenu').find('.btn-show').click(function() {
                    if( $('body').hasClass('sidemenuopen') ) {
                        _closesidemenu();
                        _s_set('sidemenuopen', 'false');
                    } else {
                        _opensidemenu();
                        _s_set('sidemenuopen', 'true');
                    }
                    e.preventDefault();
                });
                $('.breadcrumb a').click(function(e) {
                    if( $(this).hasClass('nolink') ) {
                        e.preventDefault();
                    }
                });
                $('.sidemenu').find('ol .btn-arrow').click(function() {
                    if( $(this).parent().hasClass('open') ) {
                        $(this).parent().removeClass('open');
                    } else {
                        $(this).parent().addClass('open');
                    }
                });

                $('.sidemenu').scroll(function() {
                    _s_set('sidemenupos', $('.sidemenu').scrollTop() );
                });

                
                if(_s_get('sidemenuopen')=='true' ) {
                    if(!$('body').hasClass('nosidemenu'))
                        _opensidemenu();
                } else {
                    _closesidemenu();
                }
                //_opensidemenu();
        }

    // init
        var num = _getcurrentsection();
        if(num==0) num = 12;
        onmenu = num;

        // �鸌畾𦠜����
        // if(currenturlstr=='/bond.html') { num = 4; onmenu = 4; }
        if(num!=0 && !$('.header').hasClass('home') )
            $('body').addClass('section'+num);

        _setmenu( globalmenu, num-1 );

}
function _init_sitemap(obj) {

    // getdata
        function _setmenu(d) {
            var b = '';
            for(var n=0; n<d.length; n++) {
                b += '<div class="group1 set'+(n+1)+'">';
                    b += '<h3 class="menuset'+(n+1)+'">'+d[n].title+'</h3>';
                    b += '<div class="group2">';
                    for(var m=0; m<d[n].menu.length; m++) {
                        b += '<div class="group3">';
                            b += '<strong>'+(m+1)+'.'+d[n].menu[m].title+'</strong>';
                            var dd = d[n].menu[m].menu; 
                                //console.log( dd );
                            b += '<div class="con con'+(m+1)+'">';
                                b += '<ul>';
                                b += '<a href="" ></a>';
                                    for(var m1=0; m1<dd.length; m1++) {
                                        //console.log( dd[m1].menu.length )
                                        // level3
                                        var ongap = false;
                                        var ex = ( (dd[m1].external==true)?' outlink" target="_blank':'' );
                                        if(dd[m1].menu!=undefined) {
                                            b += '<li><ol class="group">';
                                                b += '<a class="btn-arrow"><span class="img"></span></a>';
                                                b += '<li class="level3 '+_mlink_sideli(dd[m1])+'" ><a class="'+_mlink_checkclass(dd[m1])+'" '+_mlink_link(dd[m1])+'>'+dd[m1].title+'</a></li>';

                                                ongap = true;
                                                for(var m2=0; m2<dd[m1].menu.length; m2++) {
                                                    // level4
                                                    b += '<li class="level4">';
                                                    if(dd[m1].menu[m2].menu!=undefined) {
                                                        b += ''+dd[m1].menu[m2].title+'';
                                                        for(var m3=0; m3<dd[m1].menu[m2].menu.length; m3++) {
                                                            // level5
                                                            b += '<a class="level5 '+_mlink_checkclass(dd[m1].menu[m2].menu[m3])+'" '+_mlink_link(dd[m1].menu[m2].menu[m3])+'>'+dd[m1].menu[m2].menu[m3].title+'</a>';
                                                        }
                                                    } else {
                                                        b += '<a class="'+_mlink_checkclass(dd[m1].menu[m2])+'" '+_mlink_link(dd[m1].menu[m2])+'>'+dd[m1].menu[m2].title+'</a>';
                                                    }
                                                    b += '</li>';
                                                }
                                            b += '</ol>';
                                        } else {
                                            b += '<li class="level3 '+_mlink_sideli(dd[m1])+'" ><a class="'+_mlink_checkclass(dd[m1])+'" '+_mlink_link(dd[m1])+'>'+dd[m1].title+'</a></li>';
                                        }
                                        if(ongap) b += '<span class="gap"></span>';
                                    }
                                b += '</ul>';
                            b += '</div>';
                        b += '</div>';
                    }
                    b += '</div>';
                b += '</div>';
            }
            obj.empty().safeAppend(b);

            // event
        }

    // init
        setTimeout(function() {
            _setmenu( globalmenu );
        }, 500);
}
function _init_fullscreen() {
    $('body').addClass('fullscreen');
    // $('.header').addClass('simplify');
    // $('.footer').addClass('shorten');
    // $('.container').addClass('nopadding');
    $('.header').safeAppend($('.container .title'));
    $('.container>section>.row').safePrepend($('.header .title .tabset'));
}
function _init_form() {
    $('.formblock .row').hide();
    $('.formblock .btn-open').removeClass('btn');
    $('.formblock .btn-open').click(function() {
        if( $('.formblock').hasClass('open') ) {
            $('.formblock').removeClass('open');
            $('.formblock .row').slideUp();
            _s_set('formopen', false);
        } else {
            $('.formblock').addClass('open');
            $('.formblock .row').slideDown();
            _s_set('formopen', true);
        }
    });
    //if(String(_s_get('formopen'))=='true') {
        $('.formblock').addClass('open');
        $('.formblock .row').show();
    //}

    // additional form
        $('.topbtnrow .btn-arrow-prev').click(function() {
            const refPath = document.referrer?new URL(document.referrer).pathname:'';
            const listPath = $('meta[name="path"]').attr('content');
            if(listPath===refPath)
                history.back();
            else
                document.location.href = listPath; 
        });
}
function _init_sticky() {

    //console.log( $('.container').find('h1').length );

    /*
    var tmp = [];
    $('.sticky-top').each(function() {
        $(this).addClass('thehead');
        if( $(this).closest('section').hasClass('narrow') ) {
            $(this).addClass('narrow');
        }
        var obj = $(this).clone();
        if($(this).closest('table').length>0 ) {
            $('.header').append( '<div class="tablebar"></div>' );
            $('.header .tablebar').append(obj); 
        } else {
            if( obj.is('h1') ) {
                obj = '<div class="'+obj.attr('class')+'">'+obj.text()+'</div>';
            }
            if(ontest) {
                $('.header').append( obj );
            }
        }
        $('.header .sticky-top').hide();
        
        if($(this).closest('table').length>0) {
            $(this).find('th').each(function() {
                var n = $(this).width();
                tmp.push(n);
            });
        }
    });
    $('table').scroll(function(e) {
        var ts = $('table').scrollLeft();
        $('header .tablebar').scrollLeft(ts);

        // table header
            if($('.container .hugetable').length>0) {
                $('.hugetable .fixedtop').css({left:-ts});
            }
    });
    $('.hugetable').scroll(function(e) {
        var ts = $('.hugetable').scrollLeft();
        $('header .tablebar').scrollLeft(ts);
    });
    $(window).scroll(function() {
        var st = $(document).scrollTop();
        if(st>$(window).width()*.1) {
            $('.header .sticky-top').show();
            $('.hugetable .fixedtop').show();
        } else {
            $('.header .sticky-top').hide();
            $('.hugetable .fixedtop').hide();
        }

        // table header
            if($('.container .hugetable').length>0) {
                var hty = $('.container .hugetable').position().top+1;
                    hty += $('.container .hugetable').closest('section').position().top;
                    if($('.container section.title').length>0) {
                        hty += $('section.title').height();
                        hty -= 16*2;
                    }
                var tht = st;
                    tht -= hty;
                    tht += ( $('.header').height() + 10 );
                    $('.header .sticky-top').each(function() {
                        tht += $(this).height();
                    });
                    if($(window).width()<641) {
                        tht += $('.header .title').height();
                        tht += 16*1.3;
                    }
                
                    if(!$('body').hasClass('fullscreen')) {
                        if($(window).width()>1700) {
                            tht += 95;
                        } else {
                            tht += 89;
                        }
                    }
                    //console.log( hty, tht);
                    
                $('.hugetable .fixedtop').css({ top:tht });
            }
    });


    _init_table();
    _init_tablesort();
    */
}
function _init_quicktab() {
    // scroll
        // if($(window).width()<641) {
        //     $('.tabset').each(function() {
        //         var tmp = 0;
        //         $(this).find('.tab').each(function() {
        //             tmp += $(this).width();
        //         });
        //         $(this).css({width:tmp});
        //     })
        // }

    // center quicklinkblock
        $('.quicktab_block').find('a').click(function(e) {
            var obj = $('.tablink[data-tab="'+$(this).attr('data-tab')+'"]');
            var y = obj.position().top + 160;
            TweenMax.to($('html,body'), .7, {scrollTop:y, ease:Expo.easeInOut});
            e.preventDefault();
        });

    // with tabcon
        if($('.tabcon').length>0) {
            if($('.tabcon').closest('.chartlistblock').length>0) {
                return;
            }
            $('.tabcon').hide();
            $('.tabcon1').show();
            $('.tabset .tab').click(function(e) {
                var num = $(this).index() + 1;
                $('.tabcon').hide();
                $('.tabcon'+num).fadeIn();
                $('.tabset .tab').removeClass('selected');
                $(this).addClass('selected');
                e.preventDefault();
            });
        }

    // with tabset as quicktab
        if($('.tabset').hasClass('quicktab')) {
            $('.tabset').find('.tab').click(function(e) {
                e.preventDefault();
                //console.log($(this).attr('data-tab'));return;
                var num = $(this).index();
                var obj = $('.tablink[data-tab="'+$(this).attr('data-tab')+'"]');
                var y = obj.position().top + $(window).width()*.1;
                TweenMax.to($('html,body'), .7, {scrollTop:y, ease:Expo.easeInOut});
                $('.tabset .tab').removeClass('selected');
                $('.tabset').each(function() { 
                    $(this).find('.tab').eq(num).addClass('selected');
                });
            });
        }

    // tabset scroll
        $('.title .tabset .tab').css({ width:$(window).width()*.12, width:180 });
        $('.title .tabset').css({overflowX:'auto'});
}
function _init_table() {
    return;
    $('table').each(function() {
        var obj = $(this).clone();
        //$(this).prev().append('<div class="hugetable"></div>');
        //$(this).parent().find('.hugetable').append($(this));
    });
}
function _init_tablesort() {
    function _tcheck() {
        if($('.container').find('table').width() > $('body').width() ) {
            $('.container').find('table').addClass('scroll');
            var obj = $('.hugetable').find('table').find('thead').clone().addClass('fixedtop').hide();
            $('.hugetable').safeAppend(obj);
        } else {
            $('.container').find('table').removeClass('scroll');
        }
        _sethw();
    }
    function _sethw() {
        var tmp = 0;
        var gap = $(window).width()*.011;
            if($(window).width()<641) gap = 13.5;
        $('.hugetable>thead').css({width:$('.hugetable>table').width() });
        $('.hugetable>thead tr').each(function() {
            var obj = $('.hugetable>table>thead>tr').eq($(this).index());
            $(this).find('th').each(function() {
                if($(window).width()<641) {
                    tmp += obj.find('th').eq($(this).index()).width()+gap;
                }
                $(this).css({ width:obj.find('th').eq($(this).index()).width()+gap });
            });
        });
        if($(window).width()<641) {
            $('.hugetable>thead').css({width:tmp });
        }
    }
    $(window).resize(function() {_tcheck();});
    _tcheck();


    // for sort
    // string line
        $('table').each(function() {
            if( $(this).attr('data-string')!=undefined ) {
                var num = $(this).attr('data-string');
                    if($(this).attr('data-string').indexOf(',')>0) 
                        ( $(this).attr('data-string') ).split(',');
                for(var n=0; n<num.length; n++) {
                    $(this).find('tr').each(function() {
                        $(this).find('td,th').eq( num[n]-1 ).addClass('string');
                    });
                }
            }
        });

    // string color
        $('table').each(function() {
            if( $(this).attr('data-color')!=undefined ) {
                var num = ( $(this).attr('data-color') ).split(',');
                    if($(this).attr('data-color').indexOf(',')>0) 
                        ( $(this).attr('data-color') ).split(',');

                for(var n=0; n<num.length; n++) {
                    $(this).find('tr').each(function() {
                        var sstr = Number( $(this).find('td').eq( num[n]-1 ).text() );
                        if(sstr>0) {
                            $(this).find('td,th').eq( num[n]-1 ).addClass('rise');
                        } else {
                            $(this).find('td,th').eq( num[n]-1 ).addClass('drop');
                        }
                    });
                }
            }
        });




    return;
    $('.container').find('table').each(function() {
        var tobj = $(this);
        var oncolumn = 0;
        function _runsort(a, b) {
            if( Object(a[oncolumn]).data === Object(b[oncolumn]).data ) {
                return 0;
            } else {
                return (Object(a[oncolumn]).data < Object(b[oncolumn]).data ) ? -1 : 1;
            }
        }
        function _getd() {
            var tmp = [];
            console.log( tobj.find('tbody tr').length )
            tobj.find('tbody tr').each(function() {
            //if($(this).index()>0) {
                var tmp1 = [];
                $(this).find('td').each(function() {
                    var n = $(this).text().replaceAll(',', '');
                    var tmpd = {
                        type: 'string',
                        data: n,
                    };
                    if( String(Number(n))!='NaN' && !$(this).hasClass('string') ) {
                        n = Number(n);
                        tmpd.type = 'number';
                        tmpd.data = n;
                    }
                    tmp1.push( tmpd );
                });
                tmp.push(tmp1);
            //}
            });
            return tmp;
        }
        function _setformat(input) {
            if( input.type=='number' ) {
                return _formatnumber(input.data);
            } else {
                return input.data;
            }
        }
        function _resettable(d) {
            var count = 0;
            tobj.find('tbody tr').each(function() {
                var dd = d[count];
                //console.log( $(this).index(), dd )
                //if($(this).index()>0) {
                $(this).find('td').each(function() {
                    $(this).text( _setformat(dd[$(this).index()]) );
                });
                //}
                count++;
            });
        }
        $(this).find('th')
            .each(function() {
                $(this).attr('data-sort', '0');
                $(this).addClass('sort');
            })
            .click(function() {
                oncolumn = $(this).index();
                tobj.find('th').removeClass('up');
                tobj.find('th').removeClass('down');
                if($(this).attr('data-sort')==0 || $(this).attr('data-sort')=='up') {
                    $(this).attr('data-sort', 'down');
                    $(this).addClass('down');
                } else {
                    $(this).attr('data-sort', 'up');
                    $(this).addClass('up');
                }
                var d = _getd();
                d.sort(_runsort);
                _resettable(d);
            });
    });
}

function _set_tablesort(obj) {


    // for sort
    // string line
        $(obj).each(function() {
            if( $(this).attr('data-string')!=undefined ) {
                var num = $(this).attr('data-string');
                    if($(this).attr('data-string').indexOf(',')>0) 
                        ( $(this).attr('data-string') ).split(',');
                for(var n=0; n<num.length; n++) {
                    $(this).find('tr').each(function() {
                        $(this).find('td,th').eq( num[n]-1 ).addClass('string');
                    });
                }
            }
        });

    // excute; 
    $(obj).each(function() {
        // preset
            var tobj = $(this);
            var oncolumn = 0;

            function _runsort_textcheck(a, b) {
                var aa = Object(a[oncolumn]).data;
                var bb = Object(b[oncolumn]).data;
                if(aa === 'N/A') { return -1; }
                if(bb === 'N/A') { return 1; }
                if(aa === bb ) {
                    return 0;
                }

                return (aa<bb) ? -1 : 1;
            }
            function _runsort(a, b) {
                var aa = Object(a[oncolumn]).data;
                var bb = Object(b[oncolumn]).data;
                if( String(Number(aa))!='NaN' ) aa = Number(aa);
                if( String(Number(bb))!='NaN' ) bb = Number(bb);
                //console.log( aa, bb , '撠𤩺䲰===>', aa < bb );
                if(aa === bb ) {
                    return 0;
                } else {
                    return (aa<bb) ? -1 : 1;
                }
            }
            function _getd() {
                var tmp = [];
                tobj.find('tbody').find('tr').each(function() {
                    var tmp1 = [];
                    $(this).find('td').each(function() {
                        var n = $(this).text().replaceAll(',', '');
                        var tmpd = {
                            type: 'string',
                            data: n,
                        };
                        tmp1.push( tmpd );
                    });
                    tmp.push(tmp1);
                });
                return tmp;
            }
            function _setformat(input) {
                if( input.type=='number' ) {
                    return _formatnumber(input.data);
                } else {
                    return input.data;
                }
            }
            function _resettable(d) {
                var count = 0;
                tobj.find('tbody').find('tr').each(function() {
                    var dd = d[count];
                    //console.log( $(this).index(), dd )
                    //if($(this).index()>0) {
                    $(this).find('td').each(function() {
                        $(this).text( _setformat(dd[$(this).index()]) );
                    });
                    //}
                    count++;
                });
            }


        // start setting
            $(this).find('th')
                .each(function() {
                    $(this).attr('data-sort', '0');
                    $(this).addClass('sort');
                })
                .click(function() {
                    oncolumn = $(this).index();
                    tobj.find('th').removeClass('up');
                    tobj.find('th').removeClass('down');
                    var direction = 'down';
                    if($(this).attr('data-sort')==0 || $(this).attr('data-sort')=='up') {
                        $(this).attr('data-sort', 'down');
                        $(this).addClass('down');
                        direction = 'down';
                    } else {
                        $(this).attr('data-sort', 'up');
                        $(this).addClass('up');
                        direction = 'up';
                    }
                    var d = _getd();
                        d.sort(_runsort_textcheck);
                        d.sort(_runsort);
                        if(direction=='up') {d.reverse();}

                    _resettable(d);
                });
    });
}
function _init_accessbility() {

    // keys
        let keys = { end:35, home:36, left:37, up:38, right:39, down:40, delete:46, enter:13, space:32};
        let direction = { 37:-1, 38:-1, 39:1, 40:1};

    // default setting
        $(document).on('keydown', function(e) {

            var target = $(e.target);
            var pobj = target.parent();
            var which = e.which;
            var onshift = false;
                if(e.shiftKey) onshift = true;

            // megamenu tab
                if(which==9) {
                    if(target.hasClass('level2') ) {
                        var i = parseInt($(target).index());
                        // console.log( '===TAB��厰枤', 'ON LEVEL2', i );
                        // pobj.find('.tab').removeClass('selected');
                        // pobj.find('.tab'+i).addClass('selected');
                        pobj.parent().find('.con').hide();
                        pobj.parent().find('.con').eq(i).show().find('a').first().focus();
                    }
                    if(target.hasClass('level3') || target.hasClass('level4') || target.hasClass('level5') ) {
                        console.log('ON LEVEL345', pobj.is(':last-of-type') );
                        console.log('�躰ㄐ3');
                    }
                }
                if(which==9 && pobj.is(':last-of-type') ) {
                    //console.log( '===TAB��厰枤', 'ON LEVEL2��敺𣬚�隞�' );
                    if(target.hasClass('level3') || target.hasClass('level4') || target.hasClass('level5') || target.parent().hasClass('ad')  ) {
                        var totalcon = $(target).closest('.megamenu').find('.con').length;
                        var i = parseInt( $(target).closest('.con').attr('data-order') );
                            // console.log('ON LAST LEVEL345���𤌍��滢�滨蔭嚗�', i, '/', totalcon, $(target).attr('class') );
                            // console.log('�躰ㄐ1');
                            if($(target).hasClass('conlast')) {
                                i++;
                                if(i>totalcon) {
                                    // to next nav
                                    // console.log('����𨥈�鐾N LAST CON, TO NEXT NAV');
                                    target.closest('.megamenu').hide();
                                    target.closest('.megamenu').closest('li').next().find('.megamenu').show();
                                    target.closest('.megamenu').closest('li').next().find('.megamenu .con').first().find('a').first().focus();
                                } else {
                                    target.closest('.con').hide();
                                    target.closest('.megamenu').find('.con'+i).show().find('a').first().focus();
                                    target.closest('.megamenu').find('.tabset .tab').removeClass('selected');
                                    target.closest('.megamenu').find('.tabset .tab'+i).addClass('selected');
                                    // console.log('�躰ㄐ2');
                                }
                            }
                    }
                }
                if(which==37 || which==39) {
                    if(target.hasClass('tab') ) {
                        console.log( '===TAB��厰枤', '撌血𢰧�����' );
                        if(which==39) {
                            target.next().focus();
                        }
                        if(which==37) {
                            target.prev().focus();
                        }
                    }
                }

            // megamenu enter
                if(which==13) {
                    //console.log( '===ENTER��厰枤', target.attr('class') );
                    if(target.hasClass('level1')) {
                        $('.header').addClass('hover');
                        $('.header .nav li').removeClass('hover');
                        pobj.addClass('hover');
                        pobj.find('.megamenu .con').hide();
                        pobj.find('.megamenu .con').first().show();
                        pobj.find('.megamenu .con').first().find('a').first().focus();
                        pobj.find('.megamenu').find('a').first().focus();
                        e.preventDefault();
                    }

                    // tab�����
                    if(target.hasClass('level2') || target.hasClass('tab') ) {
                        console.log( '===TAB��厰枤', '�詨�吔�', $(target).index() );
                        pobj.addClass('hover');
                        target.parent().find('a').removeClass('selected');
                        target.addClass('selected');
                        target.closest('.megamenu').find('.con').hide();
                        target.closest('.megamenu').find('.con').eq(target.index()).show();
                        target.closest('.megamenu').find('.con').eq(target.index()).find('a').first().focus();
                        e.preventDefault();
                    }
                    if(target.hasClass('level3') || target.hasClass('level4') || target.hasClass('level5') || target.hasClass('gap') ) {
                        console.log( '===LEVEL 3', '�詨�吔�', $(target).index() );
                        e.preventDefault();  
                    }
                    //if(target.attr('href')=='') e.preventDefault();

                }

        });

}
function _init_faq() {
    if($('.faqblock').length<1) return;
    $('.faqblock .item').each(function() {
        $(this).find('>h3').click(function(e) {
            e.preventDefault();
            if(!$(this).closest('.item').hasClass('open')) {
                $(this).closest('.item').addClass('open');
            } else {
                $(this).closest('.item').removeClass('open');
            }
        });
    });
    // event
    $('.btn-faq-openall').click(function() {
        if(!$('.btn-faq-openall').hasClass('disabled')) {
            $('.btn-faq-openall').addClass('disabled');
            $('.faqblock .item').each(function() {
                $(this).closest('.item').addClass('open');
            });
        } else {
            $('.btn-faq-openall').removeClass('disabled');
            $('.faqblock .item').each(function() {
                $(this).closest('.item').removeClass('open');
            });
        }
    });
    // aslist set
        $('.faqblock .item').each(function() {
            if($(this).find('>.con.aslist').length>0) {
                $(this).find('>a').addClass('withcon');
            }
        });
        $('.faqblock').find('.con.aslist .item a').click(function(e) {
            e.preventDefault();
            if(!$(this).closest('.item').find('>.con.aslist').hasClass('open')) {
                $(this).addClass('open');
                $(this).closest('.item').find('>.con.aslist').addClass('open');
            } else {
                $(this).removeClass('open');
                $(this).closest('.item').find('>.con.aslist').removeClass('open');
            }
        });
}
function _init_history() {
    if($('.btnset-history').length<1) return;
    if($(window).width()<640) {
        $('.btnset-history a').click(function() {
            var num = $(this).index() + 1;
            //console.log( num );
            var topp = $('.history-area'+num).parent().position().top;
                topp += $('.historysidebox').position().top;
                topp += $('.historysidebox').closest('.row').position().top;
                //console.log( topp )
            TweenMax.to($('html,body'), .5, {scrollTop:topp,ease:Expo.easeInOut});
        });
    } else {
        $('.historysidebox .item').hide();
        $('.historysidebox .item').first().fadeIn();
        $('.btnset-history a').first().addClass('selected');
        $('.btnset-history a').click(function() {
            var num = $(this).index() + 1;
            /*
            var topp = $('.history-area'+num).position().top;
                topp += $('.historysidebox').position().top;
                topp += $('.historysidebox').closest('.row').position().top;
            TweenMax.to($('html,body'), .5, {scrollTop:topp,ease:Expo.easeInOut});
            */
            $('.historysidebox .item').hide();
            $('.historysidebox .item').eq(num-1).fadeIn();
            $('.btnset-history a').removeClass('selected');
            $(this).addClass('selected');

        });
    }
}
function _init_btnback() {
    if($('.btn-historyback').length<1) return;
    $('.btn-historyback').click(function(e) {
        e.preventDefault();
        history.back(1);
    });
}
function _init_scroll() {
    //if($(window).width()<641) return;
    $(window).scroll(function() {
        var st = $(document).scrollTop();
            //console.log(st);
        if(st>$(window).height()*.2) {
            $('.header').addClass('fixed');
            if(!$('.header').hasClass('shorten')) {
                $('body').addClass('shorten');
                $('.header').addClass('shorten');

                // if($(window).width()>640) {
                //     TweenMax.fromTo($('.header'), .2, {top:-300}, {top:0, ease:Expo.easeOut});
                // } else {
                //     TweenMax.to($('.header'), 0, {top:0, ease:Expo.easeOut});
                // }
            }
        } else {
            //$('.header').removeClass('shorten');
            if($('.header').hasClass('shorten')) {
                $('body').removeClass('shorten');
                $('.header').removeClass('shorten');

                // if($(window).width()>640) {
                //     TweenMax.to($('.header'), .2, {top:0, ease:Expo.easeIn, onComplete:function() {
                //         $('.header').removeClass('fixed');
                //     } });
                // }
            }
        }


    });
}
function _init_size() {
    /*
    var onm = false;
    $(window).ready(function() {
        if($(window).width()<641) onm = true;
    });
    $(window).resize(function() {
        if($(window).width()<641 && !onm) document.location.reload();
        if($(window).width()>640 && onm) document.location.reload();
    });
    */
}
function _init_share() {
    if($('.shareset').length<1) return;
    var theurl = encodeURIComponent(document.location);
    var title = ((_onlang=='zh-tw')?'�辳PEx霅匧�瑹�瑼航眺鞈�葉敹��� ':'TPEx | ')+$('h1').first().text();
    var msg = $('.maincon p').first().text() +' '+ $('.maincon p').eq(1).text();
        if(msg=='') msg = $('[data-name="content"]').text();

    $('.btn-share-fb').click(function() {
        window.open("http://www.facebook.com/sharer/sharer.php?u="+theurl);
    });
    $('.btn-share-line').click(function() {
        window.open('http://line.me/R/msg/text/?'+theurl);
    });
    $('.btn-share-mail').click(function() {
        window.open('mailto:?subject='+title+'&body='+msg+' '+theurl);
    });

    // preset objid
    $('.pdfobj').attr('id', 'pdfobj');
    $('.btn-share-print').click(function(e) {
        e.preventDefault();
        if($('object').length>0) {
            var doc = document.getElementById('pdfobj');
            window.open($('.pdfobj').attr('data'));
            return;
        } else {
            window.print();
        }
    });
}

function _openv(path) {
    window.open(path);
    return;
    $('.popbox').remove();
    var b = '';
    b += '<div class="popbox pop-video">';
        b += '<div class="btn-close"></div>';
        b += '<div class="conbox">';
            b += '<iframe src="'+path+'?autoplay=1&loop=1&autopause=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
        b += '</div>';
    b += '</div>';
    $('body').safeAppend(b);
    $('.popbox.pop-video').show();
    $('.popbox .btn-close').click(function() {
        $('.popbox').remove();
    });
}
function _openpop_register() {
    var b = $('.popup-register').clone();
    $('.container .popup-register').remove();
    $('.popup-register').remove();
    $('body').safeAppend(b);
    $('.popup-register').show();
    $('.popup-register .btn-close').click(function() {
        $('.popup-register').hide();
    });
}
function _openpop_live() {
    var b = $('.popup-live').clone();
    $('.container .popup-live').remove();
    $('.popup-live').remove();
    $('body').safeAppend(b);
    $('.popup-live').show();
    $('.popup-live .btn-close').click(function() {
        $('.popup-live').hide();
    });
}

















/*


     _             _             _      _       
  __| |_  __ _ _ _| |_   _ _ ___| |__ _| |_ ___ 
 / _| ' \/ _` | '_|  _| | '_/ -_) / _` |  _/ -_)
 \__|_||_\__,_|_|  \__| |_| \___|_\__,_|\__\___|
                                                

                         
*/



var _chartcolor = ['#ffca76','#f89432','gold','lightgreen','lightblue','lightorange','gray','purple','pink', '#f89432'];
var _chartcolor2 = [function({value, seriesIndex, w}) {if(value<0) {return '#009A00'} else {return '#ffca76'}}, '#ce2000'];
var _chartcolor_updown = [function({value, seriesIndex, w}) {if(value<0) {return '#178c17'} else {return '#be2901'}}, '#ffca76'];
var _chartstroke = {curve:'straight',width:[2, 2], };
var _chartdatalabel = {enabled:false,tickAmount:5,};
var _chartannotationlabel = '';
var _chartannotationborder = '#333'; //'#89f089';
var _chartxaxis = {type:'datetime',tickAmount:5,};
var _charttooltip = {x:{format:'yyyy/MM/dd HH:mm'},};
var _chartchart = {type:'area',height:$(window).width()*.2,zoom:{enabled:false},toolbar:{show:false},};


var _stryesterdayvalue;
var _strvalue = ((_onlang=='zh-tw')?'��𣂷漱��煾��(��)':'Value(NTD 100m)');
var _strindex = ((_onlang=='zh-tw')?'瑹�鞎瑟��彍':'TPEx Index');
var _strmore = ((_onlang=='zh-tw')?'�䰻��𧢲凒憭�':'More');
var _stropen = ((_onlang=='zh-tw')?'��讠𥿢':'Open');
var _stryesterday = ((_onlang=='zh-tw')?'�㿥�𤣰':'Yesterday');
var _strhigh = ((_onlang=='zh-tw')?'��擃�':'High');
var _strlow = ((_onlang=='zh-tw')?'��雿�':'Low');
var _strfinal = ((_onlang=='zh-tw')?'��𣂷漱��煾��':'Value');
var _strbillion = ((_onlang=='zh-tw')?'����':'(NTD 100m)');
var _stropenvalue = ((_onlang=='zh-tw')?'��讠𥿢��':'Open Value');
var _strnodata = ((_onlang=='zh-tw')?'蝟餌絞�䰻閰Ｙ�∟����':'No Data Available');
var _strpriceindex = ((_onlang=='zh-tw')?'�寞聢���彍嚗�':'Price Index: ');
var _strreturnindex = ((_onlang=='zh-tw')?'�𤣰��𦠜��彍嚗�':'Return Index: ');
var _strbuysalevalue = ((_onlang=='zh-tw')?'鞎瑁都�𪃾��𣂷漱��(��)嚗�':'Buy & Sale Value: ');


function _setchart_bigchart(obj, d, customh) {
    var h = $(window).width()*.22; /*if(customh!=null) h = $(window).width()*customh;*/
    if($(window).width()<641) h = $(window).width()*1.1;
    var _yaxis = [];
        _yaxis.push({
            tickAmount:5,
            title:{
                text:d.series[0].name,
                style:{fontSize:'0'},
            },
            labels:{
                style:{colors:'#ff7418',fontWeight:'bold',fontSize:'12px',},
                formatter:(value) => { return Number(value).toFixed(1); },
                offsetX:-10,
            },
        });
        if(d.series[1]!=undefined) {
            _yaxis.push({
                tickAmount:5,
                opposite:true,
                min:0,
                title:{
                    style:{fontSize:'0'},
                },
                labels:{
                    style:{colors:'#f89432',xxxfontWeight:'bold',fontSize:'12px',},
                    offsetX:-30,
                    formatter:(value) => { return Number(value).toFixed(0); },
                },
            });
        }

        function _gethigh(d) { 
            var tmp = 0;
            for(var n=0; n<d.length; n++) {
                if(Number(d[n])>tmp) {
                    tmp = d[n];
                }
            }
            return tmp;
        }
        if(d.series[1].data.length<2) {_yaxis[1]['max'] = 5;}
        //console.log( _gethigh(d.series[1].data) )
        if(d.min!=undefined && Number(d.min)!=0) {_yaxis[0]['min'] = Number(d.min);}

    var _stroke = {width:[2,1]};

    var _dailylabel = [];
        for(var t=9; t<14; t++) {
            var endtt = 12;  if(t==13) endtt = 7;
            for(var tt=0; tt<endtt; tt++) {
                var th = String(t); if(th.length==1) th = '0'+t;
                var ttt = tt*5; if(ttt<10) ttt = '0'+tt*5;
                _dailylabel.push(th+':'+ttt);
            }
        }
        if(!d.onhistory) {
            if( d.series[0].data.length<_dailylabel.length ) {
                for(var n=d.series[0].data.length; n<_dailylabel.length; n++) {
                    d.series[0].data.push(null);
                    d.series[1].data.push(null);
                }
            }
            if( d.series[0].data.length>=54 ) {
                //console.log( '�坔�拙�𧢲彍摮埈�𥪜��', d.series[0].data[54], d.series[0].data[55], d.series[0].data[55]==d.series[0].data[54] )
                if( d.series[0].data[54]!=d.series[0].data[55] || d.series[1].data[54]!=d.series[1].data[55] ) {
                    // 撱嗅�峕𤣰�𥿢
                    //console.log('銝滢�璅�');
                    var c1 = d.series[0].data[54];
                    var s1 = d.series[1].data[54];
                    _dailylabel.push('13:33');
                    var tmpobj = $('#'+obj).parent().parent().find('.updatetime span');
                        if(tmpobj.length==0) tmpobj = $('.subinfo .update span');
                    var str = tmpobj.text();
                    tmpobj.text( str.substr(0, str.length-5)+'33:00' );
                } else {
                    //console.log('銝�璅�');
                    d.series[0].data.pop();
                    d.series[1].data.pop();
                }
            }
            //console.log(d.series[0].data.length, _dailylabel)
        }
    
        var _tooltip = {
            hideEmptySeries:false,
            y:{formatter:function(value, { series, seriesIndex, dataPointIndex, w }) {
                        if(value==null) return;
                        return Number(value).toFixed(2);}
                    },
            xxxxcustom:function({ series, seriesIndex, dataPointIndex, w }) {
                const value = series[seriesIndex][dataPointIndex];
                const label = w.globals.labels[dataPointIndex];
                const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                const colors = w.globals.colors;
                const serieLabels = w.globals.seriesNames;
                let serieItems = '';
                let serieTitle=  '<div class="apexcharts-tooltip-title">'+data.x+' ('+label+')</div>';
                series.forEach((array, index) => {
                    let serieValue = array[dataPointIndex];
                    let serieLabel = serieLabels[index];
                    let serieColor = colors[index];
                    if (serieValue && serieValue !== 0) {
                        serieItems +=
                            '<div class="apexcharts-tooltip-series-group apexcharts-active" style="order:'+index+';display:flex;">'+
                            '<span class="apexcharts-tooltip-marker" style="background-color: '+serieColor+';"></span>'+
                            '<div class="apexcharts-tooltip-text">'+ 
                            '<div class="apexcharts-tooltip-y-group">' +
                            '<span class="apexcharts-tooltip-text-y-label">' + serieLabel +':</span>'+
                            '<span class="apexcharts-tooltip-text-y-value">'+serieValue+'</span>'+
                            '</div>'+
                            '</div>'+
                            '</div>';
                    }
                });
                return serieTitle + serieItems;
            }
        };
        if(d.history>0) {
            _tooltip = {
                y:{formatter:function(value, { series, seriesIndex, dataPointIndex, w }) {return Number(value).toFixed(2);}},
            };
        }

    var _xaxislabels = {rotate:0,trim:false,style:{fontSize:'14px',},};
        if($(window).width()<1090) {
            _xaxislabels = {rotate:-45,trim:false,style:{fontSize:'11px',},};
        }

    // construct
        var options = {
            series: d.series,
            chart: {type:'line',width:'100%',xxxheight:h,zoom:{enabled:false},toolbar:{show:false},},
            stroke: _stroke,
            colors:['#ff7418','#ffd18e',],
            yaxis: _yaxis,
            xaxis: {
                tickAmount:8,labels:{format:'HH/mm'},
                labels:_xaxislabels,
                axisTicks:{show:false,},                
            },
            tooltip: _tooltip,
            grid:{padding:{left:0, right:-25, top:0, bottom:0 },},
            legend:{offsetY:5,itemMargin:{horizontal:0,},}
        };
        if($(window).width()<640) {
            options.chart = {height:h,zoom:{enabled:false},toolbar:{show:false}};
        }
        if(!d.onhistory) {
            options.labels = _dailylabel;
            options.annotations = {
                yaxis:[{
                    y:d.yesterday,// * 1.01,
                    borderColor:_chartannotationborder,strokeDashArray:4,
                    // label:{
                    //     borderWidth:0,offsetY:8,offsetX:-10,
                    //     style:{color:'white',background:_chartannotationborder,},
                    //     //text:_stryesterdayvalue + ' ' + d.yesterday,
                    //     text:_stropenvalue,
                    // },
                }],
            }
        } else {
            options.labels = d.label;
        }
        var chart = new ApexCharts(document.querySelector('#'+obj), options);
        chart.render();
        chart.updateOptions({series:d.series});

}
function _setchart(obj, d, customh) {
    var h = $(window).width()*.14; /*if(customh!=null) h = $(window).width()*customh;*/
        if($(window).width()<641) h = $(window).width()*.6;
    var _series;
        if(d.series==undefined) {
            _series = [{name:_strindex,type:'line',data:d.index}];
        } else {
            _series = d.series;
        }
        var _dailylabel = [];
        for(var t=9; t<14; t++) {
            var endtt = 12;  if(t==13) endtt = 7;
            for(var tt=0; tt<endtt; tt++) {
                var th = String(t); if(th.length==1) th = '0'+t;
                var ttt = tt*5; if(ttt<10) ttt = '0'+tt*5;
                _dailylabel.push(th+':'+ttt);
            }
        }

    // construct
        var options = {
            series: _series,
            chart: {type:'line',xxxxheight:h,width:'100%',zoom:{enabled:false},toolbar:{show:false},},
            dataLabels: _chartdatalabel,
            labels: _dailylabel,
            colors: _chartcolor,
            stroke: _chartstroke,
            //annotations: {yaxis:[{borderColor:_chartannotationborder,strokeDashArray:4,/*label:{borderWidth:0,offsetY:6,offsetX:-20,style:{color:'white',background:_chartannotationborder,},text:'��讠𥿢��',},*/y:d.open,}],},
            xaxis: {categories:d.label,tickAmount:5,},
            yaxis: {
                title:{style:{fontSize:0}},
                labels:{style:{colors:'#f89432'},offsetX:-10},
            },
            legend: {offsetY:-10,itemMargin: {horizontal:0,},}
        };
        var chart = new ApexCharts(document.querySelector('#'+obj), options);
        chart.render();
        chart.updateOptions({series:_series});
        $('#'+obj).parent().find('.subinfo .update span').text( d.updatetime );
}
function _setchart_subinfo(obj, d, customh) {
    // infodata
        var c = 'red';
        if(d.rise<0) c = 'green';
        $('#'+obj).parent().find('.chartinfo .current').text(_formatNumber(d.indextop));
        $('#'+obj).parent().find('.chartinfo .updown').text(d.rise).addClass(c);
        $('#'+obj).parent().find('.chartinfo .percent').text(d.ratio+'%').addClass(c);
        $('#'+obj).parent().find('.subinfo .update span').text(d.updatetime);
        $('#'+obj).parent().find('.subinfo .value span').text(d.value+'��');
        if(d.value==null) {
            $('#'+obj).parent().find('.subinfo .value').remove();
        }
}
function _setchart_line(obj, d, customh) {
    var h = $(window).width()*.14; /*if(customh!=null) h = $(window).width()*customh;*/
        if($(window).width()<641) h = $(window).width()*.6;
    // construct
        var options = {
            series: [ {name:'', type:'line', data:d.index} ],
            chart: {type:'line',xxxxheight:h,width:'100%',zoom:{enabled:false},toolbar:{show:false},},
            stroke: {width:[2, 2]},
            colors: _chartcolor2,
            dataLabels: _chartdatalabel,
            labels: d.label,
            xaxis: {type:'datetime',tickAmount:5,},
                grid:{padding:{left:0, right:0, top:0, bottom:0 },},
        };
        var chart = new ApexCharts(document.querySelector('#'+obj), options);
        chart.render();
}
function _setchart_overbuy(obj, d, customh) {
    var h = $(window).width()*.14; /*if(customh!=null) h = $(window).width()*customh;*/
        if($(window).width()<641) h = $(window).width()*.6;
    // construct
        var options = {
            series: [
                {name:'鞎瑁眺頞�(����)', type:'column', data:d.index1},
                {name:'憭抒𥿢���彍', type:'line', data:d.index2}
            ],
            chart: {type:'line',xxxxheight:h,width:'100%',zoom:{enabled:false},toolbar:{show:false},},
            stroke: {width:[0, 2]},
            colors: _chartcolor_updown,
            /*dataLabels: {enabled:true,enabledOnSeries: [1]},*/
            dataLabels: _chartdatalabel,
            labels: d.label,
            //xaxis: {type:'datetime',tickAmount:8,},
                grid:{padding:{left:0, right:0, top:0, bottom:0 },},
        };
        var chart = new ApexCharts(document.querySelector('#'+obj), options);
        chart.render();
}
function _setchart_overbuy_withtext(obj, d, customh) {
    
    var h = $(window).width()*.14; /*if(customh!=null) h = $(window).width()*customh;*/
        if($(window).width()<641) h = $(window).width()*.6;
        //console.log( d.series )
        var _yaxis = [];
            _yaxis.push({
                tickAmount:5,
                labels:{
                    style:{xxxcolors:'#f89432',xxxcolors:'#ff7418',xxxfontWeight:'bold',fontSize:'12px',},
                    xxxxformatter:(value) => { return Number(value).toFixed(1); },
                    offsetX:-10,
                },
                title:{
                    text:d.series[0].name,
                    style:{fontSize:'12px'},
                },
            });
        if(d.series[1]!=undefined && d.series.length!=3) {
            _yaxis.push({
                opposite:true, 
                tickAmount:5,
                labels:{
                    style:{xxxcolors:'#f89432',xxxcolors:'#ff7418',xxxfontWeight:'bold',fontSize:'12px',},
                    xxxxformatter:(value) => { return Number(value).toFixed(1); },
                    offsetX:-10,
                },
                title:{
                    text:d.series[1].name,
                    style:{fontSize:'12px'},
                },
            });
        }
    var _stroke = {width:[0,2]};
        if(d.series.length<2) _stroke = {width:[2,2,0,0]};
        if(_onlang!='zh-tw') {
            if(d.series.length==3 || d.series.length==1) _yaxis[0].labels.offsetX = 0;
        }

    
    function _gethigh(d) { 
        var tmp = 1;
        for(var n=0; n<d.length; n++) {
            if(Number(d[n])>=tmp) {
                tmp = d[n];
            }
        }
        return tmp;
    }
    function _getlow(d) { 
        var tmp = 1000000000000000;
        for(var n=0; n<d.length; n++) {
            if(Number(d[n])<=tmp) {
                tmp = d[n];
            }
        }
        return tmp;
    }

    //console.log( d.series[1] )
    if(d.series.length==4) {
        //console.log( _gethigh(d.series[1].data), _getlow(d.series[1].data) )
        _yaxis[1]['max'] = _gethigh(d.series[1].data);
        _yaxis[1]['min'] = _getlow(d.series[1].data);
    }
    if(d.series.length==3) {
        //console.log( _gethigh(d.series[1].data), _getlow(d.series[1].data) )
        _yaxis[0]['max'] = _gethigh(d.series[0].data);
        _yaxis[0]['min'] = _getlow(d.series[0].data);
    }


    var _chartcolor_updown = [
                function({value, seriesIndex, w}) {if(value<0) {return '#178c17'} else {return '#be2901'}},
                '#ffca76',
                '#ea510f',
                '#08b931'
            ];
            if(d.series.length==3) {
                _chartcolor_updown = [
                    function({value, seriesIndex, w}) {if(value<0) {return '#178c17'} else {return '#be2901'}},
                    '#ea510f',
                    '#08b931'
                ];
            }



    // construct
        var options = {
            series: d.series,
            chart: {type:'line',xxxxheight:h,width:'100%',zoom:{enabled:false},toolbar:{show:false},},
            stroke: _stroke,
            colors: _chartcolor_updown,

            dataLabels: _chartdatalabel,
            labels: d.label,
            yaxis:_yaxis,
            legend:{show:false,},
            tooltip:{
                enabled:true,
                onDatasetHover: {
                    highlightDataSeries:true,
                },
            },
            xaxis: {
                tickAmount:8,
                //labels:{format:'HH/mm'},
                //labels:{rotate:0,trim:false,style:{fontSize:'14px',},},
                axisTicks:{show:false,},
            },
            grid:{padding:{left:0, right:0, top:0, bottom:0 },},
        };
        var chart = new ApexCharts(document.querySelector('#'+obj), options);
        chart.render();


        $('.apexcharts-series path').mouseover(function() {
            var __cccc = String($(this).attr('fill')+'!important');
            //console.log( __cccc, $(this).closest('.apexcharts-canvas').find('.apexcharts-tooltip').find('.apexcharts-tooltip-marker').first().attr('class') );
            $(this).closest('.apexcharts-canvas')
                .find('.apexcharts-tooltip')
                .find('.apexcharts-tooltip-marker')
                .first()
                .safeAppend('<span style="display:block; width:100%; height:100%; position:absolute; top:0; left:0; border-radius:.5em; background:'+__cccc+'"></span>');
               
        });
}
function _setchart_overbuy2(obj, d, customh) {
    var h = $(window).width()*.14; /*if(customh!=null) h = $(window).width()*customh;*/
        if($(window).width()<641) h = $(window).width()*.6;
    // construct
        var options = {
            series: [
                {name:'鞎瑁眺頞�(����)', type:'column', data:d.index1},
            ],
            chart: {type:'line',xxxxheight:h,width:'100%',zoom:{enabled:false},toolbar:{show:false},},
            stroke: {width:[0, 2]},
            colors: _chartcolor_updown,
            /*dataLabels: {enabled:true,enabledOnSeries: [1]},*/
            dataLabels: _chartdatalabel,
            labels: d.label,
            xaxis: {type:'datetime',tickAmount:5,},
                grid:{padding:{left:0, right:0, top:0, bottom:0 },},
        };
        var chart = new ApexCharts(document.querySelector('#'+obj), options);
        chart.render();
}
function _setchart_bar(obj, d, customh) {
    var h = $(window).width()*.14; /*if(customh!=null) h = $(window).width()*customh;*/
        if($(window).width()<641) h = $(window).width()*.6;

        var seriedata = {name:'',type:'column',data:d.index}, ww = [0, 2];
            if(d.asline==true) {
                seriedata = {name:'',type:'line',data:d.index};
                ww = [2];
            }

    // construct
        var options = {
            series: [seriedata],
            chart: {type:'line',xxxxheight:h,width:'100%',zoom:{enabled:false},toolbar:{show:false},},
            stroke: {width:ww},
            colors: _chartcolor2,
            dataLabels: _chartdatalabel,
            yaxis: {tickAmount:5,},
            xaxis: {
                tickAmount:5,labels:{format:'HH/mm'},
                labels:{
                    rotate:0,trim:false,
                    xxxoffsetX:-20,
                    formatter:(value) => { return Number(value).toFixed(2); },
                },
            },
            labels: d.label,
                grid:{padding:{left:0, right:0, top:0, bottom:0 },},
        };
        var chart = new ApexCharts(document.querySelector('#'+obj), options);
        chart.render();
}
function _setchart_bondmline(obj, d, customh) {
    var h = $(window).width()*.14; /*if(customh!=null) h = $(window).width()*customh;*/
        if($(window).width()<641) h = $(window).width()*.6;
    // construct
        var tmp = [];
        for(var n=0; n<d.name.length; n++) {
            tmp.push({
                name:d.name[n], type:'line', 
                data:d['index'+(n+1)],
            });
        }
        var options = {
            series: tmp,
            chart: {type:'line',xxxxheight:h,width:'100%',zoom:{enabled:false},toolbar:{show:false},},
            stroke: {width:[2,2,2,2,2,2,2,2,2,2,2]},
            colors: ['#ffca76','#ff8c00','#ff0e00','#90ee90','#aed8e6','#8c0000','#808080','#800081','#ffc1cc'],
            dataLabels: _chartdatalabel,
            labels: d.label,
            yaxis: {
                tickAmount:5,labels:{format:'HH/mm'},
                title:{rotate:0,xtext:'%',offsetX:10,},
                labels:{
                    rotate:0,trim:false,
                    offsetX:-15,
                    formatter:(value) => { return Number(value*100).toFixed(1)+'%'; },
                },
            },
            xaxis: {
                tickAmount:8,
                labels:{
                    formatter:(value) => { 
                        var mm = value%12;
                        var yy = parseInt(value/12);
                        var tmp = '';
                            if(yy>0) tmp = yy+_stryear;
                            if(mm>0) {
                                tmp += mm+_strmonth;
                            }
                        return tmp;
                    },
                },
            },
            grid:{padding:{left:0, right:0, top:0, bottom:0 },},
        };
        var chart = new ApexCharts(document.querySelector('#'+obj), options);
        chart.render();
}

function _setchart_pre(obj, d) {
    var b = '';
    b += '<strong>���彍嚗�'+d.index+'<span class="change">'+d.change+'</span></strong>';
    b += '<p class="note">鞈��蹱凒�鰵����橒��'+d.time+'</p>';
    $('#'+obj).parent().find('h2').next().safePrepend(b);
    var tmp = 'rise'; if(d.change<0) { tmp = 'drop'; }
    $('#'+obj).parent().find('.change').addClass(tmp);
}
function _setchart_pre2(obj, d) {
    var b = '';
    b += '<strong>'+_strpriceindex+d.pindex+'<span class="change">'+d.pchange+'</span></strong>';
    b += '<strong>'+_strreturnindex+d.gindex+'<span class="change">'+d.gchange+'</span></strong>';
    b += '<strong>'+_strbuysalevalue+d.value+'</strong>';
    $('#'+obj).parent().find('h2').next().safePrepend(b);
    var tmp = 'rise'; if(d.change<0) { tmp = 'drop'; }
    $('#'+obj).parent().find('.change').addClass(tmp);
}

































/*
  _      _ _   
 (_)_ _ (_) |_ 
 | | ' \| |  _|
 |_|_||_|_|\__|
               
*/



var _menulink_tw  = '/data/menu/zh-tw/menu.json';
var _menulink_en  = '/data/menu/en-us/menu.json';
var url = document.location.pathname;
var urlsite = document.location.host;
var _onlang = /^en/i.test(document.documentElement.lang)?'en-us':(/jp/i.test(document.documentElement.lang)?'ja-jp':'zh-tw');
$(document).ready(function() {

    _stryesterdayvalue = ((_onlang=='zh-tw')?'�㿥�𤣰':'Yesterday');
    _strvalue = ((_onlang=='zh-tw')?'��𣂷漱��煾��(����)':'Value(NTD 100m)');
    _strindex = ((_onlang=='zh-tw')?'���彍':'Index');
    _strmore = ((_onlang=='zh-tw')?'�䰻��𧢲凒憭�':'More');
    _stropen = ((_onlang=='zh-tw')?'��讠𥿢':'Open');
    _stryesterday = ((_onlang=='zh-tw')?'�㿥�𤣰':'Yesterday');
    _strhigh = ((_onlang=='zh-tw')?'��擃�':'High');
    _strlow = ((_onlang=='zh-tw')?'��雿�':'Low');
    _strfinal = ((_onlang=='zh-tw')?'��𣂷漱��煾��':'Value');
    _strbillion = ((_onlang=='zh-tw')?'����':'(NTD 100m)');
    _stropenvalue = ((_onlang=='zh-tw')?'��讠𥿢��':'Open Value');
    _strnodata = ((_onlang=='zh-tw')?'蝟餌絞�䰻閰Ｙ�∟����':'No Data Available');
    _strmonth = ((_onlang=='zh-tw')?'�𧢲��':' Month');
    _stryear = ((_onlang=='zh-tw')?'撟�':' Year ');
    _strpriceindex = ((_onlang=='zh-tw')?'�寞聢���彍嚗�':'Price Index: ');
    _strreturnindex = ((_onlang=='zh-tw')?'�𤣰��𦠜��彍嚗�':'Return Index: ');
    _strbuysalevalue = ((_onlang=='zh-tw')?'鞎瑁都�𪃾��𣂷漱��(��)嚗�':'Buy & Sale Value(NTD 100m): ');

    _init_menu();
    _init_form();
    _init_sticky();
    _init_quicktab();
    _init_faq();
    _init_share();
    _init_history();
    _init_btnback();
    _init_size();




});































