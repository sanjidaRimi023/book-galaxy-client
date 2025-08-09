"use client";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Code, Eye, Headphones, ThumbsUp } from "lucide-react";

const IconSatisfaction = () => <ThumbsUp className="w-6 h-6 text-white" />;
const IconCode = () => <Code className="w-6 h-6" />;
const IconDesign = () => <Eye className="w-6 h-6 text-white" />;
const IconSupport = () => <Headphones className="w-6 h-6 text-white" />;

const teamMembers = [
  {
    name: "Sharafat Hussain",
    role: "Founder",
    img: "https://pagedone.io/asset/uploads/1696238374.png",
    bio: "Visionary leader driving Book Galaxy’s mission to new frontiers.",
  },
  {
    name: "Sanjida Rimi",
    role: "Co-Founder",
    img: "https://pagedone.io/asset/uploads/1696238396.png",
    bio: "Passionate about connecting readers with their next great story.",
  },
  {
    name: "Utshob Saha",
    role: "Chairman",
    img: "https://pagedone.io/asset/uploads/1696238411.png",
    bio: "Guiding the team with strategic insight and a love for books.",
  },
  {
    name: "Ripa Akter",
    role: "CEO",
    img: "https://pagedone.io/asset/uploads/1696238425.png",
    bio: "Leading innovation and growth with unstoppable energy.",
  },
];

const whyUsFeatures = [
  {
    icon: <IconSatisfaction />,
    title: "100% Client Satisfaction",
    description:
      "We provide professional support and clean code to ensure our clients are always happy with the result.",
  },
  {
    icon: <IconDesign />,
    title: "User-Friendly Design",
    description:
      "Our designs are intuitive, easy to use, and highly customizable to fit your brand perfectly.",
  },
  {
    icon: <IconCode />,
    title: "Impressive & Modern",
    description:
      "An exciting, modern look gives a wonderful first impression and helps attract and retain website visitors.",
  },
  {
    icon: <IconSupport />,
    title: "24/7 Quick Support",
    description:
      "We provide round-the-clock custom support because we never leave our customers without help.",
  },
];

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 bg-teal-300 rounded-full w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function TeamMemberCard({ name, role, img, bio }) {
  return (
    <div className="group relative w-48 text-center">
      <motion.div
        className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-teal-800 bg-opacity-70 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-full text-white">
          <p className="text-sm italic mb-3">"{bio}"</p>
        </div>
      </motion.div>
      <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
        {name}
      </h3>
      <p className="text-teal-500 dark:text-teal-400 font-medium">{role}</p>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="order-2 lg:order-1 flex flex-col">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Why Choose Book Galaxy?
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
            We're more than just a team; we're a promise of quality, dedication,
            and unparalleled support.
          </p>
          <div className="space-y-6 max-w-lg">
            {whyUsFeatures.map((feature, i) => (
              <FeatureItem key={i} {...feature} />
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 flex flex-col">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Meet The Passionate Minds
            </h2>
          </div>
          <p className="text-lg mb-8 max-w-lg">
            The experts combining creativity, expertise, and a love for stories.
          </p>
          <div className="flex flex-wrap gap-8 items-center justify-center lg:justify-start">
            {teamMembers.map(({ name, role, img, bio }) => (
              <TeamMemberCard
                key={name}
                name={name}
                role={role}
                img={img}
                bio={bio}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
