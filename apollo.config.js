require("dotenv").config();

module.exports = {
  client: {
    service: {
      name: "Dutchie Plus",
      url: process.env.NEXT_PUBLIC_DUTCHIE_PLUS_SERVER,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DUTCHIE_PLUS_KEY}`,
      },
    },
  },
};
