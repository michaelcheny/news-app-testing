import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      min: 3,
      max: 20,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
  { timestamps: true }
);

// mongoose middleware - only hash pw is its modified or on user create
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (error, passwordHash) => {
    if (error) return next(error);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (error, isMatch) => {
    if (error) {
      return cb(error);
    } else {
      // if no match
      if (!isMatch) return cb(null, isMatch);
      // if match, no error and we pass THIS user object
      return cb(null, this);
    }
  });
};

// UserSchema.methods.validatePassword = async function validatePassword(password) {
//   return bcrypt.compare(password, this.password);
// };

const User = mongoose.model("User", UserSchema);

export default User;
