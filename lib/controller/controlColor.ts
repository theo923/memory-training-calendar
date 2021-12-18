import { isSameDay } from "date-fns";

const identifyDay = {
    0: "curDay",
    1: "beforeDay",
    2: "afterDay",
    3: "dayLastMonth",
    4: "dayNextMonth",
};

export const setTextColor = (result) => {
    switch (identifyDay[result]) {
        case "curDay":
            return "text-red-500";
        case "beforeDay":
            return "text-black";
        case "afterDay":
            return "text-black";
        case "dayLastMonth":
            return "text-stone-500";
        case "dayNextMonth":
            return "text-stone-500";
    }
};

export const setBgColor = (result) => {
    switch (identifyDay[result]) {
        case "curDay":
            return "#ffedd5";
        case "beforeDay":
            return "#fff";
        case "afterDay":
            return "#fff";
        case "dayLastMonth":
            return "#d1d5db";
        case "dayNextMonth":
            return "#d1d5db";
    }
};

export const dayIdentifier = (date: Date, target: Date) => {
    if (isSameDay(date, target)) return 0;
    if (date < target) {
        if (
            date.getFullYear() < target.getFullYear() ||
            date.getMonth() < target.getMonth()
        )
            return 3;
        return 1;
    }
    if (date > target) {
        if (
            date.getFullYear() > target.getFullYear() ||
            date.getMonth() > target.getMonth()
        )
            return 4;
        return 2;
    }
};
