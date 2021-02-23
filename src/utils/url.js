/**
 * 拼接参数
 * @param {Object} data
 */
export const param = data => {
  if (!data) {
    return ''
  }

  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substr(1) : ''
}

/**
 * 为了获取微信登录的code
 * @param {string} name
 */
export const getQueryString = name => {
  let reg = '(^|&)' + name + '=([^&]*)(&|$)'
  let query =
    window.location.search.substr(1) || window.location.hash.split('?')[1]
  let r = query ? query.match(reg) : null
  if (r != null) return unescape(r[2])
  return null
}

/**
 *  为了获取URL上的值
 * @param {*} name 需要获取的key
 * @param {*} isMerge 是否合并hash和search,search优先级高
 */
export const getAllQuertString = (name, isMerge = true) => {
  const reg = '(?:^|&)' + name + '=([^&]*)(?:&|$)'
  const search = window.location.search.substr(1)
  const hash = window.location.hash.split('?')[1]
  const searchR = search ? search.match(reg) && search.match(reg)[1] : null
  const hashR = hash ? hash.match(reg) && hash.match(reg)[1] : null
  if (isMerge) {
    const result = searchR || hashR
    return result ? unescape(result) : null
  } else {
    return {
      search: searchR ? unescape(searchR) : null,
      hash: hashR ? unescape(hashR) : null
    }
  }
}

/**
 * 授权时把所有参数进行筛选，防止二次授权存在多个code情况
 * @param {string} url
 */
export function parseURL(url) {
  var a = document.createElement('a')
  a.href = url
  const protocol = a.protocol.replace(':', '')
  const host = a.hostname
  const path = a.pathname.replace(/^([^\/])/, '/$1')
  return {
    href: protocol + '://' + host + path + '?',
    source: url,
    protocol: protocol,
    host: host,
    port: a.port,
    query: a.search,
    params: (function () {
      var params = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length,
        p
      for (var i = 0; i < len; i++) {
        if (seg[i]) {
          p = seg[i].split('=')
          params[p[0]] = p[1]
        }
      }
      return params
    })(),
    hash: a.hash.replace('#', ''),
    path: path
  }
}

/**
 * 获取url query对象
 */
export function urlGetParam() {
  var t = location.search
    .substring(1)
    .split('&')
    .filter(item => !!item)
  var f = new Object()
  for (var i = 0; i < t.length; i++) {
    var x = t[i].split('=')
    f[x[0]] = x[1]
  }
  return f
}

/**
 * 批量删除地址参数
 * @param {array} removes 需要删除的参数
 * @param {boolean} hash 返回的链接是否拼上hash值
 */
export function removeUrlQuery(removes, isHash = false) {
  const currentParam = urlGetParam()
  removes.forEach(removeItem => {
    delete currentParam[removeItem]
  })
  return `${location.origin}${location.pathname}?${param(currentParam)}${isHash ? location.hash : ''
    }`
}

/**
 * 获取链接上的keyValue
 */
export function hrefKeyValue(key, url) {
  const reg = new RegExp(/(\w+)=(\w+)/, 'gi')
  const currentUrl = url || location.href
  const results = currentUrl.match(reg)
  if (results) {
    const resultKeyValues = results.map(o => ({
      [o.split('=')[0]]: o.split('=')[1]
    }))
    const result = resultKeyValues.find(o => o.hasOwnProperty(key))
    return (result && result[key]) || null
  } else {
    return null
  }
}
