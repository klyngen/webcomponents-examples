import {query, css, html, customElement, LitElement, property, TemplateResult} from 'lit-element';

@customElement("overtime-visualizer")
export class OvertimeVisualizer extends LitElement {

	@query("#wrapper")
	wrapper: HTMLDivElement;

	@query("#test")
	test: HTMLParagraphElement;

  @property() 
  overtimeData: OvertimeData[] = [];
  
  @property({type: Number})
  subtract = 0;

  loaded = false;

  private textWillOverflow(data: OvertimeData): boolean {
    this.test.innerText = data.name;
    const pixels: number = this.getRelativeWidth(data.value);
    if (pixels < this.test.clientWidth)
      return true;
    return false;
  }

  get filteredData(): OvertimeData[] {
    const sorted = this.overtimeData.sort((a, b) => a.priority - b.priority);

    if (this.overtimeData) {
      let remaining = this.subtract;
      const clones: OvertimeData[] = [];
      
      sorted.forEach(item => {
        const clone = {...item};

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
    return css`
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
    .overtime-component--delete {
      transform: translateX(0);
    }

    `;
  }

  private createOvertimeBars(): TemplateResult[] | TemplateResult {
    if (this.overtimeData && this.wrapper) {
      return this.filteredData
        .map(item => 
             html`<div class="overtime-component" style="width: ${this.getRelativeWidth(item.value)}px">
              <p id="${item.name}">${item.name}</p>
              <div style="background: ${item.color}" class="overtime-component-color-bar">
                ${item.value}
              </div>
             </div>`);
    } else {
      // TODO apply some sort of loading animation
      return html`
        <span>There is no current overtime data</span>
      `;
    }
  }

  render(): TemplateResult {
    return html`
    <p style="position: absolute; visibility: hidden; height: auto; width: auto: white-space: nowrap" id="test"></p>
    <div id="wrapper" class="overtime">
      ${this.createOvertimeBars()}
    </div>
    `;
  }

  firstUpdated(_changedProperties: Map<string, string | number | unknown>) {
    if (this.wrapper) {
      this.requestUpdate();
    }
  }
  
  private getRelativeWidth(value: number): number {
    if (this.wrapper) {
      return this.wrapper.clientWidth * (value / this.valueSum);
    }
    return 0;
  }

  private get valueSum(): number {
    if (this.overtimeData) {
      return this.overtimeData
        .map(item => item.value)
        .reduce((previous: number, current: number, _) => previous+current);
    }
    return 0;
  }
}

export interface OvertimeData {
  name: string;
  color: string;
  value: number;
  priority: number;
}
