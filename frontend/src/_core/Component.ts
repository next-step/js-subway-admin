import {applyDomDiff, observable, observe} from "./";
import {selectAll} from "@/utils";

interface RegisteredEvent {
  el: HTMLElement;
  eventType: string;
  callback: (e: Event) => void;
  constructor: { new(...args): Component };
}

export abstract class Component<State = {}, Props = {}> {

  private static readonly eventMap: RegisteredEvent[] = [];

  protected $state: State = {} as State;
  protected $components: Record<string, Component | Component[]> = {};

  constructor(
    protected readonly $target: HTMLElement,
    protected readonly $props: Props = {} as Props,
  ) {
    this.lifeCycle();
  }

  private async lifeCycle() {
    await this.setup();
    this.$state = observable<State>(this.$state!);
    observe(() => this.render());
    this.mounted();
  }
  protected setup() {}
  protected mounted() {}
  protected updated() {}
  protected initChildComponent(el: HTMLElement, componentName: string) { }
  protected abstract template(): string;
  protected setEvent() {}

  protected addEvent(eventType: string, selector: string, callback: (e: Event) => void) {

    const { constructor } = Object.getPrototypeOf(this);

    selectAll(selector, this.$target)
      .forEach(el => {

        const registered = Component.eventMap.find(v => (
          v.el === el &&
          v.eventType === eventType &&
          v.callback.toString() === callback.toString() &&
          v.constructor === constructor
        ));

        if (registered) {
          el.removeEventListener(eventType, registered.callback);
          Component.eventMap.splice(Component.eventMap.indexOf(registered), 1);
        }

        el.addEventListener(eventType, callback);
        Component.eventMap.push({ el, eventType, constructor, callback });

      });
  }

  public render() {
    this.$components = {};

    const $target = this.$target.cloneNode(true) as HTMLElement;
    $target.innerHTML = this.template().trim();

    applyDomDiff(this.$target, $target);

    this.$target.querySelectorAll('[data-component]')
                .forEach(el => this.setupChildComponent(el));

    this.setEvent();
    this.updated();
  }

  private setupChildComponent(el: Element) {
    if (!(el instanceof HTMLElement)) return;
    if (!this.initChildComponent) return;

    const name: string = el.dataset.component!;
    const childComponent = this.initChildComponent(el, name) as Component | undefined;
    if (!childComponent) return;

    const {$components} = this;
    if (!$components[name]) {
      $components[name] = childComponent;
      return;
    }
    if ($components[name] instanceof Component) {
      $components[name] = [
        $components[name] as Component,
        childComponent
      ];
      return;
    }
    if (Array.isArray($components[name])) {
      ($components[name] as Component[]).push(childComponent);
      return;
    }
  }

 }
