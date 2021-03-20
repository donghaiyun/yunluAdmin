import Vue from 'vue';
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import {
  Dialog,
  DatePicker,
  TimePicker,
  Option,
  Select,
  Steps,
  Step,
  Tooltip,
  Button,
  Menu,
  Submenu,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  ButtonGroup,
  Table,
  TableColumn,
  Popover,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';
Vue.component(CollapseTransition.name, CollapseTransition);
Vue.use(Dialog);
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Option);
Vue.use(Select);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Tooltip);
Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);


Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
