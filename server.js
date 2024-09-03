const express = require("express");
const axios = require("axios");
const cors = require("cors");
const moment = require("moment/moment");
const current_date = moment(new Date()).format("DD.MM.YY");
const app = express();
const PORT = 5000;

app.use(cors());

app.get("/fetch-murli/:pathValue", async (req, res) => {
  try {
    const date = req.params.pathValue;
    const [response1, response2] = await Promise.all([
      axios.get(
        `https://www.babamurli.com/01.%20Daily%20Murli/03.%20Tamil/01.%20Tamil%20Murli%20-%20Htm/${date}-Tamil.htm`
      ),
      axios.get(
        `https://www.babamurli.com/01.%20Daily%20Murli/02.%20English/01.%20Eng%20Murli%20-%20Htm/${date}-E.htm`
      ),
    ]);

    const combinedResponse = {
      tamil: response1.data,
      english: response2.data,
    };

    res.json(combinedResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
