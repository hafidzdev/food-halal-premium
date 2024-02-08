import PropTypes from "prop-types";
import { useRef } from "react";

import Stack from "@mui/material/Stack";
import { usePathname } from "@/routes/hooks/use-pathname";

import NavItem from "./nav-item";

// ----------------------------------------------------------------------

const useActiveLink = (path) => {
  const pathname = usePathname();

  // Check for an exact match or partial match
  const isActive =
    pathname === path || (path !== "/" && pathname.startsWith(path));

  return isActive;
};

export default function NavList({ data, depth, slotProps }) {
  const navRef = useRef(null);

  const active = useActiveLink(data.path);

  return (
    <>
      <NavItem
        ref={navRef}
        title={data.title}
        path={data.path}
        icon={data.icon}
        //
        depth={depth}
        hasChild={!!data.children}
        externalLink={!!data.path.includes("http")}
        //
        active={active}
        className={active ? "active" : ""}
        sx={depth === 1 ? slotProps?.rootItem : slotProps?.subItem}
      />
    </>
  );
}

NavList.propTypes = {
  data: PropTypes.object,
  depth: PropTypes.number,
  slotProps: PropTypes.object,
};

// ----------------------------------------------------------------------

function NavSubList({ data, depth, slotProps }) {
  return (
    <Stack spacing={0.5}>
      {data.map((list) => (
        <NavList
          key={list.title}
          data={list}
          depth={depth + 1}
          slotProps={slotProps}
        />
      ))}
    </Stack>
  );
}

NavSubList.propTypes = {
  data: PropTypes.array,
  depth: PropTypes.number,
  slotProps: PropTypes.object,
};
