import {applyDomDiff, observable, observe} from "./";
import {selectAll} from "@/utils";

interface RegisteredEvent {
  target: HTMLElement;
  eventType: string;
  selector: string;
  callback: string;
}

export abstract class Component<State = {}, Props = {}> {

  private static readonly registeredEvents: RegisteredEvent[] = [];

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
    this.setEvent();
    this.mounted();
  }
  protected setup() {}
  protected mounted() {}
  protected updated() {}
  protected initChildComponent(el: HTMLElement, componentName: string) { }
  protected abstract template(): string;
  protected setEvent() {}

  protected addEvent(eventType: string, selector: string, callback: (e: Event) => void) {
    if (Component.registeredEvents.find(v => (
      v.target === this.$target &&
      v.eventType === eventType &&
      v.selector === selector &&
      v.callback === callback.toString()
    ))) return;

    this.$target.addEventListener(eventType, (e) => {
      const target = e.target as HTMLElement;
      const currentTarget = e.currentTarget as HTMLElement;
      const checked = target.closest(selector) || [ ...currentTarget.querySelectorAll(selector) ].includes(target);
      if (!checked) return;
      callback(e);
    });
    
    Component.registeredEvents.push({
      target: this.$target,
      eventType: eventType,
      selector: selector,
      callback: callback.toString(),
    });

    // selectAll(selector, this.$target)
    //   .forEach(el => {
    //     el.removeEventListener(eventType, callback);
    //     el.addEventListener(eventType, callback);
    //   });
  }

  private render() {
    this.$components = {};

    const $target = this.$target.cloneNode(true) as HTMLElement;
    $target.innerHTML = this.template();

    applyDomDiff(this.$target, $target);

    this.$target.querySelectorAll('[data-component]')
                .forEach(el => this.setupChildComponent(el));

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
