import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const UpdateCategory = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { user } = useAuth();
    const location = useLocation();
    const categoryInfo = location?.state;
    // console.log("product info", categoryInfo);
    const {
       _id, name, image, 
    } = categoryInfo?.category

    // console.log("Product id", categoryInfo);

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {

        const imageFile1 = { image: data.image1[0] }

        // console.log("Add Category");

        const res1 = await axiosPublic.post(imageHostingApi, imageFile1, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        // console.log("response", res1);

        const imageUrl1 = res1?.data?.data?.display_url

        const category = {
            name: await data?.categoryName,
            image: await imageUrl1
        };

        // console.log("final res", category);

        // console.log("final update", category);

        axiosSecure.put(`/categories/${categoryInfo?.id}`, category)
            .then(res => {
                if (res?.data?.modifiedCount > 0) {
                    toast.success("category updated successfully!")
                    navigate("/dashboard/manage-category")
                }
            })
            .catch(err => {
                // console.log(err);
                toast.error("Something went wrong!")
            })
    };

    return (
        <div className=" max-w-4xl mx-auto w-full p-2 bg-white rounded font-medium">
            <h2 className="text-xl font-semibold mb-4 text-center">Add New Category</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Product Name */}
                <div>
                    <label className="label text-gray-900">Category Name</label>
                    <input
                        type="text"
                        defaultValue={name}
                        {...register("categoryName", { required: "Category name is required" })}
                        className="input input-bordered w-full"
                        placeholder="Enter the product name"
                    />
                    {errors.categoryName && <p className="text-red-500 text-sm">{errors.categoryName.message}</p>}
                </div>

                {/* Image 1 */}
                <div>
                    <label className="label text-gray-900">Image 1</label>
                    <input
                        type="file"
                        {...register("image1", { required: "Image 1 is required" })}
                        className="file-input file-input-bordered w-full"
                        accept="image/*"
                    />
                    {errors.image1 && <p className="text-red-500 text-sm">{errors.image1.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-right">
                    <button type="submit" className="btn bg-orange-600 text-gray-50 w-full">
                        Update Category
                    </button>
                </div>
            </form>
        </div>

    );
};

export default UpdateCategory;
