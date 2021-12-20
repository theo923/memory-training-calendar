import { isSameDay } from "date-fns";

const identifyDay = {
    0: "curDay",
    1: "beforeDay",
    2: "afterDay",
    3: "dayLastMonth",
    4: "dayNextMonth",
    5: "targetDay",
    6: "white",
};

export const setTextColor = (result) => {
    switch (identifyDay[result]) {
        case "curDay":
            return "#ef4444";
        case "targetDay":
            return "#171717";
        case "beforeDay":
            return "#171717";
        case "afterDay":
            return "#171717";
        case "dayLastMonth":
            return "#78716c";
        case "dayNextMonth":
            return "#78716c";
        case "white":
            return "#fff";
    }
};

export const setBgColor = (result) => {
    switch (identifyDay[result]) {
        case "curDay":
            return "#fff";
        case "targetDay":
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
    if (isSameDay(date, target)) return 5;
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
