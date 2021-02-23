/**
 * 数组新增遍历方法
 * @param val
 * @param type
 * @returns {{}}
 */

Array.prototype.$findItem = function (val, type = 'value') {
  return this.find(v => v[type] == val) || { label: '未知' }
}

// demo
export const DEMO = [
  { value: 0, label: 'demo' },
  { value: 1, label: 'demo' },
  { value: 2, label: 'demo' }
]
