// @vitest-environment nuxt

import { mount } from '@vue/test-utils'
import TodoApp from './TEST.vue'
import {test, expect} from "vitest";

test('renders a todo', () => {
  const wrapper = mount(TodoApp)

  const todo = wrapper.get('[data-test="todo"]')

  expect(todo.text()).toContain('Learn Vue.js 2')
})