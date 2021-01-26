import { Story } from "@storybook/react/types-6-0";
import { LoadingSpinner } from "./loading-spinner";

export default {
  title: "Loading spinner",
  decorators: [
    (Story: Story): JSX.Element => (
      <div
        style={{
          width: "340px",
          height: "340px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Default = (): JSX.Element => <LoadingSpinner />;
export const Smaller = (): JSX.Element => <LoadingSpinner size={16} />;
export const DifferentColor = (): JSX.Element => (
  <LoadingSpinner color="#21698c" />
);
