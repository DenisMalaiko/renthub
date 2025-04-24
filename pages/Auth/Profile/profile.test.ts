import {describe, expect, it} from "vitest";
import {mount} from "@vue/test-utils";
import Profile from "~/pages/Auth/Profile/index.vue";

describe("Profile", () => {
  const mountComponent = () => mount(Profile);

  it('Render Profile', function () {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBe(true);
  });

})