import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("appButton", () => {
  it("renders the correct text", () => {
    const wrapper = mount(AppButton, { slots: { default: "Click me" } });
    expect(wrapper.text()).toContain("Click me");
  });
});
