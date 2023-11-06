export default function PostSkeleton() {
  return Array(1)
    .fill(0)
    .map((el, index) => (
      <div key={index}>
        <div className="border border-transparent bg-white w-10/12 mt-3 h-fit mx-auto rounded-xl shadow-custom-shadow">
          <div className="w-4/12 sm:w-2/12 h-4 mt-10 mx-auto bg-gray-200 animate-pulse"></div>
          <div className="w-2/12 sm:w-1/12 h-4 mt-1 mx-auto bg-gray-200 animate-pulse"></div>
          <div className="w-12/12 h-4 mt-5 mx-6 bg-gray-200 animate-pulse"></div>
          <div className="w-12/12 h-4 mt-1 mx-6 bg-gray-200 animate-pulse"></div>
          <div className="w-12/12 h-4 mt-1 mx-6 bg-gray-200 animate-pulse"></div>
          <div className="w-12/12 h-4 mt-1 mx-6 bg-gray-200 animate-pulse"></div>
          <div className="w-12/12 h-4 mt-1 mx-6 bg-gray-200 animate-pulse"></div>
          <div className="w-12/12 h-4 mt-1 mx-6 bg-gray-200 animate-pulse"></div>
          <div className="w-12/12 h-4 mt-1 mx-6 bg-gray-200 animate-pulse"></div>
          <div className="w-12/12 h-4 mt-1 mx-6 bg-gray-200 animate-pulse"></div>
          <div className="w-12/12 h-4 mt-1 mx-6 bg-gray-200 animate-pulse"></div>
          <div className="w-12/12 h-4 mt-1 mx-6 bg-gray-200 animate-pulse"></div>
          <div className="w-12/12 h-4 mt-1 mx-6 bg-gray-200 animate-pulse"></div>
          <div className="w-9/12 h-4 mt-1 mb-10 mx-6 bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    ));
}
