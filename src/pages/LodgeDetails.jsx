import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../api/axios";
import { Pencil, Save, X, Loader2 } from "lucide-react";

export default function LodgeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});

  const { data: lodge, isLoading, isError } = useQuery({
    queryKey: ["admin-lodge", id],
    queryFn: async () => (await axiosClient.get(`/admin/lodges/${id}`)).data,
  });

  const { mutate: updateLodge, isPending: saving } = useMutation({
    mutationFn: async (updatedData) =>
      (await axiosClient.put(`/admin/lodges/${id}`, updatedData)).data,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-lodge", id]);
      setIsEditing(false);
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading lodge details...
      </div>
    );

  if (isError || !lodge)
    return (
      <div className="text-center py-20 text-red-600">
        Lodge not found or failed to load.
      </div>
    );

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    updateLodge(form);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-6 sm:px-10 lg:px-24">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header / Hero */}
        <div className="relative h-64 bg-gray-200">
          <img
            src={lodge.imageUrl || "/images/naf-conf-center.jpg"}
            alt={lodge.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex justify-between items-end p-6">
            <div>
              <h1 className="text-3xl font-bold text-white">{lodge.name}</h1>
              <p className="text-gray-200">{lodge.base}</p>
            </div>

            <button
              onClick={() => {
                setIsEditing(!isEditing);
                setForm(lodge);
              }}
              className="bg-naf-gold text-naf-dark font-semibold px-4 py-2 rounded-lg hover:bg-[#c4a030] transition"
            >
              {isEditing ? (
                <span className="flex items-center gap-2">
                  <X size={18} /> Cancel
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Pencil size={18} /> Edit
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Lodge Info */}
          <div>
            <h2 className="text-2xl font-semibold text-naf-dark mb-4 border-b pb-2">
              Lodge Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-naf-blue outline-none"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{lodge.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Base
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="base"
                    value={form.base || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-naf-blue outline-none"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{lodge.base}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Price Per Night
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="pricePerNight"
                    value={form.pricePerNight || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-naf-blue outline-none"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    ₦{lodge.pricePerNight?.toLocaleString()}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Rating
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    value={form.rating || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-naf-blue outline-none"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">
                    {lodge.rating || "4.8"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold text-naf-dark mb-4 border-b pb-2">
              Description
            </h2>
            {isEditing ? (
              <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-naf-blue outline-none"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {lodge.description ||
                  "No description available for this lodge."}
              </p>
            )}
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-naf-gold text-naf-dark font-semibold px-6 py-3 rounded-lg hover:bg-[#c4a030] transition flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} /> Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Back button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-naf-blue hover:underline font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
