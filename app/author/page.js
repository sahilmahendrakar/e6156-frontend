export default function Page() {
  return (
    <div>
      <h1 class="semi-bold p-6">Hello, this is the Author page!</h1>
      <h2 class="text-xl semi-bold p-6"> You can publish a book here:</h2>
      
      <div class="flex flex-col items-center justify-center">

      <form class="w-full max-w-sm bg-white p-6 rounded-lg">
  <div class="md:flex md:items-center mb-6 ">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="book-title">
        Book Title
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="book-title" type="text"  />
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="book-description">
        Description
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="book-description" type="text" />
    </div>
  </div>
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Post Book
      </button>
    </div>
  </div>
</form>
    </div>
    </div>
  
  )
}
