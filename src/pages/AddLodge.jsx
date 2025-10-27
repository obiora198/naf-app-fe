import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../api/axios";
import { Loader2, Save } from "lucide-react";

export default function AddLodge() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    base: "",
    pricePerNight: "",
    rating: "",
    description: "",
    imageUrl: "",
  });

  const { mutate: addLodge, isPending } = useMutation({
    mutationFn: async (newLodge) =>
      (await axiosClient.post("/admin/lodges", newLodge)).data,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-lodges"]);
      navigate("/admin/lodges");
    },
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    addLodge(form);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-6 sm:px-10 lg:px-24">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-naf-dark mb-6">
          Add New Lodge
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-naf-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Base</label>
              <input
                type="text"
                name="base"
                value={form.base}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-naf-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Price Per Night (₦)
              </label>
              <input
                type="number"
                name="pricePerNight"
                value={form.pricePerNight}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-naf-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Rating</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-naf-blue outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/lodge.jpg"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-naf-blue outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-naf-blue outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="bg-naf-gold text-naf-dark font-semibold px-6 py-3 rounded-lg hover:bg-[#c4a030] transition flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Saving...
                </>
              ) : (
                <>
                  <Save size={18} /> Save Lodge
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/admin/lodges")}
            className="text-naf-blue hover:underline font-medium"
          >
            ← Back to Lodges
          </button>
        </div>
      </div>
    </div>
  );
}
