import Component from "@/core/component";
import view from "./view";
import stationService from "@/service/stationService";
import { $ } from "@/utils/dom";

class StationForm extends Component {
  constructor(readonly $root: HTMLElement) {
    super();
    this.bindEvents();
  }

  // protected initDom():void{
  //     this.$container = document.createElement('form');
  //     this.$container.id="station-form";
  //     this.$root.appendChild(this.$container);
  // }

  // public bindEvents():void{
  //     this.$container.addEventListener('submit',(e:Event)=>{
  //         e.preventDefault();
  //         const name = $('#station-name',this.$container) as HTMLInputElement;
  //         stationService.add(name.value);
  //         name.value ='';
  //       })
  // }

  // protected componentMount():void{
  //     this.$container.innerHTML=view;
  // }
}

export default StationForm;
