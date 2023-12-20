import Link from "next/link";


export default function StatsCard({ bookName, number }) {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex items-center justify-center p-6">
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-lg p-6 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-700 font-bold text-xl mb-2">{bookName}</div>
          <p className="text-gray-700 text-base">Total Number of Book Clubs: {number}</p>
        </div>
      </div>
    </div>
  );
}
