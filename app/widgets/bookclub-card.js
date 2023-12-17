import Link from "next/link";

export default function BookClubCard({bookclub_name, book_title, organizer, date, isOrganizer}) {
    let updateButton;
    if (isOrganizer) {
        updateButton = <div class="flex flex-col items-center justify-center">
        <Link href="/update-bookclub">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Update Bookclub
          </button>
        </Link>
      </div>
    }
    return (
        <div class="max-w-sm w-full lg:max-w-full lg:flex items-center justify-center p-6">
<div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-lg p-6 flex flex-col justify-between leading-normal">
  <div class="mb-8">
    <div class="text-gray-700 font-bold text-xl mb-2">{bookclub_name}</div>
    <p class="text-gray-700 text-base">Reading: {book_title}</p>
  </div>
  <div class="flex items-center">
    <div class="text-sm">
      <p class="text-gray-900 leading-none">{organizer}</p>
      <p class="text-gray-600">{date}</p>
    </div>
  </div>
  <div class="p-2"></div>
  {updateButton}
</div>
</div>
    )
}


