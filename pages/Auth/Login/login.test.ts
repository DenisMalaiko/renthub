import {describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Login from "~/pages/Auth/Login/index.vue";
import { createPinia, setActivePinia } from 'pinia';
import { UserModule } from "~/store/user";

describe("Login", () => {
  const mountComponent = () => mount(Login);

  it('Render Form', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('[data-testid="email-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="password-input"]').exists()).toBe(true);
  });

  it('Send Empty Form', async () => {
    const wrapper: any = mountComponent();
    const form = wrapper.find('[data-testid="login-form"]');
    await form.trigger('submit.prevent');
    expect(wrapper.vm.loading.creating).toBe(false);
  });

  it('Success Login', async () => {
    setActivePinia(createPinia());
    const store = UserModule();
    store.login = vi.fn().mockResolvedValue({
      login: {
        token: 'mock-token',
        name: 'Test User'
      }
    });

    const wrapper: any = mountComponent();

    wrapper.vm.signInForm.email = 'test@test.com';
    wrapper.vm.signInForm.password = '123456';
    wrapper.vm.signInFormRef = { isValid: true };

    await wrapper.vm.login();

    expect(wrapper.findComponent({ name: 'ToastAlert' }).text()).toContain('User has been successfully logined!');
  });

  it('Failed Login', async () => {
    setActivePinia(createPinia());
    const store = UserModule();
    store.login = vi.fn().mockRejectedValue(new Error('Invalid credentials'))

    const wrapper: any = mountComponent();

    wrapper.vm.signInForm.email = 'test@test.com';
    wrapper.vm.signInForm.password = 'wrong';
    wrapper.vm.signInFormRef = { isValid: true };

    await wrapper.vm.login();

    expect(wrapper.findComponent({ name: 'ToastAlert' }).text()).toContain('Invalid credentials');
  });
});