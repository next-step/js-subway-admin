import {applyDomDiff, observable, observe} from "./";
import {selectAll} from "@/utils";


export abstract class Component<State = {}, Props = {}> {

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

    selectAll(selector, this.$target)
      .forEach(el => {
        el.removeEventListener(eventType, callback);
        el.addEventListener(eventType, callback);
      });
  }

  public render() {
    this.$components = {};

    const $target = this.$target.cloneNode(true) as HTMLElement;
    $target.innerHTML = this.template();

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
