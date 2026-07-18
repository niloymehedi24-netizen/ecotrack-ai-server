import { getDB } from "../../config/db.js";
import type { User } from "../../types/user.js";

interface AnalyticsResult {
  _id: {
    month: number;
  };
  users: number;
}

export const getDashboardStats = async () => {
  const db = getDB();
  const usersCollection = db.collection<User>("users");

  const totalUsers = await usersCollection.countDocuments();
  const totalAdmins = await usersCollection.countDocuments({ role: "ADMIN" });

  return {
    totalUsers,
    totalAdmins,
    aiRequests: 0, // Will be connected with AI module later
    carbonSaved: 0, // Will be connected with carbon module later
  };
};

export const getAllUsers = async () => {
  const db = getDB();

  const users = await db
    .collection<User>("users")
    .find({})
    .project({ password: 0 })
    .sort({ createdAt: -1 })
    .toArray();

  return users;
};

export const getAnalytics = async () => {
  const db = getDB();

  const users = await db
    .collection<User>("users")
    .aggregate<AnalyticsResult>([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          users: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ])
    .toArray();

  return users.map((item) => ({
    month: item._id.month,
    users: item.users,
  }));
};
