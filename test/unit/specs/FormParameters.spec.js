import Vue from 'vue'
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
// 测试表单参数
describe('Test Form Parameter', () => {
  it('test 表单项都为空，提交', () => {
    let wrapper = mount(Form, {
      ...init,
      propsData: {
        initFormData: {
          name: '',
          type: [],
          desc: '',
        },
      },
    })
    wrapper.find('.confirm').trigger('click')
    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('.el-form-item__error').length).toBe(3)
    })
  })

  it('test type 为空, desc 为空，提交', () => {
    let wrapper = mount(Form, {
      ...init,
      propsData: {
        initFormData: {
          name: '一起团建',
          type: [],
          desc: '',
        },
      },
    })
    wrapper.find('.confirm').trigger('click')
    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('.el-form-item__error').length).toBe(2)
    })
  })

  it('test type 为空，提交', () => {
    let wrapper = mount(Form, {
      ...init,
      propsData: {
        initFormData: {
          name: '一起团建',
          type: [],
          desc: '描述',
        },
      },
    })
    wrapper.find('.confirm').trigger('click')
    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('.el-form-item__error').length).toBe(1)
    })
  })

  it('test desc 为空，提交', () => {
    let wrapper = mount(Form, {
      ...init,
      propsData: {
        initFormData: {
          name: '一起团建',
          type: ['地推活动'],
          desc: '',
        },
      },
    })
    wrapper.find('.confirm').trigger('click')
    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('.el-form-item__error').length).toBe(1)
    })
  })

  it('test 填写表单所有选项，重置', () => {
    let wrapper = mount(Form, {
      ...init,
      propsData: {
        initFormData: {
          name: '一起团建',
          type: ['地推活动'],
          desc: '描述',
        },
      },
    })
    wrapper.find('.reset').trigger('click')
    return Vue.nextTick().then(() => {
      expect(wrapper.findAll('.el-form-item__error').length).toBe(0)
    })
  })
})
