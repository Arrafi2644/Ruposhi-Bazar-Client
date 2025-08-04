import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";

const Newsletter = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // Example API call or integration
    console.log("Subscribed with:", data.email);
    reset();
  };

  return (
    <section className=" py-10 px-2">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Join Our Newsletter</h2>
        <p className="text-gray-600 mb-6">Get updates about our latest offers, products, and discounts.</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
        >
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded transition"
          >
            <FaPaperPlane /> Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
