import Link from 'next/link'

export default function Page() {
  return <>
    <h1 class="semi-bold p-6">Hello, Welcome to the Home page!</h1>
    <div class="flex flex-col items-center justify-center">
      <a href="https://e6156-users-402619.ue.r.appspot.com">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Sign in
        </button>


      </a>
    </div>
  </>
}
