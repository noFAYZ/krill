const cp = require('child_process');

const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const svgrPlugin = require('esbuild-plugin-svgr');
const { sassPlugin } = require('esbuild-sass-plugin');

const packagejson = require('./package.json');
const spawn = (command, args) => {
  const childProcess = cp.spawn(command, args, {
    shell: true,
    stdio: 'inherit'
  });
  return new Promise((resolve, reject) => {
    childProcess.once('exit', (code) => {
      if (code !== 0) {
        return reject();
      }
      return resolve();
    });
    childProcess.once('error', (err) => reject(err));
  });
};

const WATCH = !!process.env.WATCH;

const esbuildConf = (format) => ({
  entryPoints: [
    'src/index.ts',
    'src/theme/index.ts',
    'src/components/Divider/index.ts',
    'src/components/Tabs/index.ts',
    'src/components/Tooltip/index.ts',
    'src/components/Typography/index.ts',
    'src/components/Toggle/index.ts',
    'src/components/InputField/index.ts',
    'src/components/Button/index.ts',
    'src/components/Icons/index.ts',
    'src/components/CodeInput/index.ts',
    'src/components/CircularProgress/index.ts',
    'src/components/ActionBar/index.ts',
    'src/components/Checkbox/index.ts',
    'src/components/ChipInput/index.ts',
    'src/components/CommandMenu/index.ts',
    'src/components/Drawer/index.ts',
    'src/components/ListItem/index.ts',
    'src/components/ProgressBar/index.ts',
    'src/components/Sidebar/index.ts',
    'src/components/Table/index.ts',
    'src/components/Accordion/index.ts',
    'src/components/AnimatedArrowIcon/index.ts',
    'src/components/Badge/index.ts',
    'src/components/Breadcrumbs/index.ts',
    'src/components/BrowserDesktopView/index.ts',
    'src/components/CircleBadge/index.ts',
    'src/components/CodeBlock/index.ts',
    'src/components/ColorSelector/index.ts',
    'src/components/ConfirmModal/index.ts',
    'src/components/ContextMenu/index.ts',
    'src/components/CopyToClipboardButton/index.ts',
    'src/components/Date/index.ts',
    'src/components/DateField/index.ts',
    'src/components/DatePicker/index.ts',
    'src/components/DottedGrid/index.ts',
    'src/components/EmptyIllustration/index.ts',
    'src/components/EncryptionBadge/index.ts',
    'src/components/EventDot/index.ts',
    'src/components/FileImport/index.ts',
    'src/components/FilterSelect/index.ts',
    'src/components/HourPicker/index.ts',
    'src/components/IconTextWithEndActions/index.ts',
    'src/components/Illustration/index.ts',
    'src/components/InputFieldEndAction/index.ts',
    'src/components/KeyCodeSequence/index.ts',
    'src/components/MobileSearch/index.ts',
    'src/components/MobileSelect/index.ts',
    'src/components/NumberInput/index.ts',
    'src/components/Pagination/index.ts',
    'src/components/PasswordField/index.ts',
    'src/components/Popover/index.ts',
    'src/components/QrCode/index.ts',
    'src/components/RadioButton/index.ts',
    'src/components/RadioCheckbox/index.ts',
    'src/components/ReactPdf/index.ts',
    'src/components/RichTextEditor/index.ts',
    'src/components/SelectBox/index.ts',
    'src/components/SelectedItemToolbar/index.ts',
    'src/components/SelectField/index.ts',
    'src/components/Slider/index.ts',
    'src/components/Steps/index.ts',
    'src/components/Stepper/index.ts',
    'src/components/ThemedBanner/index.ts',
    'src/components/TimeField/index.ts',
    'src/components/TimeZonePicker/index.ts',
    'src/components/VirtualizedList/index.ts',
    'src/components/ButtonGroup/index.ts',
    'src/components/ButtonGroupItem/index.ts',
    'src/components/Chip/index.ts',
    'src/components/Dialog/index.ts',
    'src/components/Dropdown/index.ts',
    'src/components/DropdownItem/index.ts',
    'src/components/DropdownSubmenu/index.ts',
    'src/components/Facepile/index.ts',
    'src/components/IconText/index.ts',
    'src/components/MonoTag/index.ts',
    'src/components/Portal/index.ts',
    'src/components/Select/index.ts',
    'src/components/Skeleton/index.ts',
    'src/components/Surface/index.ts',
    'src/components/Toast/index.ts'
  ],
  splitting: format === 'esm',
  bundle: true,
  platform: 'node',
  format: format,
  outdir: `dist/${format}`,
  sourcemap: true,
  treeShaking: true,
  minify: true,
  loader: { '.woff2': 'file' },
  plugins: [nodeExternalsPlugin(), svgrPlugin(), sassPlugin()],
  watch: !!process.env.WATCH && {
    onRebuild(error) {
      if (error) {
        console.error(`Error while rebuilding ${format} for ${packagejson.name}:`, error);
      } else {
        console.log(`Rebuilt ${format} for ${packagejson.name}`);
      }
    }
  },
  incremental: true
});

if (WATCH) {
  console.log(`Starting watch mode for ${packagejson.name}`);
}

Promise.all([
  esbuild.build(esbuildConf('cjs')),
  esbuild.build(esbuildConf('esm')),
  WATCH ? spawn('npx tsc -b --preserveWatchOutput -w') : spawn('npx tsc -b')
])
  .then(() => {
    console.log(`Built ${packagejson.name}`);
    process.exit(0);
  })
  .catch((e) => {
    console.error(`Build for ${packagejson.name} failed:`, e);
    process.exit(1);
  });
