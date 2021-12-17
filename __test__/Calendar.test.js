import React from "react";
import { shallow } from "enzyme";
import { findJSXByAttr } from "./testUtils";

import Calendar from "../components/Calendar";

const setup = (props = {}, state = null) => {
    return shallow(<Calendar {...props} />);
};

test("check if Calendar runs successfully", () => {
    const wrapper = setup();
});

test("check if component-calendar runs successfully", () => {
    const wrapper = setup();
    const Calendar = findJSXByAttr(wrapper, "component-calendar");
    expect(Calendar.length).toBe(1);
});
