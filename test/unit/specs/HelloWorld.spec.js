import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld'

describe('<HelloWorld />', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(HelloWorld)
    expect(wrapper.find('.hello h1').text()).toEqual('Hello Jest')
  })
  
})
