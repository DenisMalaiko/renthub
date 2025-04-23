import {describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Register from "~/pages/Auth/Register/index.vue";
import {createPinia, setActivePinia} from "pinia";
import {UserModule} from "~/store/user";

describe("Register", () => {
  const mountComponent = () => mount(Register);

  it('Render Form', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('[data-testid="name-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="login-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="email-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="address-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="password-input"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="repeat-password-input"]').exists()).toBe(true);
  });

  it('Send Empty Form', async () => {
    const wrapper: any = mountComponent();
    const form = wrapper.find('[data-testid="register-form"]');
    await form.trigger('submit.prevent');
    expect(wrapper.vm.loading.creating).toBe(false);
  });

  it('Success Register', async () => {
    setActivePinia(createPinia());
    const store = UserModule();
    store.createUser = vi.fn().mockResolvedValue(true);

    const wrapper: any = mountComponent();

    wrapper.vm.signUpForm.name = 'Name';
    wrapper.vm.signUpForm.login = 'Login';
    wrapper.vm.signUpForm.email = 'test@gmail.com';
    wrapper.vm.signUpForm.city = 'Lviv';
    wrapper.vm.signUpForm.password = '111';
    wrapper.vm.signUpForm.repeatPassword = '111';
    wrapper.vm.signUpFormRef = { isValid: true };

    await wrapper.vm.createUser();

    expect(wrapper.findComponent({ name: 'ToastAlert' }).text()).toContain('User has been successfully created!');
  });

  it('Failed Register', async () => {
    setActivePinia(createPinia());
    const store = UserModule();
    store.createUser = vi.fn().mockRejectedValue(new Error('Error on creating'))

    const wrapper: any = mountComponent();

    wrapper.vm.signUpForm.name = 'Name';
    wrapper.vm.signUpForm.login = 'Login';
    wrapper.vm.signUpForm.email = 'test@gmail.com';
    wrapper.vm.signUpForm.city = 'Lviv';
    wrapper.vm.signUpForm.password = '111';
    wrapper.vm.signUpForm.repeatPassword = '111';
    wrapper.vm.signUpFormRef = { isValid: true };

    await wrapper.vm.createUser();

    expect(wrapper.findComponent({ name: 'ToastAlert' }).text()).toContain('Error on creating');
  });

})