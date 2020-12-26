import { LitElement, TemplateResult } from 'lit-element';
export declare class OvertimeVisualizer extends LitElement {
    wrapper: HTMLDivElement;
    test: HTMLParagraphElement;
    overtimeData: OvertimeData[];
    subtract: number;
    loaded: boolean;
    private textWillOverflow;
    get filteredData(): OvertimeData[];
    static get styles(): import("lit-element").CSSResult;
    createOvertimeBars(): TemplateResult[] | TemplateResult;
    render(): TemplateResult;
    firstUpdated(_changedProperties: Map<string, string | number | unknown>): void;
    getRelativeWidth(value: number): number;
    get valueSum(): number;
}
export interface OvertimeData {
    name: string;
    color: string;
    value: number;
    priority: number;
}
//# sourceMappingURL=overtime-visualizer.d.ts.map