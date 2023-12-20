import Link from "next/link";

export default function BookClubCard({ bookclub_name, book_title, organizer, date, isOrganizer }) {
  let updateButton;
  if (isOrganizer) {
    updateButton = (
      <div className="flex flex-col items-center justify-center">
        <Link href="/update-bookclub">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Update Bookclub
          </button>
        </Link>
      </div>
    );
  }

  return (
    //TODO NICOLE: 
    <Link href={{ pathname: '/bookclub', query: { bookclub_name, book_title } }}>
      <a>
        <div className="max-w-sm w-full lg:max-w-full lg:flex items-center justify-center p-6">
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-lg p-6 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="text-gray-700 font-bold text-xl mb-2">{bookclub_name}</div>
              <p className="text-gray-700 text-base">Reading: {book_title}</p>
            </div>
            <div className="flex items-center">
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{organizer}</p>
                <p className="text-gray-600">{date}</p>
              </div>
            </div>
            <div className="p-2"></div>
            {updateButton}
          </div>
        </div>
      </a>
    </Link>
  );
}
