import React from "react";
import { shallow } from "enzyme";
import { findJSXByAttr } from "../testUtils";

import CalendarHeader from "../../components/Calendar/CalendarHeader";

const setup = (props = {}, state = null) => {
    return shallow(<CalendarHeader {...props} />);
};

test("check if CalendarHeader runs successfully", () => {
    const wrapper = setup();
});

test("check if calendar-calendarHeader runs successfully", () => {
    const wrapper = setup();
    const CalendarHeader = findJSXByAttr(wrapper, "calendar-calendarHeader");
    expect(CalendarHeader.length).toBe(1);
});
