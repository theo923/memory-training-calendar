import { getFullDate } from "../get/getFullDate";

export const initailizeTask = (setUserTasks, target) => {
    setUserTasks((prev) => {
        return { ...prev, [getFullDate(target)]: [] };
    });
};

export const addTask = (setUserTasks, target, inputVal) => {
    setUserTasks((prev) => {
        return {
            ...prev,
            [getFullDate(target)]: [...prev[getFullDate(target)], inputVal],
        };
    });
};

export const controlTaskTitle = (setInputVal, e) => {
    setInputVal((prev) => {
        return { ...prev, taskTitle: e.target.value };
    });
};

export const controlTaskDescription = (setInputVal, e) => {
    setInputVal((prev) => {
        return { ...prev, taskDescription: e.target.value };
    });
};
