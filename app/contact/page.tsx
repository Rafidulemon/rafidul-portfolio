import type { Metadata } from "next";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import { getContent } from "../lib/content/store";

export const metadata: Metadata = {
  title: "Contact | Md. Rafidul Islam",
  description:
    "Get in touch with Md. Rafidul Islam for full-time roles, freelance projects and collaborations. Replies within 24 hours on business days.",
};

const ContactPage = async () => {
  const contact = await getContent("contact");

  return (
    <div className="w-full">
      <section aria-labelledby="contact-heading" className="mx-auto mt-4 w-full max-w-6xl md:mt-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
            Contact
          </span>
          <h1
            id="contact-heading"
            className="mt-4 font-poppins text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
          >
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              together
            </span>
          </h1>
          <p className="mt-4 text-base text-gray-700 dark:text-gray-300 md:text-lg">
            Have a role, a project or an idea? Send a message and I&apos;ll get back to you soon.
          </p>
        </div>

        <div className="mt-10 grid gap-8 min-[1024px]:grid-cols-[2fr_3fr] min-[1024px]:gap-10">
          <ContactInfo contact={contact} />
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
