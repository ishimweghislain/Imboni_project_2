import React from 'react';

const Teacher_chat = () => {
  const chats = [
    { id: 1, name: 'John Doe', lastMessage: 'Let’s discuss the project details.', activeAgo: 'Active 2hrs ago' },
    { id: 2, name: 'Mary Smith', lastMessage: 'Thank you for the feedback!', activeAgo: 'Active 4hrs ago' },
    { id: 3, name: 'Paul Johnson', lastMessage: 'Can we schedule a meeting tomorrow?', activeAgo: 'Active 1hr ago' },
    { id: 4, name: 'Sarah Brown', lastMessage: 'I’ll send you the revised document.', activeAgo: 'Active now' },
    { id: 5, name: 'Emily White', lastMessage: 'Got it. Thanks!', activeAgo: 'Active 3hrs ago' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg text-gray-800 h-[590px]">
      <h2 className="text-xl font-semibold mb-4 text-[#f44336]">Chats</h2>
      <div
        className="space-y-4 overflow-y-scroll h-[520px]"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none', 
        }}
      >
        <style>
          {`
            /* Hide scrollbar for Chrome, Safari, and Edge */
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center space-x-4 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors duration-300"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">
                {chat.name.charAt(0)} {/* First letter of the name */}
              </div>
            </div>

            {/* Chat Details */}
            <div className="flex flex-col">
              <h3 className="text-gray-700 font-semibold">{chat.name}</h3>
              <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
              <span className="text-gray-500 text-xs">{chat.activeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teacher_chat;
