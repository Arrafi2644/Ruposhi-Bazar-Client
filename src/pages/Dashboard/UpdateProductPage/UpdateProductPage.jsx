import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";

const imageHostingKey = import.meta.env.VITE_image_hosting_key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const UpdateProductPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()

    const { user } = useAuth();
    const location = useLocation();
    const productInfo = location?.state;
    // console.log(productInfo);
    const {
        _id,
        productName,
        price,
        category,
        description,
        warranty,
        title,
        brand,
        discount,
        model,
        colors,
        images,
        isStock,
        total_sells,
        rating,
        reviews,
        sellerEmail,
        specification,
        features
    } = productInfo?.product;

    // console.log("Product id", productInfo?.id);

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {

        // console.log(data);

        const imageFile1 = { image: data.image1[0] }
        const imageFile2 = { image: data.image2[0] }
        const imageFile3 = { image: data.image3[0] }

        const res1 = await axiosPublic.post(imageHostingApi, imageFile1, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        const res2 = await axiosPublic.post(imageHostingApi, imageFile2, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        const res3 = await axiosPublic.post(imageHostingApi, imageFile3, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        const imageUrl1 = res1?.data?.data?.display_url
        const imageUrl2 = res2?.data?.data?.display_url
        const imageUrl3 = res3?.data?.data?.display_url

        const product = {
            productName: await data?.productName,
            price: await data?.price,
            category: await data?.category,
            description: await data?.description,
            warranty: await data?.warranty,
            title: await data?.title,
            brand: await data?.brand,
            discount: await data?.discount,
            model: await data?.model,
            colors: await data?.colors.split(","),
            // images: await [data?.image1, data?.image2, data?.image3]
            images: [imageUrl1, imageUrl2, imageUrl3],
            isStock: true,
            total_sells: 0,
            rating: 0,
            reviews: [],
            sellerEmail: user?.email,
            specification: data?.specification,
            features: data?.features
        };

        // console.log("final update", product);

        axiosSecure.put(`/products/${productInfo?.id}`, product)
            .then(res => {
                if (res?.data?.modifiedCount > 0) {
                    toast.success("Product updated successfully!")
                    navigate("/dashboard/manage-products")
                }
            })
            .catch(err => {
                // console.log(err);
                toast.error("Something went wrong!")
            })
    };

    return (
        <div className="w-full p-6 bg-white rounded font-medium">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Product Name */}
                <div>
                    <label className="label text-gray-900">Product Name</label>
                    <input
                        type="text"
                        defaultValue={productName}
                        {...register("productName", { required: "Product name is required" })}
                        className="input input-bordered w-full"
                        placeholder="Enter the product name"
                    />
                    {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
                </div>

                {/* Title */}
                <div>
                    <label className="label text-gray-900">Title</label>
                    <input
                    defaultValue={title}
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className="input input-bordered w-full"
                        placeholder="Enter the product title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Brand */}
                <div>
                    <label className="label text-gray-900">Brand</label>
                    <input
                    defaultValue={brand}
                        type="text"
                        {...register("brand", { required: "Brand is required" })}
                        className="input input-bordered w-full"
                        placeholder="Enter the product brand"
                    />
                    {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
                </div>

                {/* Model */}
                <div>
                    <label className="label text-gray-900">Model</label>
                    <input
                    defaultValue={model}
                        type="text"
                        {...register("model", { required: "Model is required" })}
                        className="input input-bordered w-full"
                        placeholder="Enter the product model"
                    />
                    {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
                </div>

                {/* Price */}
                <div>
                    <label className="label text-gray-900">Price</label>
                    <input
                    defaultValue={price}
                        type="number"
                        step="0.01"
                        {...register("price", { required: "Price is required" })}
                        className="input input-bordered w-full"
                        placeholder="Enter the product price"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                {/* Discount */}
                <div>
                    <label className="label text-gray-900">Discount (%)</label>
                    <input
                    defaultValue={discount}
                        type="number"
                        {...register("discount", { required: "Discount is required" })}
                        className="input input-bordered w-full"
                        placeholder="Enter discount percentage"
                    />
                    {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
                </div>

                {/* Category Dropdown */}
                <div>
                    <label className="label text-gray-900">Category</label>
                    <select
                        {...register("category", {
                            validate: (value) => value !== "default" || "Please select a category"
                        })}
                        defaultValue={category}
                        className="select select-bordered w-full"
                    >
                        <option value="default" disabled>Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="equipment">Equipment</option>
                        <option value="supplement">Supplement</option>
                        <option value="device">Medical Device</option>
                        <option value="others">Others</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>

                {/* Warranty Dropdown */}
                <div>
                    <label className="label text-gray-900">Warranty</label>
                    <select
                        {...register("warranty", {
                            validate: (value) => value !== "default" || "Please select a warranty"
                        })}
                        defaultValue={warranty}
                        className="select select-bordered w-full"
                    >
                        <option value="default" disabled>Select a warranty option</option>
                        <option value="3 Months Warranty">3 Months Warranty</option>
                        <option value="6 Months Warranty">6 Months Warranty</option>
                        <option value="No Warranty">No Warranty</option>
                    </select>
                    {errors.warranty && <p className="text-red-500 text-sm">{errors.warranty.message}</p>}
                </div>

                {/* Colors */}
                <div>
                    <label className="label text-gray-900">Colors (Comma separated)</label>
                    <input
                    defaultValue={colors}
                        type="text"
                        {...register("colors", { required: "Colors are required" })}
                        className="input input-bordered w-full"
                        placeholder="Enter colors (e.g., Red, Blue, Green)"
                    />
                    {errors.colors && <p className="text-red-500 text-sm">{errors.colors.message}</p>}
                </div>

                {/* Features */}
                <div>
                    <label className="label text-gray-900">Features (Comma separated)</label>
                    <input
                        defaultValue={features}
                        type="text"
                        {...register("features")}
                        className="input input-bordered w-full"
                        placeholder="Enter features (e.g., material:Leather, sole:Rubber)"
                    />
                    {errors.features && <p className="text-red-500 text-sm">{errors.features.message}</p>}
                </div>

                {/* Specification */}
                <div>
                    <label className="label text-gray-900">Specification (Comma separated)</label>
                    <input
                    defaultValue={specification}
                        type="text"
                        {...register("specification")}
                        className="input input-bordered w-full"
                        placeholder="Enter specification (e.g., screen_size:1.3 inch, battery_life:7 days)"
                    />
                    {errors.specification && <p className="text-red-500 text-sm">{errors.specification.message}</p>}
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

                {/* Image 2 */}
                <div>
                    <label className="label text-gray-900">Image 2</label>
                    <input
                        type="file"
                        {...register("image2", { required: "Image 2 is required" })}
                        className="file-input file-input-bordered w-full"
                        accept="image/*"
                    />
                    {errors.image2 && <p className="text-red-500 text-sm">{errors.image2.message}</p>}
                </div>

                {/* Image 3 */}
                <div>
                    <label className="label text-gray-900">Image 3</label>
                    <input
                        type="file"
                        {...register("image3", { required: "Image 3 is required" })}
                        className="file-input file-input-bordered w-full"
                        accept="image/*"
                    />
                    {errors.image3 && <p className="text-red-500 text-sm">{errors.image3.message}</p>}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="label text-gray-900">Description</label>
                    <textarea
                    defaultValue={description}
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full"
                        rows={4}
                        placeholder="Enter a description of the product"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-right">
                    <button type="submit" className="btn bg-orange-600 text-gray-50 w-full">
                        Add Product
                    </button>
                </div>
            </form>
        </div>

    );
};

export default UpdateProductPage;
