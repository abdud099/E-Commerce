export default function ErrorStripe() {
  return (
    <div className="py-10 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Something went wrong...</h2>
      <p className="text-gray-600 text-lg">
        Please try again or contact support if the problem persists.
      </p>
    </div>
  );
}
