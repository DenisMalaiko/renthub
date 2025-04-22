import {describe, it, expect, vi} from "vitest";
import {mount} from "@vue/test-utils";
import IndexPage from "~/pages/index.vue";
import {Product} from "~/models/Product";

vi.mock('~/pages/home', () => ({
  useHomeLogic: () => ({
    products: [
      new Product('12345'),
      new Product('12345'),
    ]
  })
}));

describe("Home", () => {
  const mountComponent = () => mount(IndexPage);

  it('Render Home', () => {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBe(true);
  });

  it('Render Search', () => {
    const wrapper = mountComponent();
    expect(wrapper.findComponent({ name: 'SearchNav' }).exists()).toBe(true)
  });

  it('Render Products', () => {
    const wrapper = mountComponent();
    const cards = wrapper.findAllComponents({ name: 'ProductCard' })
    expect(cards).toHaveLength(2);
  })
});