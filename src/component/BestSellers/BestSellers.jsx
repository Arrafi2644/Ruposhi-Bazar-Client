
import SectionSlider from '../SectionSlider/SectionSlider';
import useProducts from '../../hooks/useProducts';

const BestSellers = () => {
    // const [products, setProducts] = useState([])
    const [products, isLoading, refetch] = useProducts([])

    const bestSellingProducts = [...products].sort((a, b) => {
        return b.total_sells - a.total_sells
    }).slice(0, 15)

    console.log("best selling products", bestSellingProducts);

    return (
     
            <div className='mt-6 bg-white py-6'>
                {/* Section heading  */}
                {/* <SectionHeader title={"Featured"} /> */}
                <h2 className='text-lg md:text-xl pb-4 font-semibold '>Best Sellers</h2>

                {/* Section content  */}
                {/* <SectionProducts products={featuredProducts}/> */}

                {/* with slider  */}
                <SectionSlider products={bestSellingProducts} />
            </div>
       
    );
};

export default BestSellers;