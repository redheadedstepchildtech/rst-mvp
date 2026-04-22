import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend integration will go here later
    alert("Message sent!");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name (optional)"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email (required)"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Select a category</option>
        <option value="question">Question</option>
        <option value="broken">Something’s broken</option>
        <option value="idea">Idea / suggestion</option>
        <option value="other">Other</option>
      </select>

      <textarea
        name="message"
        placeholder="What’s going on?"
        value={formData.message}
        onChange={handleChange}
        required
      />

      <button type="submit">Send message</button>
    </form>
  );
}