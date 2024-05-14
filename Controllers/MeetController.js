const fetch = require("cross-fetch");

const API_KEY =process.env.MEET_API_KEY;

const data = {
  endDate: "2099-02-18T14:23:00.000Z",
  fields: ["hostRoomUrl"],
};

// Declare a global variable to store roomUrl
let roomUrl, hosturl;

// Function to fetch meeting details
async function fetchMeetingDetails() {
  try {
    const response = await fetch("https://api.whereby.dev/v1/meetings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    // Assign roomUrl to the global variable
    roomUrl = responseData.roomUrl;
    hosturl = responseData.hostRoomUrl;
    return responseData;
  } catch (error) {
    throw new Error("Failed to fetch meeting details: " + error.message);
  }
}

// Controller function to get meeting details
exports.getMeeting = async (req, res) => {
  try {
    // Call function to fetch meeting details
    await fetchMeetingDetails();
    // Send roomUrl as a response
    res.send({ roomUrl, hosturl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
