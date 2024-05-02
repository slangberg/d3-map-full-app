import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions";
import Logo from "../assets/logo.svg";
import { selectAuthUser } from "../store/selectors";
const ApplicationHeader = () => {
  const user = useSelector(selectAuthUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const genAvatar = () =>
    `${user?.firstName.charAt(0).toUpperCase()} ${user?.lastName
      .charAt(0)
      .toUpperCase()} `;

  const menuItems = [
    {
      text: "Profile",
      action: () => {
        handleCloseUserMenu();
        navigate("/profile");
      },
    },
    {
      text: "Logout",
      action: () => dispatch(logout()),
    },
  ];

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Box sx={{ mr: 1 }}>
          <img
            src={Logo}
            height={35}
            style={{ position: "relative", top: 2 }}
          />
        </Box>
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          textAlign="center"
          to="/list"
          sx={{
            mr: 2,
            fontFamily: "bayon",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Datalous
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>{genAvatar()}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {menuItems.map(({ text, action }) => (
              <MenuItem key={text} onClick={action}>
                <Typography textAlign="center">{text}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationHeader;
