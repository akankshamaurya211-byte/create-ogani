import { useEffect, useState } from "react";
import {
  FaHeart,
  FaCartPlus,
} from "react-icons/fa";
import { ImLoop } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdKeyboardArrowDown, MdLocalPhone } from "react-icons/md";
import { Range } from "react-range";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Shop() {
  const [departmentsVisible, setDepartmentsVisible] = useState(false);
  const[products, setProducts]= useState([]);
  const[categories, setCategories]= useState([]);
  const[selectedCategory,setSelectedCategory]= useState("");

  async function fetchProducts(searchTerm="", category="") {
    try {
   
      if(searchTerm!="")
      setSelectedCategory("");
      let response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/products?q=${searchTerm}&category=${category}`);
      if(!response.ok)
        return toast.error("Could not fetch products at the moments!",{position:"bottom-center"});

      
      response = await response.json();
     
      setProducts(response.products);
      setCategories(response.categories)
    } catch (error) {
      console.log(error)
      toast.error("Could not fetch products at the moments!",{position:"bottom-center"});
    }
    
  }

  useEffect(()=>{
    fetchProducts();
  }, []);
  

  return (
    <>
      <SearchSection fetchProducts={fetchProducts} setSelectedCategory= {setSelectedCategory} categories={categories} selectedCategory={selectedCategory}/>

      {/* Breadcrumb */}
      <section className="my-6 py-12 px-4 bg-[url('./images/shop/breadcrumb.jpg')] bg-cover bg-center text-white text-center">
        <p className="text-3xl sm:text-5xl font-bold">Zara Shop</p>
        <p className="mt-2 text-sm sm:text-base">HOME - SHOP</p>
      </section>

      <MainSection products={products} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} categories={categories} fetchProducts={fetchProducts} />
    </>
  );
}

/* ================= SEARCH ================= */

function SearchSection({selectedCategory, setSelectedCategory, categories, fetchProducts}) {
  const [departmentsVisible, setDepartmentsVisible] = useState(false);
  const [searchInput, setSearchInput]= useState("");

  return (
    <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-6 flex flex-col lg:flex-row gap-4 lg:gap-12">

      {/* Department */}
      <div
        onClick={() => setDepartmentsVisible(!departmentsVisible)}
        className="relative flex items-center justify-between gap-6 bg-[#7fad39] text-white px-4 py-3 cursor-pointer w-full lg:w-auto"
      >
        <GiHamburgerMenu />
        <span style={{userSelect:"none"}}>All Departments</span>
        <MdKeyboardArrowDown />

        <ul 
          className="absolute top-full left-0 bg-white text-black w-full lg:w-full overflow-hidden border transition-all duration-300 z-50"
          style={{ userSelect:"none",
            maxHeight: departmentsVisible ? "500px" : "0",
          }}
        >
          {categories.map((el)=>(
          <li onClick={()=>{
            setSelectedCategory(el)
            fetchProducts("",el)
          }}key={el} className={`"hover:text-[#7fad39] text-[${selectedCategory==el ? "#7fad39":"black"}] cursor-pointer"`}>
            {el}
            </li>
         ))}
        </ul>
      </div>

      {/* Search */}
      <div className="flex flex-1 border">
        <input
        value= {searchInput}
        onChange={(e)=>{
          setSearchInput(e.target.value)
          fetchProducts(e.target.value)
        }}
          placeholder="What do you need?"
          className="flex-1 px-4 sm:px-6 py-3 outline-none"
        />
        <button onClick={()=>fetchProducts(searchInput.trim())}className="bg-[#7fad39] text-white px-4 sm:px-6">
          SEARCH
        </button>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-3 justify-center lg:justify-start">
        <span className="bg-gray-200 p-3 text-[#7fad39] rounded-full">
          <MdLocalPhone />
        </span>

        <div className="text-center lg:text-left">
          <strong className="text-sm sm:text-base">+65 11.188.888</strong>
          <p className="text-xs sm:text-sm text-gray-500">
            support 24/7 time
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN ================= */

function MainSection({products,selectedCategory, setSelectedCategory, categories, fetchProducts}) {
  const[values, setValues] = useState([0, 100]);
  const[priceRange, setPriceRange] = useState({min:0 , max:100});
  useEffect(()=>{
    const min = Math.min(...products.map(product=>product.price));
    const max = Math.max(...products.map(product=>product.price));
    const range = max-min;

    setPriceRange({
      min: range*values[0]/100+min,
      max: range*values[1]/100+min
    })
  },[values,products])

 useEffect(()=>{
  setValues([0,100]);

 },[products])
  return (
    <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-10 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">

      {/* LEFT */}
      <div className="flex flex-col gap-6 w-full">

        <h2 className="text-xl sm:text-2xl font-bold">Department</h2>

        <ul style={{userSelect:"none"}} className="flex flex-col gap-3 text-sm sm:text-base">
         {categories.map((el)=>(
          <li onClick={()=>{
            setSelectedCategory(el)
            fetchProducts("",el)
          }}key={el} className={`"hover:text-[#7fad39] text-[${selectedCategory==el ? "#7fad39":"black"}] cursor-pointer"`}>
            {el}
            </li>
         ))}
        </ul>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Price</h2>
          <PriceRangeSlider priceRange={priceRange} values={values} setValues={setValues} />
        </div>

        {/* <h2 className="text-xl sm:text-2xl font-bold">Colors</h2>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {["White", "Orange", "Red", "Black", "Blue", "Green"].map((c) => (
            <div key={c} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border"
                style={{ background: c.toLowerCase() }}
              />
              <p>{c}</p>
            </div>
          ))}
        </div> */}
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-6">

        <h2 className="text-2xl sm:text-3xl font-bold border-b-4 border-[#7fad39] w-fit">
          Sale Off
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.filter(el=>el.price>=priceRange.min && el.price<=priceRange.max).map((el)=>(
            <Link key={el._id} to={"/product/"+el._id}><Product item={el}/></Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= PRODUCT ================= */

function Product({item}) {
  
  return (
    <div className="text-center group">

      <div className={`relative overflow-hidden h-[250px] sm:h-[300px]  bg-cover bg-center`} style={{backgroundImage: `url("${import.meta.env.VITE_BACKEND_HOST+"/image/images/"+item?.images?.[0]}")` }}>

        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -20%
        </span>

        {/* Hover buttons */}
        <div className="absolute bottom-[-50px] group-hover:bottom-5 left-0 right-0 flex justify-center gap-3 transition-all duration-500">
          <button className="p-2 bg-white rounded-full shadow"><FaHeart /></button>
          <button className="p-2 bg-white rounded-full shadow"><ImLoop /></button>
          <button className="p-2 bg-white rounded-full shadow"><FaCartPlus /></button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-2">{item.category}</p>
      <p className="font-semibold">{item.title}</p>
      <p>
        <strong>INR {item.price}</strong>{" "}
        <del className="text-gray-400">INR{Number(item.price/80*100).toFixed(2)}</del>
      </p>
    </div>
  );
}

/* ================= RANGE ================= */

function PriceRangeSlider({values, setValues, priceRange}) {
 

  return (
   <>
   <Range
      label="Select your value"
      step={1}
      min={0}
      max={100}
      values={values}
      onChange={(values) => setValues(values)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "5px",
            width: "100%",
            backgroundImage:`linear-gradient(to right, #e3dede ${values[0]}%, red ${values[1]}%, red ${values[1]}%, #e3dede ${values[1]}%)`
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          key={props.key}
          style={{
            ...props.style,
            height: "20px",
            width: "20px",
            borderRadius:"50%",
            backgroundColor: "red",
          }}
        />
      )}
    />
      <p className="py-2"> Price: {priceRange.min} - {priceRange.max}
      </p>
   </>
  );
}