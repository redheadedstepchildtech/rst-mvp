import ContactHeader from "./ContactHeader";
import ContactForm from "./ContactForm";
import ContactAltInfo from "./ContactAltInfo";
import ContactClosing from "./ContactClosing";

export default function ContactPage() {
  return (
    <div className="contact-container">
      <ContactHeader />
      <ContactForm />
      <ContactAltInfo />
      <ContactClosing />
    </div>
  );
}