let nums = {
  a: 100,
  b: 200,
  title: "My Nums",
};

function multiplyByTwo(nums) {
  for (key in nums) {
    if (typeof nums[key] == "number") {
      nums[key] = nums[key] * 2;
    }
  }
  return nums;
}
console.log(multiplyByTwo(nums));
