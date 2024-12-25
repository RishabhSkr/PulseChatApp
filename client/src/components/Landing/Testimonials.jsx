import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      content: "Pulse Chat has revolutionized how our team communicates. The real-time features are impressive!",
      author: "Sarah Johnson",
      role: "Product Manager at TechCorp"
    },
    {
      content: "The best chat application we've used. Security features give us peace of mind.",
      author: "Michael Chen",
      role: "CTO at StartupX"
    },
    {
      content: "Incredibly intuitive and reliable. Our team productivity has increased significantly.",
      author: "Emma Wilson",
      role: "Team Lead at InnovateCo"
    }
  ];

  return (
    <section className="bg-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-16">
          Loved by teams worldwide
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-xl">
              <p className="text-gray-300 text-lg mb-6">"{testimonial.content}"</p>
              <div>
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
