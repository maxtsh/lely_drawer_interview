import "@testing-library/jest-dom";

vi.mock("zustand");

//@ts-expect-error: Mock window scroll to for scroll restoration
window.scrollTo = vi.fn();
