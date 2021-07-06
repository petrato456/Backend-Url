const hashRoute = require("../services/shortLink");
const mongoose = require("../config/mongodb/mongo");

const urlSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    urlHash: {
      type: String,

    },  
  },
  {
    timestamps: true,
  },
);

  urlSchema.pre("save", async function (next) {
    const hashUrl = hashRoute(this.url);
    this.urlHash = hashUrl;
    next();
  });


const urlModel = mongoose.model("Url", urlSchema);

module.exports = urlModel;
