import React from "react";
import Map from "@/components/sections/contact/Map";
import ContactForm from "@/components/sections/contact/ContactForm";

const Contact = () => {
  return (
    <div className="w-full">
      <Map />
      <div className="flex flex-col lg:flex-row items-stretch py-10">
        <div className="w-full lg:w-1/2 p-8 bg-gradient-to-b from-primary to-primary/30 m-4 rounded-3xl flex flex-col">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground tracking-tight mb-6 font-sans">
            Get In Touch
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl">
            In an era of automation, empathy is the true competitive advantage. 
            We build AI systems that see the world as it is — human, messy, and full of potential.
          </p>

          {/* Info Cards */}
          <div className="space-y-5">
            {/* Headquarters */}
            <div className="bg-card border border-border py-4 px-5 rounded-xl shadow-md">
              <h4 className="text-foreground text-xl font-semibold mb-1">
                Our Headquarters
              </h4>
              <p className="text-muted-foreground text-base">
                1005 Lodha Supremus, Opp MTNL Building,
                <br />
                Saki Vihar Road, Andheri (E), Mumbai – 400072
              </p>
            </div>

            <div className="bg-card border border-border py-4 px-5 rounded-xl shadow-md">
              <h4 className="text-foreground text-xl font-semibold mb-1">
                Email
              </h4>
              <p className="text-muted-foreground text-base">
                <a
                  href="mailto:info@cygnus.com"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  info@cygnus.com
                </a>
              </p>
            </div>

            <div className="bg-card border border-border py-4 px-5 rounded-xl shadow-md">
              <h4 className="text-foreground text-xl font-semibold mb-1">
                Phone
              </h4>
              <p className="text-muted-foreground text-base">
                <a
                  href="tel:+912224567890"
                  className="hover:text-foreground hover:underline transition-colors"
                >
                  +91 22 2456 7890
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;