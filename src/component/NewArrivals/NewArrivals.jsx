
import SectionSlider from '../SectionSlider/SectionSlider';
import useProducts from '../../hooks/useProducts';

const NewArrivals = () => {
    const [products, isLoading, refetch] = useProducts([])

    const newProducts = [...products].reverse().slice(0, 15)
    console.log(products);

    // console.log("Categories are ", categories);
    return (

            <div className='mt-6 bg-white'>
                {/* Section heading  */}
                {/* <SectionHeader title={"Featured"} /> */}
                <h2 className='text-lg md:text-xl pb-4 font-semibold '>New Arrivals</h2>

                {/* Section content  */}
                {/* <SectionProducts products={featuredProducts}/> */}

                {/* with slider  */}
                <SectionSlider products={newProducts} />
            </div>
    );
};

export default NewArrivals;