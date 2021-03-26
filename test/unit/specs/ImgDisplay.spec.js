import Vue from 'vue'
import ElementUI from 'element-ui'
import { mount, createLocalVue } from '@vue/test-utils'
const localVue = createLocalVue()
localVue.use(ElementUI)

import Main from '@/components/Main'

const wrapper = mount(Main, {
  // 加stubs 参数是为了避免这个问题  https://github.com/vuejs/vue-test-utils/issues/958
  stubs: {
    transition: false,
  },
  localVue,
})

describe('Test Img Display', () => {
  it('test img mock', () => {
    return Vue.nextTick().then(() => {
      expect(wrapper.vm.logoImg).toBe('test-file')
    })
  })

  it('test img 显示', () => {
    wrapper.setData({ switchvalue: true })
    // 修改完数据 dom操作没同步 需要用 nextTick
    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('.logoImg').length).toBe(1)
    })
  })

  it('test img 隐藏', () => {
    wrapper.setData({ switchvalue: false })
    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('.logoImg').length).toBe(0)
    })
  })
  
})
