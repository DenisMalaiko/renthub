import {describe, expect, it, vi} from "vitest";
import {mount} from "@vue/test-utils";
import Profile from "~/pages/Auth/Profile/index.vue";

const mockEdit = vi.fn()

vi.mock('./profile', () => ({
  useProfileLogic: () => ({
    editProfile: mockEdit,
  })
}))

describe("Profile", () => {
  const mountComponent = () => mount(Profile);

  it('Render Profile', function () {
    const wrapper = mountComponent();
    expect(wrapper.exists()).toBe(true);
  });

  it('Open Edit', function () {
    const wrapper = mountComponent();
    const editBtn = wrapper.find('[data-testid="edit-button"]');
    expect(editBtn).toBeTruthy()
    editBtn?.trigger('click')
    expect(mockEdit).toHaveBeenCalled()
  });

})