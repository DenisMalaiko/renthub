import {describe, it, expect, vi} from "vitest";
import {mount} from "@vue/test-utils";
import ProductsPage from "./index.vue";
import {Product} from "~/models/Product";

vi.mock('~/pages/Auth/Profile/Products/products', () => ({
  useProductsLogic: () => ({
    productsUser: [
      new Product('12345'),
      new Product('12345'),
      new Product('12345'),
    ]
  })
}))

describe("Profile Products", () => {
  const mountComponent = () => mount(ProductsPage);

  it('Render Profile Products', () => {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBe(true);
  });

  it('Render Products', () => {
    const wrapper = mountComponent();
    const cards = wrapper.findAllComponents({ name: 'ProductCard' })
    expect(cards).toHaveLength(3);
  })
})