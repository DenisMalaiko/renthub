import { mount } from '@vue/test-utils'
import TodoApp from './TEST.vue'
import {test, expect} from "vitest";

test('renders a todo', () => {
  const wrapper = mount(TodoApp)

  const todo = wrapper.get('[data-test="todo"]')

  console.log("TODO ", todo.text())

  expect(todo.text()).toContain('Learn Vue.js 2')
})