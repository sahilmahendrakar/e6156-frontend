import Link from "next/link";
import BookClubCard from "../widgets/bookclub-card";

export default function Page() {
  return (
    <div>
      <h1 class="semi-bold p-6">Hello, this is the User page!</h1>
      <h2 class="text-xl semi-bold p-6">You can see your bookclubs here:</h2>
      <BookClubCard
        bookclub_name={"Sanmati's Bookclub"}
        book_title={"The Life of Shilpa Chaudhary"}
        organizer={"Sanmati Chaudhary"}
        date={"Dec 20"}
      ></BookClubCard>
      <div class="flex flex-col items-center justify-center">
        <Link href="/create-bookclub">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Create a Bookclub
          </button>
        </Link>
      </div>
    </div>
  );
}
