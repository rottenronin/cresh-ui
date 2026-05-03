interface GlobalMountOptions {
  mocks?: { [key: string]: Mock } | ({} extends Mock ? null : never);
  stubs?: { [key: string]: Stub } | ({} extends Stub ? null : never);
  components?:
    | { [key: string]: Component }
    | ({} extends Component ? null : never);
  plugins?: any;
  config?: any;
}
interface MountingOptions {
  attachTo?: HTMLElement | string;
  attrs?: Record<string, unknown>;
  data?: () => {
    //
  } extends Data
    ? any
    : Data extends object
      ? Partial<Data>
      : any;
  props?: (RawProps & Props) | ({} extends Props ? null : never);
  slots?: { [key: string]: Slot } & { default?: Slot };
  global?: GlobalMountOptions;
  shallow?: boolean;
}

declare const cy: Cypress.cy &
  CyEventEmitter & {
    mount: (component: Component, options: MountingOptions) => void;
    vue: typeof Cypress.vueWrapper;
  };

// unable to recognize cypress sinon-chai expect keyword
declare const expect: any;
