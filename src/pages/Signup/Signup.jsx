import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signUpUser, updateUserProfile, googleLogin } = useAuth();

  const axiosPublic = useAxiosPublic()

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
    console.log(data)
    const email = data.email;
    const name = data.name;
    const phone = data.mobileNo;
    const password = data.password;

    signUpUser(email, password)
      .then(res => {
        console.log(res);
        updateUserProfile({ displayName: name, phoneNumber: phone })
          .then(res => {
            console.log(res);
            // console.log("login success");
            const userInfo = {
              name,
              email,
              phone,
              role: "user"
            }
            axiosPublic.post("/users", userInfo)
              .then(res => {
                console.log(res);
                toast.success("Registered successfully!")
              })
              .catch(err => {
                console.log(err);
                toast.error("Something went wrong!")
              })


          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
        toast.error("Something went wrong!. Try again.")
      })
  }

  // Google login 
  const handleLoginWithGoogle = () => {
    googleLogin()
      .then(res => {
        // toast.success("Registered successfully!")
        console.log(res);
        const userInfo = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          role: "user"
        }
        console.log("gl ", userInfo);
        axiosPublic.post("/users", userInfo)
          .then(res => {
              toast.success("Registered successfully!")
          })
          .catch(err => {
            console.log(err);
            toast.error("Something went wrong!")
          })
      })
      .catch(err => {
        console.log(err);
        toast.error("Something went wrong")
      })
  }

  return (
    <div className="max-w-md mx-auto my-6 p-6 bg-white border font-medium border-gray-300 shadow-md rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Account Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            {...register("name", { required: "The name field is required." })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            {...register("email", { required: "The email field is required.", validate: validateEmail })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mobile No *</label>
          <input
            {...register("mobileNo", { required: "The phone field is required.", validate: validateBangladeshiPhoneNumber })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="01xxxxxxxxxx"
          />
          {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo.message}</p>}
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
        <button type="submit" className="w-full cursor-pointer bg-yellow-900 text-white p-2 rounded">Register</button>
      </form>
      <div className="divider"></div>
      <div><button onClick={handleLoginWithGoogle} className="btn border-gray-300 btn-outline w-full flex items-center"><span><FcGoogle /></span> Login with google</button></div>
      <p className="text-center mt-4 font-medium">
        Already have an account? <Link className="text-yellow-900" to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;