const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daysArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const formatDateMonthYear = (today: Date, offsetTime: number) => {
  const date = today.getDate();
  const month = monthsArray[today.getMonth()];
  const year = today.getFullYear();
  return { date, month, year };
};

export const TodayData = (today: Date, offsetTime: number) => {
  const { date, month, year } = formatDateMonthYear(today, offsetTime);
  const day = "Today";
  const weekOfTheDay = daysArray[today.getDay()];
  const dateStr = `${date} ${month} ${year}`;

  return { day, weekOfTheDay, date: dateStr };
};

export const TomorrowData = (today: Date, offsetTime: number) => {
  const { date, month, year } = formatDateMonthYear(today, offsetTime);
  const day = "Tomorrow";
  const weekOfTheDay = daysArray[(today.getDay() + 1) % 7];

  const dateStr = `${date + 1} ${month} ${year}`;

  return { day, weekOfTheDay, date: dateStr };
};
export const YesterdayData = (today: Date, offsetTime: number) => {
  const { date, month, year } = formatDateMonthYear(today, offsetTime);
  const day = "Yesterday";
  const weekOfTheDay = daysArray[today.getDay() - 1];

  const dateStr = `${date - 1} ${month} ${year}`;

  return { day, weekOfTheDay, date: dateStr };
};

export const NextDaysData = (today: Date, offsetTime: number) => {
  const { date, month, year } = formatDateMonthYear(today, offsetTime);

  const nextDaysData = [];
  for (let i = 2; i < 5; i++) {
    const dayIndex = (today.getDay() + i) % 7;
    const day = daysArray[dayIndex];
    const dateStr = `${date + i} ${month} ${year}`;

    nextDaysData.push({ weekOfTheDay: day, date: dateStr });
  }
  return nextDaysData;
};

export const transformToDayOfTheWeek = (data: string) => {
  const dateObject = new Date(data);

  return dateObject.toLocaleDateString("en-US", { weekday: "long" });
};
