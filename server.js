const express = require("express");
const axios = require("axios");
const cors = require("cors");
const moment = require("moment/moment");
const current_date = moment(new Date()).format("DD.MM.YY");
const app = express();
const PORT = 5000;

app.use(cors());

const apiUrl1 = `https://www.babamurli.com/01.%20Daily%20Murli/03.%20Tamil/01.%20Tamil%20Murli%20-%20Htm/${current_date}-Tamil.htm`;
const apiUrl2 = `https://www.babamurli.com/01.%20Daily%20Murli/02.%20English/01.%20Eng%20Murli%20-%20Htm/${current_date}-E.htm`;

app.get("/fetch-murli", async (req, res) => {
  try {
    // Make both API requests concurrently using Promise.all
    const [response1, response2] = await Promise.all([
      axios.get(apiUrl1),
      axios.get(apiUrl2),
    ]);

    // Combine responses or format as needed
    const combinedResponse = {
      tamil: response1.data,
      english: response2.data,
    };

    // Send combined response to client
    res.json(combinedResponse);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
