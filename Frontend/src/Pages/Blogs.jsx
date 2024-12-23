import React, { useState } from 'react';

// Blog data (title, description, image source)
const blogPosts = [
  { title: "Introduce Imboni in Crystal Fountain Academy", description: "This blog discusses the introduction of Imboni in the academy.", image: "/post1.jpg", fullContent: "Full details about the Imboni introduction in Crystal Fountain Academy." },
  { title: "New Developments in Kigali", description: "Exploring the latest developments in Kigali.", image: "/post2.jpg", fullContent: "This blog provides in-depth insights into the latest developments happening in Kigali." },
  { title: "Innovative Education Methods", description: "Revolutionizing education with innovative methods.", image: "/post3.jpg", fullContent: "Explore the new teaching methods being introduced in schools across the country." },
  { title: "Empowering Women in Tech", description: "Highlighting women's role in technology and innovation.", image: "/post4.jpg", fullContent: "This blog discusses how women are leading the charge in the tech industry." },
  { title: "Tech Startups to Watch in 2024", description: "A look at the upcoming tech startups that are changing the game.", image: "/post5.jpg", fullContent: "Read about the most promising tech startups to keep an eye on in 2024." },
  { title: "Sustainable Agriculture Innovations", description: "Advances in sustainable farming techniques.", image: "/post6.jpg", fullContent: "This blog explores innovations in sustainable agriculture that are shaping the future." },
  { title: "Rwandan Culture in Modern Times", description: "How Rwanda’s culture is evolving in the modern world.", image: "/post7.jpg", fullContent: "This post dives deep into how Rwandan culture has adapted and thrived in modern society." },
  { title: "The Future of Renewable Energy", description: "The role of renewable energy in shaping the future.", image: "/post8.jpg", fullContent: "This blog discusses the future of renewable energy sources and their impact on the environment." },
  { title: "AI in Healthcare", description: "The impact of artificial intelligence in the healthcare industry.", image: "/post9.jpg", fullContent: "Read about the breakthroughs AI is making in healthcare, from diagnostics to treatment." },
  { title: "Tourism in Rwanda", description: "Exploring Rwanda’s growing tourism industry.", image: "/post10.jpg", fullContent: "This blog highlights Rwanda’s thriving tourism industry and its major attractions." },
];

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle click and display full content
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  // Filter blogs based on search term
  const filteredBlogs = blogPosts.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 mt-16">
      <div className="container mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search blogs by title..."
            className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Latest Blog (Biggest) */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-6 text-[#f44336]"> Find New Updates!</h2>
          {selectedBlog ? (
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <h3 className="text-3xl font-bold mb-4">{selectedBlog.title}</h3>
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-[400px] object-cover rounded-lg mb-4"
              />
              <p>{selectedBlog.fullContent}</p>
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <h3 className="text-3xl font-bold mb-4">No blog selected</h3>
              <p>Select a blog to read more.</p>
            </div>
          )}
        </div>

        {/* Other Blogs (Small Previews) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-xl cursor-pointer hover:scale-105 transform transition-all duration-300"
              onClick={() => handleBlogClick(blog)}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[200px] object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-[#f44336] mb-2">{blog.title}</h3>
              <p className="text-gray-400">{blog.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
