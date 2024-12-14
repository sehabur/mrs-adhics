import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Card, Typography } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";

import PeopleIcon from "@mui/icons-material/People";
import KeyIcon from "@mui/icons-material/Key";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import Link from "next/link";
import { grey } from "@mui/material/colors";

const menu = [
  {
    id: 1,
    title: "Users",
    href: "/admin/all-users",
    icon: <PeopleIcon />,
  },
  {
    id: 2,
    title: "Access requests",
    href: "/admin/access-requests",
    icon: <KeyIcon />,
  },
  {
    id: 3,
    title: "Pending access requests",
    href: "/admin/pending-access-request",
    icon: <FeedRoundedIcon />,
  },
  {
    id: 4,
    title: "Resolved access requests",
    href: "/admin/resolved-access-request",
    icon: <FeedRoundedIcon />,
  },
];

export default function RootLayout({ children }) {
  return (
    <Box sx={{ maxWidth: 1850, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 6, my: 3 }}>
        <Card
          variant="outlined"
          sx={{
            width: 240,
            height: 400,
            bgcolor: grey[100],
          }}
        >
          <Typography sx={{ fontSize: "1.3rem", mx: 2, my: 1 }}>
            Menu
          </Typography>
          <Divider />
          <List>
            {menu.map((item, index) => (
              <>
                <ListItem key={item.id} disablePadding>
                  <ListItemButton component={Link} href={item.href}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
                {/* <Divider /> */}
              </>
            ))}
          </List>
        </Card>
        <Box sx={{ width: 1000 }}>{children}</Box>
      </Box>
    </Box>
  );
}
