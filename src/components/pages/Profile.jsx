import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  ShoppingBag,
  Heart,
  LogOut,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = ({setLoggedinStatus}) => {

  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [previewImage, setPreviewImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); //Ye actual file (image) store karta hai jo user select karta hai.
  const [showPopup, setShowPopup] = useState(false); // Ye modal (popup) open/close control karta hai

  async function fetchProfile() {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/profileimage", { credentials: "include" });
      if (!response.ok) return toast.error("Could not fetch profile!", { position: "botton-center" });
      response = await response.json();
      setProfileData(response.message);

    } catch (error) {
      toast.error("Could not fetch profile!", { position: "botton-center" });
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  //User file choose karta hai, file state me save hoti hai URL.createObjectURL → temporary preview banata hai use user ko turant image dikh jati hai
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));

    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      return toast.error("Please select an image");
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_HOST + "/profileimage",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        return toast.error("Upload failed", {position:"bottom-center"});
      }

      toast.success("Profile updated");
      setShowPopup(false);
      fetchProfile();
    } catch (err) {
      toast.error("Upload failed",{position:"bottom-center"});
    }
  };



  async function logoutHandler() {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/logout", { credentials: "include" });

      if (!response.ok) return toast.error("Could not logout. Please try again!", { position: "button-center" });

      toast.success("Logged out!", { position: "bottom-center" });
      setLoggedinStatus(false);
      navigator("/login")
    } catch (error) {
      toast.error("Could not logout. Please try again!", { position: "button-center" });
    }
  }
  return (
    <div className="min-h-screen bg-[#f5f5f5] py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar */}
        <div className="bg-white rounded-3xl shadow-sm p-6 h-fit">
          <div className="flex flex-col items-center text-center">
            <img
              src={profileData.profile}
              alt="profile"
              onClick={() => setShowPopup(true)}
              className="w-28 h-28 rounded-full object-cover border-4 border-[#7fad39]"
            />

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {profileData.name}
            </h2>

            <p className="text-gray-500 text-sm">
              {profileData.email}
            </p>
          </div>

          {/* Menu */}
          <div className="mt-8 space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#7fad39] text-white font-medium">
              <User size={18} />
              My Profile
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700">
              <ShoppingBag size={18} />
              My Orders
            </button>
            <Link
              to="/wishlist"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-gray-700"
            >
              <Heart size={18} />
              Wishlist
            </Link>

            <button onClick={logoutHandler} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition text-red-500">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-800">
                  Profile Information
                </h3>

              </div>

            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3 text-[#7fad39]">
                  <User size={20} />
                  <span className="font-semibold">Full Name</span>
                </div>

                <p className="text-gray-700 text-lg">
                  {profileData.name}
                </p>
              </div>

              {/* Email */}
              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3 text-[#7fad39]">
                  <Mail size={20} />
                  <span className="font-semibold">Email Address</span>
                </div>

                <p className="text-gray-700 text-lg">
                  {profileData.email}
                </p>
              </div>

              {/* Phone */}
              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3 text-[#7fad39]">
                  <Phone size={20} />
                  <span className="font-semibold">Phone Number</span>
                </div>

                <p className="text-gray-700 text-lg">
                  {profileData.phone}
                </p>
              </div>

              {/* Address */}
              <div className="border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3 text-[#7fad39]">
                  <MapPin size={20} />
                  <span className="font-semibold">Address</span>
                </div>

                <p className="text-gray-700 text-lg">
                  New York, USA
                </p>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Recent Orders
              </h3>

              <button className="text-[#7fad39] font-semibold hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-5">

              {/* Order */}
              {[1, 2, 3].map((order) => (
                <div
                  key={order}
                  className="border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div>
                    <p className="font-bold text-gray-800">
                      Order #OGN{1000 + order}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      2 Products • March 12, 2025
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <p className="font-bold text-lg text-[#7fad39]">
                      $120.00
                    </p>

                    <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                      Delivered
                    </span>
                  </div>
                </div>
              ))}

            </div>
            {showPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 mx-4">

                  {/* Header */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Change Profile Photo
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Upload a new profile picture
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="flex justify-center mt-6">
                    <img
                      src={previewImage || profileData.profile}
                      alt="profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-[#7fad39] shadow-lg"
                    />
                  </div>

                  {/* Upload Box */}
                  <label className="mt-6 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#7fad39] rounded-2xl cursor-pointer hover:bg-green-50 transition">

                    <span className="text-[#7fad39] font-medium">
                      Click to select image
                    </span>

                    <span className="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        setShowPopup(false);
                        setPreviewImage("");
                        setSelectedImage(null);
                      }}
                      className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={uploadImage}
                      className="flex-1 py-3 rounded-xl bg-[#7fad39] text-white font-medium hover:bg-[#6d9932] transition"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>

  );
};

export default Profile;