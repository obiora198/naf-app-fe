export function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-500">
      <div className="relative flex items-center justify-center mb-4">
        {/* Outer gold ring */}
        <div className="h-16 w-16 border-4 border-naf-gold border-t-transparent rounded-full animate-spin"></div>

        {/* Inner navy circle with centered text */}
        <div className="absolute h-12 w-12 bg-naf-dark rounded-full flex flex-col items-center justify-center text-center">
          <span className="text-[10px] sm:text-xs font-extrabold leading-tight text-naf-gold tracking-tight">
            NAF <br /> Lodge
          </span>
        </div>
      </div>

      <p className="text-naf-dark font-medium text-lg animate-pulse">{text}</p>
    </div>
  );
}


export function InlineSpinner() {
  return (
    <div className="inline-block h-5 w-5 border-2 border-naf-gold border-t-transparent rounded-full animate-spin align-middle" />
  );
}
