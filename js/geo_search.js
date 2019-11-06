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

function show_item(id, status) {
    console.log('function show_item')
    if (status == 0) $('#' + id).animate({
        height: 'hide'
    }, 'hide')
    else $('#' + id).animate({
        height: 'show'
    }, 'slow')
}

function in_suggest_list(val) {
    console.log('function in_suggest_list')
    var result = false

    $.each(document.suggest_list, function (i, k) {
        if (val.toLowerCase() === k.value.toLowerCase()) {
            result = true
            return false
        }
    })
    return result
}