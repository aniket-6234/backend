const mongoose = require("mongoose");

// create schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      // required: [true, "last name is required"],
    },
    profilePhoto: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email address is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    // postCount: {
    //   type: Number,
    //   default: 0,
    // },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "guest", "user"],
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to another user
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to another user
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to another user
      },
    ],
    // isActive: {
    //   type: Boolean,
    //   default: true,
    // },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    ],
    plan: [{
      type: String,
      enum: ["Free", "Premium", "Pro"],
      default: "Free"
    }],
    userAward: [{
      type: String,
      enum: ["Bronze", "Sliver", "Gold"],
      default: "Bronze"
    }]
  },
  { timestamps: true, toJSON: { virtuals: true} },
);


// Hooks (pre and post hooks)
userSchema.pre('findOne', function(next) {
  this.populate('posts');
  next();
})

// virtual properties
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

userSchema.virtual('postsCount').get(function() {
  return this.posts.length
})

userSchema.virtual('followersCount').get(function() {
  return this.followers.length
})

userSchema.virtual('followingCount').get(function() {
  return this.following.length
})

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
