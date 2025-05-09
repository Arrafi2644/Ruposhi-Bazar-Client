import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {loginUser, googleLogin} = useAuth()

  const validateBangladeshiPhoneNumber = (value) => {
    const phoneRegex = /^01[3-9]\d{8}$/; // Starts with 01, followed by 3-9, then 8 digits
    return phoneRegex.test(value) || "Invalid phone number";
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/
    return passwordRegex.test(value) || "Password must contain 1 letter 1 number and length will be between 6 to 20"
  }
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return regex.test(value) || "Invalid Email";
      
   }
  const onSubmit = (data) => {
   console.log(data); 
   const email = data?.email;
   const password = data?.password;
   console.log({email, password});
   loginUser(email, password)
   .then(res => {
    toast.success("Login successful!")
   })
   .catch(err => {
    console.log(err);
    toast.error("Something went wrong!")
   })
  };

  // Google login 
  const handleLoginWithGoogle = () => {
    googleLogin()
    .then(res => {
      toast.success("Registered successfully!")
    })
    .catch(err => {
      console.log(err);
      toast.error("Something went wrong")
    })
  }

  return (
    <div className="max-w-md mx-auto my-6 p-6 font-medium bg-white border border-gray-300 shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Login Now</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* <div>
          <label className="block text-sm font-medium mb-1">Mobile No *</label>
          <input
            {...register("mobileNo", { required: "The phone field is required.", validate: validateBangladeshiPhoneNumber })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="01xxxxxxxxxx"
          />
          {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo.message}</p>}
        </div> */}
                <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email", { required: "The email field is required.", validate: validateEmail })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password *</label>
          <input
            {...register("password", { required: "The password field is required.", validate: validatePassword })}
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full bg-yellow-900 cursor-pointer text-white p-2 rounded">Login</button>
      </form>
      <div className="divider"></div>
      <div><button onClick={handleLoginWithGoogle} className="btn btn-outline w-full"><span></span> Login with google</button></div>
      <p className="text-center mt-4 font-medium">
        Don't have any account? <Link className="text-yellow-900" to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;