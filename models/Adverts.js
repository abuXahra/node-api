const mongoose = require("mongoose");

const AdvertSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    photo: { type: String, required: true },
    adsUrl: { type: String, required: true },
    adType: { type: String, enum: ["banner", "sidebar"], required: true },
  },
  { timestamps: true }
);

AdvertSchema.methods.getAdvertOrPlaceholder = function () {
  const currentDate = new Date();
  const createdAtDate = new Date(this.createdAt);
  const expirationDate = new Date(createdAtDate);
  expirationDate.setDate(expirationDate.getDate() + 8);

  const isExpired = currentDate > expirationDate;
  const remainingDays = isExpired
    ? 0
    : Math.ceil((expirationDate - currentDate) / (1000 * 60 * 24));

  return {
    title: isExpired ? "Default Placeholder Title" : this.title,
    photo: isExpired ? "default-placeholder-url" : this.photo,
    adsUrl: isExpired ? "default-placeholder-url" : this.adsUrl,
    expirationDate: expirationDate,
    adType: this.adType,
    remainingDays: remainingDays,
  };
};

module.exports = mongoose.model("Adverts", AdvertSchema);
