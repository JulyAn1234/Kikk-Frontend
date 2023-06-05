import { Avatar, Box, Button } from "@mui/material";
import Link from "next/link";
import Image from 'next/image';

const Header = ({ children }) => {
  return (
    <header style={{ transform: "scale(0.75)" }}>
      <Link href="/">
      <Image src="/images/Logotype1.png" alt="My Image" width={380} height={80} />
      </Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {children}
      </Box>

    </header>
  );
};



export default Header;
