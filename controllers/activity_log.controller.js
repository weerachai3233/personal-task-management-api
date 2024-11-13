const ActivityLog = require("../models/activity_log.model");

const createActivityLog = async (userId, action, description) => {
  try {
    const log = await ActivityLog.create({
      userId,
      action,
      description,
    });
    return log;
  } catch (err) {
    console.error("Error creating activity log:", err.message);
  }
};

const getUserActivityLogs = async (req, res) => {
  try {
    const userId = req.userId;

    const logs = await ActivityLog.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    if (!logs || logs.length === 0) {
      return res
        .status(404)
        .json({ message: "No activity logs found for this user" });
    }

    res.status(200).json({ logs });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const logUserLogin = async (userId) => {
  try {
    await createActivityLog(userId, "LOGIN", "User logged in");
  } catch (err) {
    console.error("Error logging user login activity:", err.message);
  }
};

const logProfileUpdate = async (userId) => {
  try {
    await createActivityLog(
      userId,
      "PROFILE_UPDATE",
      "User updated their profile"
    );
  } catch (err) {
    console.error("Error logging profile update activity:", err.message);
  }
};

const logProjectCreation = async (userId, projectName) => {
  try {
    await createActivityLog(
      userId,
      "PROJECT_CREATED",
      `User created project: ${projectName}`
    );
  } catch (err) {
    console.error("Error logging project creation activity:", err.message);
  }
};

const logUserLogout = async (userId) => {
  try {
    await createActivityLog(userId, "LOGOUT", "User logged out");
  } catch (err) {
    console.error("Error logging user logout activity:", err.message);
  }
};

module.exports = {
  getUserActivityLogs,
  logUserLogin,
  logProfileUpdate,
  logProjectCreation,
  logUserLogout,
};
