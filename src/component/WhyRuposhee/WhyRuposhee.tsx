import { FaRegStar, FaShippingFast, FaWallet, FaQuestionCircle } from "react-icons/fa";

const WhyRuposhee = () => {
  return (
    <section className="bg-white py-10 px-2">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Quality and Saving */}
        <div className="bg-gray-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <FaRegStar className="text-3xl mx-auto text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Quality and Saving</h3>
          <p className="text-sm text-gray-600">Comprehensive quality control and affordable prices</p>
        </div>

        {/* Fast Shipping */}
        <div className="bg-gray-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <FaShippingFast className="text-3xl mx-auto text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Fast Shipping</h3>
          <p className="text-sm text-gray-600">Fast and convenient door to door delivery</p>
        </div>

        {/* Payment Security */}
        <div className="bg-gray-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <FaWallet className="text-3xl mx-auto text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Cash On Delivery</h3>
          <p className="text-sm text-gray-600">Fast and reliable Cash on Delivery service across the country</p>
        </div>

        {/* Customer Support */}
        <div className="bg-gray-50 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition">
          <FaQuestionCircle className="text-3xl mx-auto text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Have Questions?</h3>
          <p className="text-sm text-gray-600">Customer Support – Mon to Fri (8am to 4pm BST)</p>
        </div>
      </div>
    </section>
  );
};

export default WhyRuposhee;
