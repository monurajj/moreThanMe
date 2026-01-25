"use client";
import { useState } from "react";

const testimonials = [
  { name: "", text: "Volunteering here changed my life!" },
  { name: "Rahul", text: "I learned so much and made great friends." },
  { name: "Priya", text: "We really make a difference together." },
];

function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="italic mb-2">&ldquo;{testimonials[index].text}&rdquo;</div>
      <div className="font-semibold mb-4">- {testimonials[index].name}</div>
      <button
        className="px-3 py-1 bg-gray-200 rounded mr-2"
        onClick={() => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))}
        aria-label="Previous testimonial"
      >
        &larr;
      </button>
      <button
        className="px-3 py-1 bg-gray-200 rounded"
        onClick={() => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))}
        aria-label="Next testimonial"
      >
        &rarr;
      </button>
    </div>
  );
}

export default TestimonialSlider; 