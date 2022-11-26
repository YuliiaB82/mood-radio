const moodList = [
  { emotion: "Energy", color: "#F5B971" },
  { emotion: "Peace & Calm", color: "#AAC4FF" },
  { emotion: "Happiness & Optimism", color: "#FFF89A" },
  { emotion: "Passion & Excitement", color: "#FF8080" },
  { emotion: "Nature & Simplicity", color: "#796465" },
  { emotion: "Nature & Life", color: "#CBE2B0" },
  { emotion: "Intrigue & Spirituality", color: "#CAABD8" },
  { emotion: "Love & Compassion", color: "#F5B0CB" },
  { emotion: "Perfection & Freshness", color: "#F9F9F9" },
];

exports.getMoods = (req, res) => {
  res.json(moodList);
};
