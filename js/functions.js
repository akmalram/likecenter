function setCookie(name, value, options) {
    console.log('function setCookie')
    options = options || {}

    var expires = options.expires

    if (typeof expires == 'number' && expires) {
        var d = new Date()
        d.setTime(d.getTime() + expires * 1000)
        expires = options.expires = d
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString()
    }

    value = encodeURIComponent(value)

    var updatedCookie = name + '=' + value

    for (var propName in options) {
        updatedCookie += '; ' + propName
        var propValue = options[propName]
        if (propValue !== true) {
            updatedCookie += '=' + propValue
        }
    }

    document.cookie = updatedCookie
}

function deleteCookie(name) {
    console.log('function deleteCookie')
    debugger
    setCookie(name, '', {
        expires: -1
    })
}

function in_array(needle, haystack, strict) {
    console.log('function in_array')
    debugger
    var found = false,
        key,
        strict = !!strict

    for (key in haystack) {
        if (
            (strict && haystack[key] === needle) ||
            (!strict && haystack[key] == needle)
        ) {
            found = true
            break
        }
    }

    return found
}