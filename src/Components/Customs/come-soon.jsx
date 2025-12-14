import React from "react";
import { BookOpen, Clock, Zap, Users, Search, Settings } from "lucide-react";

const config = {
  title: "📚we still Cooking our website",
  subtitle:
    "We are currently curating the ultimate digital library experience. Get ready for seamless book management!",
  countdownDate: new Date("2026-03-20T00:00:00"),
  features: [
    {
      icon: BookOpen,
      name: "Vast Digital Catalog",
      description:
        "Thousands of titles across all genres, available at your fingertips.",
    },
    {
      icon: Users,
      name: "Personalized Shelves",
      description:
        "Track your reading progress and organize your favorite books easily.",
    },
    {
      icon: Search,
      name: "Advanced Discovery",
      description:
        "Smart search and filtering to help you find your next great read.",
    },
    {
      icon: Zap,
      name: "Blazing Fast Performance",
      description:
        "Optimized for speed, so you spend more time reading, less time waiting.",
    },
  ],
};

const useCountdown = (targetDate) => {
  const [time, setTime] = React.useState(
    targetDate.getTime() - new Date().getTime()
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(targetDate.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const getTimerComponents = (ms) => {
    // If the countdown is over
    if (ms < 0)
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };

    const totalSeconds = Math.floor(ms / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    const format = (unit) => String(unit).padStart(2, "0");

    return {
      days: format(days),
      hours: format(hours),
      minutes: format(minutes),
      seconds: format(seconds),
    };
  };

  return getTimerComponents(time);
};

const CountdownDisplay = ({ targetDate }) => {
  const timer = useCountdown(targetDate);

  const TimerUnit = ({ value, label }) => (
    <div className="flex flex-col items-center shadow-primary hover:scale-110 p-4 rounded-xl shadow-lg w-20 sm:w-24">
      <span className="text-4xl font-extrabold sm:text-5xl animate-bounce">
        {value}
      </span>
      <span className="text-xs font-medium uppercase mt-1 tracking-widest">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex space-x-4">
      <TimerUnit value={timer.days} label="Days" />
      <TimerUnit value={timer.hours} label="Hours" />
      <TimerUnit value={timer.minutes} label="Mins" />
      <TimerUnit value={timer.seconds} label="Secs" />
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const FeatureCard = ({ icon: Icon, name, description }) => (
  <div className="p-6 bg-base-300 hover:shadow-xl transition-shadow duration-300">
    <div className="flex flex-col items-center space-x-4">
      <div className="p-3 rounded-full bg-primary-100 text-primary-500">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-primary-700">{name}</h3>
    </div>
    <p className="mt-3 text-secondary-600 text-sm">{description}</p>
  </div>
);

const ComingSoonPage = () => {
  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl space-y-12">
        <header className="text-center space-y-4">
          <BookOpen
            className="w-16 h-16 mx-auto text-primary-500 animate-pulse"
            aria-hidden="true"
          />
          <h1 className="text-5xl font-extrabold text-primary-800 tracking-tight sm:text-6xl">
            {config.title}
          </h1>
          <p className="text-xl text-secondary-500 max-w-2xl mx-auto">
            {config.subtitle}
          </p>
        </header>

        <section className="flex flex-col items-center space-y-6">
          <h2 className="text-3xl font-bold flex items-center space-x-2">
            <Clock className="w-7 h-7" aria-hidden="true" />
            <span>Launching in...</span>
          </h2>
          <CountdownDisplay targetDate={config.countdownDate} />
        </section>

        {/* Features Section */}
        <section className="pt-8">
          <h2 className="text-3xl font-bold text-center mb-8 flex justify-center items-center space-x-2">
            <Settings className="w-7 h-7" aria-hidden="true" />
            <span>Features We're Cooking Up</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-fr gap-1">
            {config.features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComingSoonPage;
