import { Story } from "@storybook/react/types-6-0";
import { Nav } from "./index";

export default {
  title: "Nav",
  decorators: [
    (Story: Story): JSX.Element => (
      <div style={{ maxWidth: "1440px" }}>
        <Story />
      </div>
    ),
  ],
};

// 🙈 THE MENU IS OFF CENTER. I'll look into fixing it in the story eventually but it looks fine on the actual site

export const LightBackground = (): JSX.Element => <Nav />;
export const DarkBackground = (): JSX.Element => <Nav darkBackground />;
