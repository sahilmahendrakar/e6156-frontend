import Link from "next/link";
import BookClubCard from "../widgets/bookclub-card";

export default function Page() {
  return (
    <div>
      <h1 class="semi-bold p-6">Hello, this is the Organizer page!</h1>
      <h2 class="text-xl semi-bold p-6">You can see the bookclubs you have created here:</h2>
      <BookClubCard
        bookclub_name={"Bunnies"}
        book_title={"OMG"}
        organizer={"Your mom"}
        date={"Dec 20"}
        isOrganizer={true}
      ></BookClubCard>
    </div>
  );
}
