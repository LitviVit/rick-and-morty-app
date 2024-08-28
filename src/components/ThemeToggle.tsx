import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

interface Props {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<Props> = ({ mode, toggleTheme }) => {
  const tooltipTitle =
    mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';

  const icon = mode === 'light' ? <Brightness4 /> : <Brightness7 />;

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton color='inherit' onClick={toggleTheme}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
