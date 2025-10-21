import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";

import AppButton from "~/components/common/app-button.vue";

describe("appButton", () => {
  // Test 1: Basic rendering
  it("renders with default props", async () => {
    const wrapper = await mountSuspended(AppButton, {
      slots: {
        default: () => "Click me", // Use function slots
      },
    });

    expect(wrapper.text()).toContain("Click me");
    expect(wrapper.find("button").exists()).toBe(true);
  });

  // Test 2: Button type attribute
  it("renders with correct type attribute", async () => {
    const wrapper = await mountSuspended(AppButton, {
      props: {
        type: "submit",
      },
    });

    expect(wrapper.find("button").attributes("type")).toBe("submit");
  });

  // Test 3: Variant classes
  describe("variants", () => {
    it("applies primary variant classes by default", async () => {
      const wrapper = await mountSuspended(AppButton);
      const button = wrapper.find("button");

      expect(button.classes()).toContain("bg-white");
    });

    it("applies secondary variant classes", async () => {
      const wrapper = await mountSuspended(AppButton, {
        props: {
          variant: "secondary",
        },
      });
      const button = wrapper.find("button");

      expect(button.classes()).toContain("bg-very-light-gray");
    });

    it("applies outline variant classes", async () => {
      const wrapper = await mountSuspended(AppButton, {
        props: {
          variant: "outline",
        },
      });
      const button = wrapper.find("button");

      expect(button.classes()).toContain("bg-transparent");
      expect(button.classes()).toContain("border");
    });

    it("applies ghost variant classes", async () => {
      const wrapper = await mountSuspended(AppButton, {
        props: {
          variant: "ghost",
        },
      });
      const button = wrapper.find("button");

      expect(button.classes()).toContain("bg-transparent");
    });
  });

  // Test 4: Size classes
  describe("sizes", () => {
    it("applies medium size by default", async () => {
      const wrapper = await mountSuspended(AppButton);
      const button = wrapper.find("button");

      expect(button.classes()).toContain("px-5");
      expect(button.classes()).toContain("py-2.5");
    });

    it("applies small size classes", async () => {
      const wrapper = await mountSuspended(AppButton, {
        props: {
          size: "sm",
        },
      });
      const button = wrapper.find("button");

      expect(button.classes()).toContain("px-4");
      expect(button.classes()).toContain("py-2");
    });

    it("applies large size classes", async () => {
      const wrapper = await mountSuspended(AppButton, {
        props: {
          size: "lg",
        },
      });
      const button = wrapper.find("button");

      expect(button.classes()).toContain("px-6");
      expect(button.classes()).toContain("py-3");
    });
  });

  // Test 5: Disabled state
  describe("disabled state", () => {
    it("applies disabled attribute when disabled", async () => {
      const wrapper = await mountSuspended(AppButton, {
        props: {
          disabled: true,
        },
      });
      const button = wrapper.find("button");

      expect(button.attributes("disabled")).toBeDefined();
      expect(button.classes()).toContain("opacity-50");
      expect(button.classes()).toContain("cursor-not-allowed");
    });

    it("does not emit click event when disabled", async () => {
      const wrapper = await mountSuspended(AppButton, {
        props: {
          disabled: true,
        },
      });

      await wrapper.find("button").trigger("click");
      expect(wrapper.emitted("click")).toBeUndefined();
    });
  });

  // Test 6: Loading state
  describe("loading state", () => {
    it("shows loading spinner when loading", async () => {
      const wrapper = await mountSuspended(AppButton, {
        props: {
          loading: true,
        },
        slots: {
          default: () => "Submit", // Function slot
        },
      });

      const spinner = wrapper.find(".animate-spin");
      expect(spinner.exists()).toBe(true);
      expect(wrapper.find("button").classes()).toContain("cursor-wait");
    });

    it("disables button when loading", async () => {
      const wrapper = await mountSuspended(AppButton, {
        props: {
          loading: true,
        },
      });

      expect(wrapper.find("button").attributes("disabled")).toBeDefined();
    });

    it("does not emit click event when loading", async () => {
      const wrapper = await mountSuspended(AppButton, {
        props: {
          loading: true,
        },
      });

      await wrapper.find("button").trigger("click");
      expect(wrapper.emitted("click")).toBeUndefined();
    });

    it("hides content when loading", async () => {
      const wrapper = await mountSuspended(AppButton, {
        props: {
          loading: true,
        },
        slots: {
          default: () => "Submit", // Function slot
        },
      });

      const contentSpan = wrapper.findAll("span").find(span =>
        span.classes().includes("opacity-0"),
      );
      expect(contentSpan?.exists()).toBe(true);
    });
  });

  // Test 7: Icon rendering - FIXED
  it("renders icon when icon prop is provided", async () => {
    const wrapper = await mountSuspended(AppButton, {
      props: {
        icon: "heroicons-outline:arrow-left",
      },
      slots: {
        default: () => "Save", // Function slot
      },
    });

    // Check if Icon component exists by looking for the rendered element
    // Since Icon is a Nuxt auto-imported component, we check for its presence differently
    const html = wrapper.html();
    expect(html).toContain("heroicons-outline:arrow-left");

    // Alternative: Check if the icon wrapper exists
    const iconWrapper = wrapper.find(".w-4.h-4.mr-1\\.5");
    expect(iconWrapper.exists()).toBe(true);
  });

  it("does not render icon when icon prop is not provided", async () => {
    const wrapper = await mountSuspended(AppButton, {
      slots: {
        default: () => "Save", // Function slot
      },
    });

    // Check that no icon wrapper exists
    const iconWrapper = wrapper.find(".w-4.h-4.mr-1\\.5");
    expect(iconWrapper.exists()).toBe(false);
  });

  // Test 8: Full width
  it("applies full width class when fullWidth is true", async () => {
    const wrapper = await mountSuspended(AppButton, {
      props: {
        fullWidth: true,
      },
    });

    expect(wrapper.find("button").classes()).toContain("w-full");
  });

  it("does not apply full width class by default", async () => {
    const wrapper = await mountSuspended(AppButton);

    expect(wrapper.find("button").classes()).not.toContain("w-full");
  });

  // Test 9: Click event
  it("emits click event when clicked", async () => {
    const wrapper = await mountSuspended(AppButton);

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click")?.[0]).toBeDefined();
  });

  it("emits click event with mouse event", async () => {
    const wrapper = await mountSuspended(AppButton);

    await wrapper.find("button").trigger("click");

    const clickEvents = wrapper.emitted("click");
    expect(clickEvents).toBeTruthy();

    const firstEvent = clickEvents![0]![0];
    expect(firstEvent).toBeInstanceOf(MouseEvent);
  });

  // Test 10: Multiple clicks
  it("emits multiple click events", async () => {
    const wrapper = await mountSuspended(AppButton);

    await wrapper.find("button").trigger("click");
    await wrapper.find("button").trigger("click");
    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("click")).toHaveLength(3);
  });

  // Test 11: Slot content
  it("renders slot content correctly", async () => {
    const wrapper = await mountSuspended(AppButton, {
      slots: {
        default: () => "Bold Text", // Just use text instead of HTML
      },
    });

    expect(wrapper.text()).toContain("Bold Text");
  });

  // Test 12: Combined states - FIXED
  it("works correctly with multiple props combined", async () => {
    const wrapper = await mountSuspended(AppButton, {
      props: {
        variant: "outline",
        size: "lg",
        icon: "mdi:plus",
        fullWidth: true,
        type: "submit",
      },
      slots: {
        default: () => "Add Item", // Function slot
      },
    });

    const button = wrapper.find("button");

    expect(button.classes()).toContain("bg-transparent");
    expect(button.classes()).toContain("border");
    expect(button.classes()).toContain("px-6");
    expect(button.classes()).toContain("py-3");
    expect(button.classes()).toContain("w-full");
    expect(button.attributes("type")).toBe("submit");

    // Check for icon by looking at the HTML or icon wrapper
    const html = wrapper.html();
    expect(html).toContain("mdi:plus");

    expect(wrapper.text()).toContain("Add Item");
  });
});
