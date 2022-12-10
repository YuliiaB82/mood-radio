const moodList = [
  { id: "1", title: "Energy", color: "#F5B971" },
  { id: "2", title: "Peace & Calm", color: "#AAC4FF" },
  { id: "3", title: "Happiness & Optimism", color: "#FFF89A" },
  { id: "4", title: "Passion & Excitement", color: "#FF8080" },
  { id: "5", title: "Nature & Simplicity", color: "#796465" },
  { id: "6", title: "Nature & Life", color: "#CBE2B0" },
  { id: "7", title: "Intrigue & Spirituality", color: "#CAABD8" },
  { id: "8", title: "Love & Compassion", color: "#F5B0CB" },
];

exports.getMoods = (req, res) => {
  res.status(200).json(moodList);
};
