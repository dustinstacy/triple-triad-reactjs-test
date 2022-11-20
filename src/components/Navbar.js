import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/Start">
                        Start
                    </NavLink>
                    <NavLink to="/Setup">
                        Setup
                    </NavLink>
                    <NavLink to="/Match">
                        Match
                    </NavLink>
                    <NavLink to="/MatchEnd">
                        Match End
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;