/* eslint-disable */
var $_GET = parseGet();

var t = getCookie('_ga') || false;

contents = {
    version: '',
    domainDepth: '',
    cid: ''
};

if (t) {
    var paramsList = t.split('.');

    contents.version = paramsList[0] ? paramsList[0] : '';
    contents.domainDepth = paramsList[1] ? paramsList[1] : '';
    contents.cid = paramsList[2] && paramsList[3] ? paramsList[2] + '.' + paramsList[3] : '';
}

// Scarab (Emarsys?)
var ScarabQueue = ScarabQueue || [];
(function (id) {
    if (document.getElementById(id)) return
    var js = document.createElement('script')
    js.id = id
    js.src = 'https://cdn.scarabresearch.com/js/192C0E93A6D94DC6/scarab-v2.js'
    var fs = document.getElementsByTagName('script')[0]
    fs.parentNode.insertBefore(js, fs)
})('scarab-js-api')

$('form').each(function () {
    $(this).append(
        '<input type="hidden" name="url" value="' +
        document.location.href +
        '">' +
        '<input type="hidden" name="sb_first_src" value="">' +
        '<input type="hidden" name="sb_first_mdm" value="">' +
        '<input type="hidden" name="sb_first_cmp" value="">' +
        '<input type="hidden" name="sb_current_src" value="">' +
        '<input type="hidden" name="sb_current_mdm" value="">' +
        '<input type="hidden" name="sb_current_cmp" value="">' +
        '<input type="hidden" name="sb_current_cnt" value="">' +
        '<input type="hidden" name="sb_current_trm" value="">' +
        '<input type="hidden" name="sb_current_add_rf" value="">' +
        '<input type="hidden" name="sb_udata_vst" value="">' +
        '<input type="hidden" name="clientid" value="' +
        contents.cid +
        '">' +
        '<input type="hidden" name="subid" value="' +
        $_GET.subid +
        '">'
    )
});

sbjs.init({
    domain: {
        host: 'likebz.ru',
        isolate: !0
    },
    referrals: [{
            host: 't.co',
            medium: 'social',
            display: 'twitter.com'
        },
        {
            host: 'plus.url.google.com',
            display: 'plus.google.com'
        }
    ],
    custom_campaign: 'my_adwords_campaign',
    promocode: !0,
    callback: place_data
})

function parseGet() {
    var $_GET = {}
    var __GET = window.location.search.substring(1).split('&')
    for (var i = 0; i < __GET.length; i++) {
        var getVar = __GET[i].split('=')
        $_GET[getVar[0]] = typeof getVar[1] == 'undefined' ? '' : getVar[1]
    }
    return $_GET
}

function getCookie(name) {
    var matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
            '=([^;]*)'
        )
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
}

function place_data(a) {
    for (var b = document.getElementsByName('sb_first_typ'), c = 0; c < b.length; c++) b[c].value = a.first.typ
    for (var b = document.getElementsByName('sb_first_src'), c = 0; c < b.length; c++) b[c].value = a.first.src
    for (var b = document.getElementsByName('sb_first_mdm'), c = 0; c < b.length; c++) b[c].value = a.first.mdm
    for (var b = document.getElementsByName('sb_first_cmp'), c = 0; c < b.length; c++) b[c].value = a.first.cmp
    for (var b = document.getElementsByName('sb_first_cnt'), c = 0; c < b.length; c++) b[c].value = a.first.cnt
    for (var b = document.getElementsByName('sb_first_trm'), c = 0; c < b.length; c++) b[c].value = a.first.trm
    for (var b = document.getElementsByName('sb_current_typ'), c = 0; c < b.length; c++) b[c].value = a.current.typ
    for (var b = document.getElementsByName('sb_current_src'), c = 0; c < b.length; c++) b[c].value = a.current.src
    for (var b = document.getElementsByName('sb_current_mdm'), c = 0; c < b.length; c++) b[c].value = a.current.mdm
    for (var b = document.getElementsByName('sb_current_cmp'), c = 0; c < b.length; c++) b[c].value = a.current.cmp
    for (var b = document.getElementsByName('sb_current_cnt'), c = 0; c < b.length; c++) b[c].value = a.current.cnt
    for (var b = document.getElementsByName('sb_current_trm'), c = 0; c < b.length; c++) b[c].value = a.current.trm
    for (var b = document.getElementsByName('sb_first_add_fd'), c = 0; c < b.length; c++) b[c].value = a.first_add.fd
    for (var b = document.getElementsByName('sb_first_add_ep'), c = 0; c < b.length; c++) b[c].value = a.first_add.ep
    for (var b = document.getElementsByName('sb_first_add_rf'), c = 0; c < b.length; c++) b[c].value = a.first_add.rf
    for (var b = document.getElementsByName('sb_current_add_fd'), c = 0; c < b.length; c++) b[c].value = a.current_add.fd
    for (var b = document.getElementsByName('sb_current_add_ep'), c = 0; c < b.length; c++) b[c].value = a.current_add.ep
    for (var b = document.getElementsByName('sb_current_add_rf'), c = 0; c < b.length; c++) b[c].value = a.current_add.rf
    for (var b = document.getElementsByName('sb_session_pgs'), c = 0; c < b.length; c++) b[c].value = a.session.pgs
    for (var b = document.getElementsByName('sb_session_cpg'), c = 0; c < b.length; c++) b[c].value = a.session.cpg
    for (var b = document.getElementsByName('sb_udata_vst'), c = 0; c < b.length; c++) b[c].value = a.udata.vst
    for (var b = document.getElementsByName('sb_udata_uip'), c = 0; c < b.length; c++) b[c].value = a.udata.uip
    for (var b = document.getElementsByName('sb_udata_uag'), c = 0; c < b.length; c++) b[c].value = a.udata.uag
    for (var b = document.getElementsByName('sb_promo_code'), c = 0; c < b.length; c++) b[c].value = a.promo.code
};