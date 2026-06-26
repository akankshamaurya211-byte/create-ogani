import { useState } from "react";
import { toast } from "react-toastify";

export default function Footer() {

  const [email, setEmail] = useState("");

  async function handleSubscribe(data) {
    try {
      if (!email) {
        toast.error("Please enter an email", {position:"bottom-center",autoClose:5000});
        return;
      }

      const response = await fetch(
        import.meta.env.VITE_BACKEND_HOST + "/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error( "Subscription failed");
        return;
      }

      toast.success("Subscribed successfully!");
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

    return (
        <section className="bg-[#7fad39] py-20 mt-10">
            <div className="max-w-4xl mx-auto text-center px-4">
                <h3 className="text-5xl font-bold text-white mb-6">
                    Subscribe Newsletter
                </h3>

                <p className="text-green-100 text-lg mb-10">
                    Get updates about fresh products and exclusive offers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full sm:w-[400px] px-6 py-4 rounded-2xl outline-none"
                    />

                    <button onClick={handleSubscribe}className="bg-black hover:bg-gray-900 transition text-white px-8 py-4 rounded-2xl font-semibold">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    )
}