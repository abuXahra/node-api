const Post = require("../models/Post");

// Endpoint to get post counts by date

// exports.chartData = async (req, res) => {
//   try {
//     const posts = await Post.find({});
//     const postCounts = {};

//     posts.forEach((post) => {
//       const date = post.createdAt.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
//       postCounts[date] = (postCounts[date] || 0) + 1;
//     });

//     const labels = Object.keys(postCounts);
//     const values = Object.values(postCounts);
//     res.status(200).json({ labels, values });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

exports.lineChartData = async (req, res) => {
  try {
    const posts = await Post.find({});
    const postCounts = {};

    // Month initials mapping
    const monthInitials = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };

    posts.forEach((post) => {
      const date = post.createdAt;
      const month = date.toISOString().split("T")[0].slice(5, 7); // Get MM
      const monthInitial = monthInitials[month];

      // Count posts by month initials
      postCounts[monthInitial] = (postCounts[monthInitial] || 0) + 1;
    });

    // Prepare data for response
    const labels = Object.keys(postCounts);
    const values = Object.values(postCounts);

    // Format response to match chart requirements
    const responseData = labels.map((label, index) => ({
      month: label,
      posts: values[index],
    }));

    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.barChartData = async (req, res) => {
  try {
    const posts = await Post.find({});
    const postCounts = {};

    // Count posts by username
    posts.forEach((post) => {
      const username = post.username;

      // Initialize username in postCounts if it doesn't exist
      postCounts[username] = (postCounts[username] || 0) + 1;
    });

    // Prepare data for response
    const usernames = Object.keys(postCounts);
    const counts = Object.values(postCounts);

    // Format response to match chart requirements
    const responseData = usernames.map((username, index) => ({
      username,
      posts: counts[index],
    }));

    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json(err);
  }
};
