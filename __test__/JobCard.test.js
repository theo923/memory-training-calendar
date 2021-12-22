import React from "react";
import { shallow } from "enzyme";
import { findJSXByAttr } from "./testUtils";

import JobCard from "../components/JobCard";

const setup = (props = {}, state = null) => {
    return shallow(<JobCard {...props} />);
};

test("check if JobCard runs successfully", () => {
    const wrapper = setup();
});

test("check if component-jobCard runs successfully", () => {
    const wrapper = setup();
    const JobCard = findJSXByAttr(wrapper, "component-jobCard");
    expect(JobCard.length).toBe(1);
});
