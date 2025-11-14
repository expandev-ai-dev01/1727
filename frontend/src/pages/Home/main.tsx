export const HomePage = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to NoteBox</h2>
      <p className="text-lg text-gray-600 mb-8">Your lightweight note-taking application</p>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
        <p className="text-gray-700">Start creating quick notes with title and content.</p>
        <p className="text-gray-700 mt-2">Search and categorize your notes with tags.</p>
      </div>
    </div>
  );
};

export default HomePage;
