export default function BookingCard({ booking }) {
  return (
    <div className="bg-white shadow rounded-lg p-3 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{booking.lodge?.name}</h3>
        <p className="text-sm text-gray-600">
          {booking.checkIn} → {booking.checkOut}
        </p>
      </div>
      <p className="font-bold text-blue-700">₦{booking.totalPrice}</p>
    </div>
  );
}
