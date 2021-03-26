import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import { mount, createLocalVue } from '@vue/test-utils'
const localVue = createLocalVue()
localVue.use(ElementUI)

import Form from '@/components/Form'
const init = {
  stubs: {
    transition: false,
  },
  localVue,
}
// 测试表单请求
describe('Test Form Request', () => {
  it('test Form 提交', () => {
    let wrapper = mount(Form, {
      ...init,
      propsData: {
        initFormData: {
          name: '一起团建',
          type: ['地推活动'],
          desc: '吃喝玩乐',
        },
      },
    })
    wrapper.find('.confirm').trigger('click')
    return Vue.nextTick().then(() => {
      expect(wrapper.vm.sucess).toBe(true)
      let url = 'http://rap2api.taobao.org/app/mock/233956/tbl-unit-test?name=' + wrapper.vm.ruleForm.name + '&nature=' + wrapper.vm.ruleForm.type.join(',') + '&form=' + wrapper.vm.ruleForm.form
      expect(axios.get).toBeCalledWith(url)
    })
  })
})
