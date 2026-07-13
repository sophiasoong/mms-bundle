// Thin re-export of the compiled Shoalter MMS design-system bundle.
// main.jsx guarantees window.ShoalterMMSDesignSystem_192af1 is populated
// (and window.React is the app's single React instance) before this module
// is ever imported.
const DS = window.ShoalterMMSDesignSystem_192af1;

export const {
  Icon,
  Avatar,
  Badge,
  Card,
  Chip,
  ImagePlaceholder,
  Table,
  Tag,
  Modal,
  Button,
  Checkbox,
  Dropdown,
  Dropzone,
  IconButton,
  Input,
  NumberInput,
  Radio,
  Searchbar,
  Select,
  ActionPanel,
  PageTitle,
  Sidebar,
  Topbar,
  Breadcrumb,
  Pagination,
  Step,
  Footer,
} = DS;

export default DS;
