import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils/test-utils";
import { ImagePlaceholder } from "../ImagePlaceholder";

describe("ImagePlaceholder", () => {
  it("should render the placeholder with default size", () => {
    render(<ImagePlaceholder />);
    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("should render with small size", () => {
    const { container } = render(<ImagePlaceholder size="sm" />);
    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("should render with medium size", () => {
    render(<ImagePlaceholder size="md" />);
    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("should render with large size", () => {
    render(<ImagePlaceholder size="lg" />);
    expect(screen.getByText("Sin imagen")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(<ImagePlaceholder className="custom-class" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("custom-class");
  });
});

