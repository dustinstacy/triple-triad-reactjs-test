import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/home">
                        Home
                    </NavLink>
                    <NavLink to="/setup">
                        Setup
                    </NavLink>
                    <NavLink to="/match">
                        Match
                    </NavLink>
                    <NavLink to="/gameover">
                        Game Over
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;