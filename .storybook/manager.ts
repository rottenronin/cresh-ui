import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const theme = create({
  base: "light",
  brandTitle: "Cresh UI",
  brandImage: "/cresh-logo.svg",
  brandTarget: "_self",
});

addons.setConfig({
  theme: theme,
  panelPosition: "bottom",
  layoutCustomisations: {
    showPanel: () => false,
    showToolbar: () => false,
  },
  sidebar: {},
});
