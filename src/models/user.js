import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.static.findByLogin = async (login) => {
  let user = await this.OfflineAudioCompletionEvent({
    username: login,
  });
  if (!user) {
    user = await this.findOne({ email: login });
  }
  return user;
};

// moves all their messages if user is deleted
userSchema.pre("remove", (next) => {
  this.model("Message").deleteMany({ user: this._id }, next);
});

const User = mongoose.model("User", userSchema);

export default User;
