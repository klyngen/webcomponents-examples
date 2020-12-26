var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { query, css, html, customElement, LitElement, property } from 'lit-element';
let OvertimeVisualizer = class OvertimeVisualizer extends LitElement {
    constructor() {
        super(...arguments);
        this.overtimeData = [];
        this.subtract = 0;
        this.loaded = false;
    }
    textWillOverflow(data) {
        this.test.innerText = data.name;
        const pixels = this.getRelativeWidth(data.value);
        if (pixels < this.test.clientWidth)
            return true;
        return false;
    }
    get filteredData() {
        const sorted = this.overtimeData.sort((a, b) => a.priority - b.priority);
        if (this.overtimeData) {
            let remaining = this.subtract;
            const clones = [];
            sorted.forEach(item => {
                const clone = Object.assign({}, item);
                if (clone.value >= remaining) {
                    clone.value -= remaining;
                    remaining = 0;
                }
                if (clone.value < remaining) {
                    remaining -= item.value;
                    clone.value = 0;
                }
                if (this.textWillOverflow(clone)) {
                    clone.name = clone.name[0];
                }
                if (clone.value > 0)
                    clones.push(clone);
            });
            return clones;
        }
        return [];
    }
    static get styles() {
        return css `
    .overtime {
      display: flex;
    }

    .overtime-component-color-bar {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      
    }

    .overtime-component p {
      text-align: center;
      width: 100%;
      margin-bottom: 5px;
    }

    .overtime-component {
      transition: width 0.5s;
    }
    `;
    }
    createOvertimeBars() {
        if (this.overtimeData && this.wrapper) {
            return this.filteredData
                .map(item => html `<div class="overtime-component" style="width: ${this.getRelativeWidth(item.value)}px">
              <p id="${item.name}">${item.name}</p>
              <div style="background: ${item.color}" class="overtime-component-color-bar">
                ${item.value}
              </div>
             </div>`);
        }
        else {
            // TODO apply some sort of loading animation
            return html `
        <span>There is no current overtime data</span>
      `;
        }
    }
    render() {
        return html `
    <p style="position: absolute; visibility: hidden; height: auto; width: auto: white-space: nowrap" id="test"></p>
    <div id="wrapper" class="overtime">
      ${this.createOvertimeBars()}
    </div>
    `;
    }
    firstUpdated(_changedProperties) {
        if (this.wrapper) {
            this.requestUpdate();
        }
    }
    getRelativeWidth(value) {
        if (this.wrapper) {
            return this.wrapper.clientWidth * (value / this.valueSum);
        }
        return 0;
    }
    get valueSum() {
        if (this.overtimeData) {
            return this.overtimeData
                .map(item => item.value)
                .reduce((previous, current, _) => previous + current);
        }
        return 0;
    }
};
__decorate([
    query("#wrapper")
], OvertimeVisualizer.prototype, "wrapper", void 0);
__decorate([
    query("#test")
], OvertimeVisualizer.prototype, "test", void 0);
__decorate([
    property()
], OvertimeVisualizer.prototype, "overtimeData", void 0);
__decorate([
    property({ type: Number })
], OvertimeVisualizer.prototype, "subtract", void 0);
OvertimeVisualizer = __decorate([
    customElement("overtime-visualizer")
], OvertimeVisualizer);
export { OvertimeVisualizer };
//# sourceMappingURL=overtime-visualizer.js.map