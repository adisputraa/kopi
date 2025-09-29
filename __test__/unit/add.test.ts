function add(a: number, b: number): number {
  return a + b;
}

describe("add function", () => {
  it("should return correct sum for positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
