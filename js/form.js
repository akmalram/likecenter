/* eslint-disable */

// geo
try {
    $('input[name=city]').autocomplete({
        source: '/geo/autocomplete_base',
        select: function (event, ui) {
            console.log('autocomplete')
            event.preventDefault()
            $(this).val(ui.item.label)
            $('input[name=selected_city]').val(ui.item.lable)
            return false
        },
        focus: function (event, ui) {
            event.preventDefault()
            $(this).val(ui.item.label)
            return false
        }
    })
} catch (err) {
    console.log(err)
}

$("form.formdata").on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var selectEl = document.querySelector('#popup_select');
    var nameEl = document.querySelector('[name="name"]');
    var surnameEl = document.querySelector('[name="surname"]');
    var patronymicEl = document.querySelector('[name="patronymic"]');
    var commentEl = document.querySelector('[name="comment"]');
    var commentEl1 = document.querySelector('[name="comment1"]');
    var commentEl2 = document.querySelector('[name="comment2"]');
    var commentEl3 = document.querySelector('[name="comment3"]');
    var commentEl4 = document.querySelector('[name="comment4"]');
    var commentEl5 = document.querySelector('[name="comment5"]');
    var commentEl6 = document.querySelector('[name="comment6"]');
    var commentEl7 = document.querySelector('[name="comment7"]');
    var commentEl8 = document.querySelector('[name="comment8"]');
    var commentEl9 = document.querySelector('[name="comment9"]');
    var commentEl10 = document.querySelector('[name="comment10"]');
    var commentEl11 = document.querySelector('[name="comment11"]');
    var commentEl12 = document.querySelector('[name="comment12"]');

    //РґР»СЏ РїРѕРїР°РїРѕРІ СЃ СЂР°Р·РЅС‹РјРё РїСЂРѕРґСѓРєС‚Р°РјРё РІ С„РѕСЂРјРµ Рё РїРѕРїР°РїРµ
    // if (selectEl) {
    //   if (selectEl.value == '4171490') {
    //     let productEl = document.querySelector('[name="product_id"]');
    //     productEl.value = '429';

    //     let productIdEl = document.createElement('input');
    //     productIdEl.setAttribute("name","product");
    //     productIdEl.setAttribute("type","hidden");
    //     productIdEl.value = '429';
    //     form[0].appendChild(productIdEl);
    //   }
    //   else if (selectEl.value == '4161862') {
    //     let productEl = document.querySelector('[name="product_id"]');
    //     productEl.value = '430';

    //     let productIdEl = document.createElement('input');
    //     productIdEl.setAttribute("name","product");
    //     productIdEl.setAttribute("type","hidden");
    //     productIdEl.value = '430';
    //     form[0].appendChild(productIdEl);
    //   }
    //   else if (selectEl.value == '4161868') {
    //     let productEl = document.querySelector('[name="product_id"]');
    //     productEl.value = '432';

    //     let productIdEl = document.createElement('input');
    //     productIdEl.setAttribute("type","hidden");
    //     productIdEl.setAttribute("name","product");
    //     productIdEl.value = '432';
    //     form[0].appendChild(productIdEl);
    //   }
    //   else if (selectEl.value == '4161866') {
    //     let productEl = document.querySelector('[name="product_id"]');
    //     productEl.value = '594';

    //     let productIdEl = document.createElement('input');
    //     productIdEl.setAttribute("name","product");
    //     productIdEl.setAttribute("type","hidden");
    //     productIdEl.value = '594';
    //     form[0].appendChild(productIdEl);
    //   }
    // }

    if (nameEl && surnameEl && patronymicEl) {
        nameEl.value = nameEl.value + " " + surnameEl.value + " " + patronymicEl.value;
    }
    if (commentEl && commentEl1 && commentEl2) {
        commentEl.value = commentEl.value + "\n\r " + commentEl1.value + " " + commentEl2.value + " " + commentEl3.value + " " + commentEl4.value +
            " " + commentEl5.value + " " + commentEl6.value + " " + commentEl7.value + " " + commentEl8.value + " " + commentEl9.value + " " + commentEl10.value +
            " " + commentEl11.value + " " + commentEl12.value;
    }
    var formArray = form.serializeArray();
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    var product_id = form.find('select[name="type"] option:selected').data('product') ||
        form.find('[name="product_id"]').val(); // РµСЃР»Рё РЅРµС‚ РїР°РєРµС‚Р° СѓС‡Р°СЃС‚РёСЏ

    var mentoring_type = form.find('select[name="mentor"] option:selected').data('mentoring_type');
    if (mentoring_type != undefined)
        returnArray['mentoring_type'] = mentoring_type;
    returnArray['product'] = product_id;

    var action = form.prop('action');
    var errorblock = form.children('.form__error');

    errorblock.removeClass('active').empty();
    var email = form.find("input[name='email']").val();
    var category = form.find("input[name='site_id']").val();

    try {
        ScarabQueue.push(['setEmail', email]);
        ScarabQueue.push(['cart', []]);
        ScarabQueue.push(['category', category]);
        ScarabQueue.push(['go']);
    } catch (err) {
        console.log(err);
    }

    var btnEl = document.querySelector('.btn.form__btn')
    btnEl.style = "opacity: 0.3; pointer-events: none;"

    $.ajax({
        url: action,
        type: "POST",
        data: returnArray,
        success: function (data) {
            btnEl.style = "opacity: 1; pointer-events: auto;"
            /* if ($('[name=uri]').val() == 'generation') {
                        try {
                            ym(49199431, 'reachGoal', 'generation_filled_lead');
                        } catch (err) {
                            console.log(err);
                        }
                    } */

            if (data.url !== undefined) {
                var currentForm = e.currentTarget;
                var currentFormId = currentForm.getAttribute('id');

                if ($('button.modal__button').length == 0 || currentFormId === 'second-form') {
                    window.location.href = '/' + data.url;
                } else {
                    $('button.modal__button').attr('href', '/' + data.url);
                }
                return false;
            }

            form.fadeOut();
            $("form.smsValidate").fadeIn();

            // $('.form__block_code').addClass('active');

        },
        error: function (errors) {
            btnEl.style = "opacity: 1; pointer-events: auto;"
            var errorlist = JSON.parse(errors.responseText).errors;

            errorblock.addClass('active');
            for (var err in errorlist) {
                if (errorlist.hasOwnProperty(err)) {
                    errorblock.append("<p class='form__error-text'>" + errorlist[err][0] + "</p>");
                }
            }

        }
    });
});

$('button.modal__button').click(function () {
    var data = {};
    data._token = $('[name="csrf-token"]').attr('content');
    data.package = $(this).data('package');
    data.link = $(this).attr('href');

    console.log(data);
    if (data.package == undefined)
        return false;

    $.ajax({
        url: "/lead/1",
        type: "PUT",
        data: data,
        success: function (res) {
            console.log(res);
            if (res && res.url) {
                $('button.button_pay').attr('href', '/' + (res.url).slice(1));
            }
        },
        error: function (errors) {

        }
    });
});

$('button.button_pay').click(function () {
    window.location.href = location.origin + $(this).attr('href');
});

$("form.refdata").on("submit", function (e) {
    e.preventDefault();
    var form = $(this);

    $('#send_ref').find('[type="button"]').replaceWith('<div><em>РѕС‚РїСЂР°РІРєР°...</em></div>');
    var action = form.prop('action');
    var formParams = form.serialize();
    var errorblock = form.children('.form__error');

    errorblock.removeClass('active').empty();

    $.ajax({
        url: action,
        type: "POST",
        data: formParams,
        success: function (data) {
            var optionsUser = {
                'expires': (new Date).getTime() + (30 * 24 * 60 * 60 * 1000),
                'domain': '.' + document.location.hostname,
                'path': '/'
            };

            if (data.ref_id) setCookie('referer_id_22', data.ref_id, optionsUser);

            var msg = data.ref_id ? '<span>Р’С‹ СѓСЃРїРµС€РЅРѕ Р·Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°Р»РёСЃСЊ</span><br>Р’Р°С€Р° СѓРЅРёРєР°Р»СЊРЅР°СЏ СЃСЃС‹Р»РєР° РґР»СЏ РїСЂРёРіР»Р°С€РµРЅРёСЏ РґСЂСѓР·РµР№, СЃРєРѕРїРёСЂСѓР№С‚Рµ РґР°РЅРЅС‹Рµ Рє СЃРµР±Рµ: ' + location.origin + '/' + data.type + '?referer_id=' + data.ref_id + '<br><div style="magrin-top:5%;"> Р’Р°С€ СѓРЅРёРєР°Р»СЊРЅС‹Р№ id РґР»СЏ РїСЂРѕРІРµСЂРєРё: ' + data.ref_id + '</div>' :
                '<span>Р’С‹ СѓР¶Рµ СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°Р»РёСЃСЊ СЂР°РЅРµРµ!</span>';

            $('#ref_result').html(msg);

            jQuery(function ($) {
                $(document).mouseup(function (e) {
                    var div = $("#ref_result");
                    if (!div.is(e.target) && div.has(e.target).length === 0) {
                        location.reload();
                    }
                });
            });

            $('.wrapper, .thnx').fadeIn(300);
            $('.z-box').fadeOut(300);
            $('body').css('overflow', 'auto');
        },

        error: function (errors) {
            var errorlist = errors.responseJSON.errors;
            errorblock.addClass('active');
            for (var err in errorlist) {
                if (errorlist.hasOwnProperty(err)) {
                    errorblock.append("<p class='form__error-text'>" + errorlist[err][0] + "</p>");
                }
            }
        }
    });

    return false;
});

$("form.smsValidate").on("submit", function (e) {
    e.preventDefault();
    var form = $(this);
    var formParams = form.serialize();
    var action = form.prop('action');
    var errorblock = form.children('.form__error');

    errorblock.removeClass('active').empty();
    $.ajax({
        url: action,
        type: "POST",
        data: formParams,
        success: function (data) {

            if (data.success == true) {
                window.location.replace(data.url);
            }
        },
        error: function (errors) {
            var errorlist = errors.responseJSON.errors;
            errorblock.addClass('active');
            for (var err in errorlist) {
                if (errorlist.hasOwnProperty(err)) {
                    errorblock.append("<p class='form__error-text'>" + errorlist[err][0] + "</p>");
                }
            }

        }
    });
});

$(".promocode-label").click(function () {
    $(this).children().children('span').addClass('hidden');
    $(this).children().children('input').removeClass('hidden');
});

(function () {
    window.mentoring_type = $('select[name="mentor"] option');
    if ($("[name='product']").val() !== undefined) {
        window.ids = JSON.parse($("[name='product']").val());
    }

    if (window.ids !== undefined) {
        var token = $('[name="_token"]').val();

        $.ajax({
            url: "/products",
            type: "POST",
            data: {
                product_id: window.ids,
                _token: token
            },
            success: function (data) {
                window.pricelist = data;
                addProducts($("[name='city']"));
            }
        });
    }

    $("[name='city']").on('input propertychange focusout', function (e) {
        addProducts($(this));
        mentorByCity();
    });


    function addProducts(context) {
        // СЌС‚Рѕ РґР»СЏ СЃР»СѓС‡Р°СЏ, РµСЃР»Рё Сѓ РїСЂРѕРґСѓРєС‚Р° РЅРµС‚ РїР°РєРµС‚Р° СѓС‡Р°СЃС‚РёСЏ
        if (window.pricelist.length === 0) {
            var products = $('[name="product"]').val();
            var product_id = JSON.parse(products)[0];
            //$('form.formdata').find('select').remove().parent('div').remove();
            $('form.formdata').append('<input type="hidden" name="product_id" value="' + product_id + '">');
            return false;
        }

        var selected = false;
        var city = context.val().toLowerCase();

        if (city === 'РјРѕСЃРєРІР°') {
            $('select[name="type"]').empty().append('<option disabled>РџР°РєРµС‚ СѓС‡Р°СЃС‚РёСЏ</option>');
            for (var i = 0; i < window.pricelist.length; i++) {
                if (window.pricelist[i].moscow === true) {
                    // if (window.ids.length == 1)
                    //     var name = window.pricelist[i].amo_type_name;
                    // else
                    //     var name = window.pricelist[i].product_name + ' ' + window.pricelist[i].amo_type_name + ' вЂ” ' + window.pricelist[i].price + ' в‚Ѕ';

                    var name = window.pricelist[i].product_name;
                    // РґР»СЏ РІС‹РІРѕРґР° РїР°РєРµС‚Р° СЃС‚Р°РЅРґР°СЂС‚, РµСЃР»Рё РµСЃС‚СЊ РјРёРЅРёРјР°Р»СЊРЅС‹Р№
                    if (window.pricelist[i].product_id == 546) {
                        if (window.pricelist[i].amo_type_id == 4161862 && selected == false) {
                            selected = true;
                            var sel = ' selected="selected"';
                        }
                    } else if (window.pricelist[i].product_id == 599) {
                        if (window.pricelist[i].amo_type_id == 4171490 && selected == false) {
                            selected = true;
                            var sel = ' selected="selected"';
                        }
                    } else {

                        if (selected == false && (window.pricelist[i].amo_type_id == 4171490 || window.pricelist[i].amo_type_id == 4161862)) {
                            selected = true;
                            var sel = ' selected="selected"';
                        } else {
                            var sel = '';
                        }
                    }
                    $('select[name="type"]').append('<option value="' + window.pricelist[i].amo_type_id +
                        '" data-product="' + window.pricelist[i].product_id + '"' + sel + '>' + name + '</option>');
                    var sel = '';
                }
            }
        } else {
            $('select[name="type"]').empty().append('<option disabled>РџР°РєРµС‚ СѓС‡Р°СЃС‚РёСЏ</option>');
            var options = [];
            for (var i = 0; i < window.pricelist.length; i++) {
                if (window.pricelist[i].moscow === false) {
                    options = window.pricelist;
                    options = options.reduce((acc, item) => {
                        const findedItem = acc.find(el => el.city === item.city);

                        if (!findedItem) {
                            const value = Object.assign({}, item);
                            delete value.city;
                            const newItem = {
                                city: item.city,
                                values: [value]
                            };
                            acc.push(newItem);
                        } else {
                            const value = Object.assign({}, item);
                            delete value.city;
                            findedItem.values.push(value);
                        }

                        return acc
                    }, [])

                }


                var cityRegex = new RegExp(city, "i");
                var filteredOptions = options.filter(item => {
                    if (item.city && city) {
                        return item.city.match(cityRegex);
                    }
                })


                if (!filteredOptions.length) {
                    filteredOptions = options.filter(item => !item.city)
                }
            }

            filteredOptions.forEach(item => {
                item.values.forEach(li => {
                    if (li.moscow) {
                        return;
                    }
                    if (window.ids.length == 1) {
                        if (selected == false && (li.amo_type_id == 4171490 || li.amo_type_id == 4161862)) {
                            selected = true;
                            var sel = ' selected="selected"';
                        } else {
                            var sel = '';
                        }
                        var text = `<option value="${li.amo_type_id}" data-product="${li.product_id}" ${sel}>${li.product_name}</option>`;
                    } else
                        var text = `<option value="${li.amo_type_id}" data-product="${li.product_id}">${li.product_name}</option>`;
                    $('select[name="type"]').append(text);
                })
            })
        }
    }


    var mentorLfFreeMentors = [
        'РќР°РіРѕСЂРЅС‹Р№',
        'РЎСѓС…Р°РЅРѕРІР°',
        'Р‘РѕРЅРґР°СЂС‡СѓРє',
        'РЁСѓСЃС‚РѕРІ',
        'Р‘Р°РґСЊРёРЅР°',
        'РЎРјРёСЂРЅРѕРІ',
        'Р“РѕСЂР±СѓРЅРѕРІ',
        'РўСЋС‚СЋРЅРѕРІР°',
        'РЈР»СЊРјР°РЅ',
        'РҐР»СЋСЃС‚РѕРІ',
        'Р’РµР±РµСЂ'
    ]

    var mdFinishMentors = [
        'РљРѕР±РµР»СЋРє',
        'РџРѕР»СЏРєРѕРІР°',
        'РљСѓР·РЅРµС†РѕРІР°',
        'РЎРѕРєРѕР»РѕРІ',
        'РЎСѓС„СЊСЏРЅРѕРІ',
        'РўРёС…РѕРЅРѕРІР°',
        'Р’РµСЂРµРіРёРЅ',
        'РљСЂСЋРєРѕРІ',
        'РђРЅС‚РёРїРѕРІ',
        'РЁРµРІРЅРёРЅ',
        'РђСЋРїРѕРІ',
        'РђС‰РµРїРєРѕРІ',
        'РЎРёРІРѕР¶РµР»РµР·РѕРІ',
        'РҐР°Р»РёРјРѕРІ',
        'Р›СЏС†РєРёР№',
        'РЎРјРёСЂРЅРѕРІ',
        'Р“Р°СЂРёРїРѕРІР°',
        'Р”РµСЂРµРµРІ',
        'РќР°РіРѕСЂРЅС‹Р№',
        'РЎРѕР»РѕРїРѕРІ',
        'РЎР°РјСЃРѕРЅРѕРІ',
        'Р’РµР»РёС‡РєРѕ',
        'Р СЏР±РѕРІ',
        'РЎСѓС…Р°РЅРѕРІР°',
        'РЈСЂР°Р·РёРЅР±РµС‚РѕРІ',
        'Р РµРґС‡РµРЅРєРѕ',
        'Р”Р¶Р°РЅР°Р±Р°РµРІР°',
        'Р Р°СЃС‰СѓРїРєРёРЅ',
        'РЎРєСѓР№Р±РµРґР°',
        'Р“Р°СЂРјР°РµРІР°',
        'РљСѓР·РЅРµС†РѕРІР°',
        'РҐР°СЂРёРЅ',
        'РЁРµРІС‡СѓРє',
        'РўСѓР»Р°СЃС‹РЅРѕРІР°',
        'Р“Р°Р»РёРјРѕРІ',
        'РЎРјРёСЂРЅРѕРІР°',
        'РњРёС„С‚Р°С…РѕРІР°',
        'РҐСѓРґРѕР»РѕР¶РєРёРЅР°',
        'Р“Р°Р№РґСѓР»Р»РёРЅ',
        'РҐР°РЅР°С„РёРЅ',
        'Р§РµСЂРЅРѕСЏСЂРѕРІР°',
        'РќРёРєСѓР»РёРЅ',
        'Р•СЂС€РѕРІ',
        'РђР»РµРєСЃРµРµРІ',
        'РЎРѕРєРѕР»РѕРІ',
        'РђРЅС‚РёРїРѕРІ',
        'РЎСѓС„СЊСЏРЅРѕРІ',
        'РџРѕР»СЏРєРѕРІР°',
        'РќРёРєРѕРЅРѕСЂРѕРІР°',
        'РќР°Р±РёСѓР»Р»РёРЅ',
        'РўРёС…РѕРЅРѕРІР°',
        'Р—Р°РєРѕРјРѕСЂРЅС‹Р№',
        'РљСѓР·РЅРµС†РѕРІР°',
        'Р‘Р°Р»РѕР±Р°РЅРѕРІР°',
        'Р”РѕРєРёРЅ',
        'Р›РѕС€Р°РєРѕРІ',
        'РҐР°Р»РёРјРѕРІ',
        'Р›СЏС†РєРёР№',
        'РЎРјРёСЂРЅРѕРІ',
        'Р“Р°СЂРёРїРѕРІР°',
        'Р”РµСЂРµРµРІ',
        'РќР°РіРѕСЂРЅС‹Р№',
        'РЈСЂР°Р·РёРЅР±РµС‚РѕРІ',
        'Р“Р°СЂРјР°РµРІР°',
        'Р§РµСЂРЅРѕСЏСЂРѕРІР°',
        'РќРёРєСѓР»РёРЅ',
        'Р‘РµСЂРµСЃС‚РѕРІ',
        'РљРѕРЅРґР°РєРѕРІ',
        'РђСЂР°Р»РѕРІ',
        'РљР°СЂРїСѓС…РёРЅ',
        'РљР°Р·Р°С‡РµРЅРєРѕ',
        'Р‘Р°СЂР°РЅРѕРІР°',
        'РЎР°Р±СѓСЂРѕРІР°'
    ]

    var sigleMentors = [
        'РљРѕР±РµР»СЋРє',
        'РџРѕР»СЏРєРѕРІР°',
        'РљСѓР·РЅРµС†РѕРІР°',
        'РЎРѕРєРѕР»РѕРІ',
        'РЎСѓС„СЊСЏРЅРѕРІ',
        'РўРёС…РѕРЅРѕРІР°',
        'Р’РµСЂРµРіРёРЅ',
        'РљСЂСЋРєРѕРІ',
        'РђРЅС‚РёРїРѕРІ',
        'РЁРµРІРЅРёРЅ',
        'РђСЋРїРѕРІ',
        'РђС‰РµРїРєРѕРІ',
        'РЎРёРІРѕР¶РµР»РµР·РѕРІ',
        'РҐР°Р»РёРјРѕРІ',
        'Р›СЏС†РєРёР№',
        'РЎРјРёСЂРЅРѕРІ',
        'Р“Р°СЂРёРїРѕРІР°',
        'Р”РµСЂРµРµРІ',
        'РќР°РіРѕСЂРЅС‹Р№',
        'РЎРѕР»РѕРїРѕРІ',
        'РЎР°РјСЃРѕРЅРѕРІ',
        'Р’РµР»РёС‡РєРѕ',
        'Р СЏР±РѕРІ',
        'РЎСѓС…Р°РЅРѕРІР°',
        'РЈСЂР°Р·РёРЅР±РµС‚РѕРІ',
        'Р РµРґС‡РµРЅРєРѕ',
        'Р”Р¶Р°РЅР°Р±Р°РµРІР°',
        'Р Р°СЃС‰СѓРїРєРёРЅ',
        'РЎРєСѓР№Р±РµРґР°',
        'Р“Р°СЂРјР°РµРІР°',
        'РҐР°СЂРёРЅ',
        'РЁРµРІС‡СѓРє',
        'РўСѓР»Р°СЃС‹РЅРѕРІР°',
        'Р“Р°Р»РёРјРѕРІ',
        'РЎРјРёСЂРЅРѕРІР°',
        'РњРёС„С‚Р°С…РѕРІР°',
        'РҐСѓРґРѕР»РѕР¶РєРёРЅР°',
        'Р“Р°Р№РґСѓР»Р»РёРЅ',
        'РҐР°РЅР°С„РёРЅ',
        'Р§РµСЂРЅРѕСЏСЂРѕРІР°',
        'РќРёРєСѓР»РёРЅ',
        'Р•СЂС€РѕРІ',
        'РђР»РµРєСЃРµРµРІ',
        'РЎРѕРєРѕР»РѕРІ',
        'РџРѕР»СЏРєРѕРІР°',
        'РќРёРєРѕРЅРѕСЂРѕРІР°',
        'РќР°Р±РёСѓР»Р»РёРЅ',
        'РўРёС…РѕРЅРѕРІР°',
        'Р—Р°РєРѕРјРѕСЂРЅС‹Р№',
        'РљСѓР·РЅРµС†РѕРІ',
        'Р‘Р°Р»РѕР±Р°РЅРѕРІР°',
        'Р‘Р°Р»РѕР±Р°РЅРѕРІ',
        'Р”РѕРєРёРЅ',
        'Р›РѕС€Р°РєРѕРІ',
        'РҐР°Р»РёРјРѕРІ',
        'Р›СЏС†РєРёР№',
        'РЎРјРёСЂРЅРѕРІ',
        'Р“Р°СЂРёРїРѕРІР°',
        'Р”РµСЂРµРµРІ',
        'РЈСЂР°Р·РёРЅР±РµС‚РѕРІ',
        'Р“Р°СЂРјР°РµРІР°',
        'Р§РµСЂРЅРѕСЏСЂРѕРІР°',
        'Р‘РµСЂРµСЃС‚РѕРІ',
        'РљРѕРЅРґР°РєРѕРІ',
        'РђСЂР°Р»РѕРІ',
        'РљР°СЂРїСѓС…РёРЅ',
        'РљР°Р·Р°С‡РµРЅРєРѕ',
        'Р‘Р°СЂР°РЅРѕРІР°',
        'РЎР°Р±СѓСЂРѕРІР°',
        'РђСЂРјР°РіР°РЅРѕРІ',
        'РЎР°Р±СѓСЂРѕРІР°',
        'Р‘РѕС‡РєР°СЂРµРІ',
        'Р‘СѓС€СѓРµРІ',
        'РЎР°Р±СѓСЂРѕРІР°',
        'Р’Р°Р»РµРµРІР°',
        'Р’РµР±РµСЂ',
        'Р“СѓР»РµРІРёС‡',
        'Р“СѓСЃР°РєРѕРІ',
        'Р•Р»РёСЃРµРµРІ',
        'РњР°РєР°СЂРѕРІ',
        'РњР°С‚СЋС€РєРёРЅ',
        'РњРёРЅР°РµРІ',
        'РќРѕРІРёРєРѕРІ',
        'РџРµРЅРєРёРЅ',
        'РЎРєРІРѕСЂС†РѕРІ',
        'РўРµР»СЏС€РѕРІР°',
        'РҐРІРѕСЃС‚РёРєРѕРІ',
        'РЁР°РєРёСЂРѕРІР°',
        'Р‘Р°Р№СЃР°СЂРµРЅРѕРІ',
        'РњР°Р»СЊС‡СѓРє',
        'Р‘Р°СЂРёРЅРѕРІ',
        'Р§Р°Р№РєР°',
        'Р“Р°С‚Р°СѓР»Р»РёРЅР°',
        'Р–СѓСЂР°РІР»РµРІ',
        'РЈР»СЊРјР°РЅ',
        'РўРёРјРѕС€РµРЅРєРѕ',
        'РќРµР·РЅР°РЅРѕРІ',
        'Р РѕР¶РѕРє',
        'Р‘Р°РґСЊРёРЅР°',
        'Р”РѕСЂРѕС…РѕРІ',
        'Р›РѕР±РµРЅРєРѕ',
        'Р¤С‘РґРѕСЂРѕРІС‹С…',
        'РўСЋС‚СЋРЅРѕРІР°',
        'РЎСѓР»РµР№РјР°РЅРѕРІ',
        'Р‘СЂР°РіРёРЅ',
        'Р§РµР±СѓРЅРёРЅ',
        'Р•РІСЃРµРµРІ',
        'РћРІС‡РёРЅРЅРёРєРѕРІР°',
        'РђР±Р°СЃРѕРІ',
        'Р’РёРЅРѕРіСЂР°РґРѕРІР°',
        'Р“Р°Р±РѕРІ',
        'РќРёРєРёС„РѕСЂРѕРІ',
        'Р—Р°РєРµСЂСЊСЏРµРІ',
        'Р“Р°Р»РєРёРЅР°',
        'РџР°Р»Р°С€РєРёРЅ',
        'Р§СѓРјР°РєРѕРІ',
        'РљРѕРјСЏРіРёРЅ',
        'Р¤РѕР»РёРЅ',
        'Р С‹Р±Р°РєРѕРІР°',
        'Р“РѕСЂР±СѓРЅРѕРІ',
        'РљРѕРІР°Р»СЊ',
        'РќРёРєСѓР»РёРЅР°',
        'РЎСѓС…Р°РЅРѕРІР°',
        'Р СЏР±РёРЅРёРЅ',
        'РЁСѓСЃС‚РѕРІ',
        'Р’РµСЂРѕРЅ',
        'РҐРІР°С‚СЃРєРѕРІР°',
        'РҐР°РјРёРґ',
        'РСЂРєРµРЅ',
        'Р’Р°Р»РµРµРІР°',
        'РџР°РїСѓР»РѕРІ',
        'РўСЂСѓР±РЅРёРєРѕРІ'
    ]

    var mentorVipMentors = [
        'РђР»РµРєСЃРµРµРІ',
        'РђС‰РµРїРєРѕРІ',
        'РђСЋРїРѕРІ',
        'РљСЂСЋРєРѕРІ',
        'РЎРѕРєРѕР»РѕРІ',
        'РђРЅС‚РёРїРѕРІ',
        'РЎСѓС„СЊСЏРЅРѕРІ',
        'Р—Р°РєРѕРјРѕСЂРЅС‹Р№'
    ]

    var armyMentors = ['Р›РѕС€Р°РєРѕРІ', 'РЎРєСѓР№Р±РµРґР°', 'РЎРѕРєРѕР»РѕРІ']

    var mentorOfferMentors = [
        'РџРѕР»СЏРєРѕРІР°',
        'РќРёРєРѕРЅРѕСЂРѕРІР°',
        'РќР°Р±РёСѓР»Р»РёРЅ',
        'РўРёС…РѕРЅРѕРІР°',
        'РљСѓР·РЅРµС†РѕРІР°',
        'Р‘Р°Р»РѕР±Р°РЅРѕРІР°',
        'Р”РѕРєРёРЅ',
        'Р›РѕС€Р°РєРѕРІ',
        'РҐР°Р»РёРјРѕРІ',
        'Р›СЏС†РєРёР№',
        'РЎРјРёСЂРЅРѕРІ',
        'Р“Р°СЂРёРїРѕРІР°',
        'Р”РµСЂРµРµРІ',
        'РќР°РіРѕСЂРЅС‹Р№',
        'РЈСЂР°Р·РёРЅР±РµС‚РѕРІ',
        'РЎСѓР»РµР№РјР°РЅРѕРІ',
        'РҐР°СЂРёРЅ',
        'РЁРµРІС‡СѓРє',
        'РҐСѓРґРѕР»РѕР¶РєРёРЅР°',
        'РҐР°РЅР°С„РёРЅ',
        'Р“Р°СЂРјР°РµРІР°',
        'Р§РµСЂРЅРѕСЏСЂРѕРІР°',
        'РќРёРєСѓР»РёРЅ',
        'Р•СЂС€РѕРІ',
        'Р‘РµСЂРµСЃС‚РѕРІ',
        'РљРѕРЅРґР°РєРѕРІ',
        'РђСЂР°Р»РѕРІ',
        'РљР°СЂРїСѓС…РёРЅ',
        'РљР°Р·Р°С‡РµРЅРєРѕ',
        'Р‘Р°СЂР°РЅРѕРІР°',
        'РЎР°Р±СѓСЂРѕРІР°'
    ]

    var MENTORS_DICTIONARY = {
        mdfinish: mdFinishMentors,
        mentor_nikonorova1207: ['РќРёРєРѕРЅРѕСЂРѕРІР°'],
        mentor_single: sigleMentors,
        mentorlf_free: mentorLfFreeMentors,
        mentor_vip: mentorVipMentors,
        mentor_army: armyMentors,
        mentor_web1508: ['РЎРѕРєРѕР»РѕРІ'],
        mentor_ind: 'all',
        mentor_offer: mentorOfferMentors
    }

    mentorByCity();

    /*
        TODO: СѓСЃРєРѕСЂРёС‚СЊ РІС‹РїРѕР»РЅРµРЅРёРµ СЌС‚РѕР№ С„СѓРЅРєС†РёРё
              РІС‹РЅРµСЃС‚Рё РјРµРЅС‚РѕСЂРѕРІ РёР· СЌС‚РѕРіРѕ РґРѕРєСѓРјРµРЅС‚Р°
    */
    function mentorByCity() {
        if (window.mentoring_type && window.mentoring_type.length > 0) {
            var city = $('[name="city"]').val();
            $('select[name="mentor"]').empty();
            $('select[name="mentor"]').append('<option disabled>РІС‹Р±РµСЂРёС‚Рµ РЅР°СЃС‚Р°РІРЅРёРєР°</option>');
            var currentDomain = location.pathname

            for (var i = 0; i < mentoring_type.length; i++) {
                var currentMentorOptionEl = mentoring_type[i]
                var currentMentor = currentMentorOptionEl.innerHTML

                var isDataForUri = function (uri) {
                    var currentUri = uri
                    return function (current) {
                        return isMentorsForUri(currentUri, current)
                    }
                }

                var isDataForUriAndMentor = isDataForUri(currentDomain)
                var isMentorData = isDataForUriAndMentor(currentMentor)

                if (mentoring_type[i].dataset.mentoring_type) {

                    var commonAllowedUris = [{
                            uri: '/mentor_sell'
                        },
                        {
                            uri: '/mdfinish'
                        },
                        {
                            uri: '/mentor_nikonorova1207'
                        },
                        {
                            uri: '/mentor_single'
                        },
                        {
                            uri: '/mentor_vip'
                        },
                        {
                            uri: '/mentor_army'
                        },
                        {
                            uri: '/mentor_web1508'
                        },
                        {
                            uri: '/mentor_offer'
                        },
                        {
                            uri: '/mentorlf_free',
                            marker: 'РіСЂСѓРїРїРѕРІРѕРµ'
                        },
                        {
                            uri: '/mentor_ind',
                            marker: 'РёРЅРґРёРІРёРґ'
                        }
                    ]

                    if (isMentorData) {
                        var isUriAllowed = commonAllowedUris.find(function (item) {
                            return item.uri === currentDomain
                        })
                        var isRegex = isUriAllowed && isUriAllowed.marker
                        var isRegexAllowed = !isRegex || (isRegex && checkGlobalMatch(isUriAllowed.marker, currentMentor))

                        if (isUriAllowed && isRegexAllowed) addMentorToSelect(currentMentorOptionEl)
                    }
                }
            }
        }


    }

    function isItemsContainsTarget(itemsToFind, target) {
        if (itemsToFind === 'all') {
            return true
        }

        return itemsToFind.reduce((acc, item) => {
            var isMatch = checkGlobalMatch(item, target)
            if (isMatch) {
                acc.push(item)
            }
            return acc
        }, []).length
    }

    function checkGlobalMatch(valueToFind, target) {
        var regExp = new RegExp(valueToFind, 'i')

        return target.match(regExp)
    }

    function getTargetMentorsByUri(uri) {
        var mentors = MENTORS_DICTIONARY[uri.replace('/', '')]

        if (!mentors || !mentors.length) console.log(`РќРµ СѓРєР°Р·Р°РЅС‹ РјРµРЅС‚РѕСЂС‹ РґР»СЏ uri: ${uri.replace('/', '')}`)
        return mentors || []
    }

    function isUri(uri) {
        return location.pathname.includes(uri)
    }

    function addMentorToSelect(mentor) {
        $('select[name="mentor"]').append(mentor);
    }

    function isMentorsForUri(uri, current) {
        var targetMentors = getTargetMentorsByUri(uri)
        var matches = isItemsContainsTarget(targetMentors, current)

        return isUri(uri) && matches
    }
})();