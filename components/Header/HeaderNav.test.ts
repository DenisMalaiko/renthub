import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import HeaderNav from "./HeaderNav.vue";
import { ref, computed } from "vue";

const mockLogout = vi.fn()

vi.mock('./HeaderNav', () => ({
  useHeaderLogic: () => ({
    logo: ref('RentHub'),
    user: computed(() => ({ token: 'mock-token', name: 'John Doe' })),
    logout: mockLogout,
  })
}))

describe('HeaderNav.vue', () => {
  const mountComponent = () => shallowMount(HeaderNav)

  it('renders logo text', () => {
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('RentHub')
  })

  it('shows user name when logged in', () => {
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Logout')
  })

  it('calls logout method when logout is clicked', async () => {
    const wrapper = mountComponent()
    const logoutBtn = wrapper.findAll('.link').find(el => el.text().includes('Logout'))
    expect(logoutBtn).toBeTruthy()
    await logoutBtn?.trigger('click')
    expect(mockLogout).toHaveBeenCalled()
  })
});