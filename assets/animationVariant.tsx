export const buttonVariant = (color: string, bgcolor: string) => {
    return {
        hoverCart: {
            outline: "none",
            backgroundColor: bgcolor || "#990D35",
            color: color || "#F5F0F6",
            borderRadius: "40px",
        },
        initialCart: {
            outline: "none",
            backgroundColor: bgcolor || "#F0B5B3",
            color: color || "#352208",
            borderRadius: "10px",
        },
        hoverBuy: {
            outline: "none",
            backgroundColor: bgcolor || "#347FC4",
            color: color || "#F5F0F6",
            borderRadius: "40px",
        },
        initialBuy: {
            outline: "none",
            backgroundColor: bgcolor || "#D4DCFF",
            color: color || "#352208",
            borderRadius: "10px",
        },
        hoverSearch: {
            outline: "none",
            backgroundColor: bgcolor || "#73E2A7",
            color: color || "#1B512D",
            borderRadius: "40px",
        },
        initialSearch: {
            outline: "none",
            backgroundColor: bgcolor || "#DEF4C6",
            color: color || "#352208",
            borderRadius: "10px",
        },
        disabledHoverSearch: {
            outline: "none",
            backgroundColor: bgcolor || "#402039",
            color: color || "#BADEFC",
            borderRadius: "20px",
        },
        disabledSearch: {
            outline: "none",
            backgroundColor: bgcolor || "#525252",
            color: color || "#BADEFC",
            borderRadius: "10px",
        },
        flat: {
            outline: "none",
            backgroundColor: bgcolor || "#525252",
            color: color || "#BADEFC",
            borderRadius: "20px",
        }
    }
};

export const motionBoxVariant = {
    initial: {
        opacity: 0.5,
    },
    animate: {
        opacity: 1,
        scale: 0.8,
    },
    hover: {
        scale: 1.5,
    }
};
