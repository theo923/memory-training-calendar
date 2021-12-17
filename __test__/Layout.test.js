import React from "react";
import { shallow } from "enzyme";
import { findJSXByAttr } from "./testUtils";

import Layout from "../components/Layout";

const setup = (props = {}, state = null) => {
    return shallow(<Layout {...props} />);
};

test("check if Layout runs successfully", () => {
    const wrapper = setup();
});

test("check if component-layout runs successfully", () => {
    const wrapper = setup();
    const Layout = findJSXByAttr(wrapper, "component-layout");
    expect(Layout.length).toBe(1);
});
