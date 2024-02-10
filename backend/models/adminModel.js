import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    console.log(enteredPassword, 'enteredpassword');
    console.log(this.password, 'thispassw');

    if(enteredPassword===this.password);{
          console.log('passwordmatchedddddd');
return this.password
    }

  } catch (error) {
    console.error('Error in matchPassword:', error);
    return false;
  }
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
