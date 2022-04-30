import React, { Component } from "react";

export interface DropdownDatePickerOptionRenderer {
  value: number;
  title: string;
}

export interface DropdownDatePickerOptionProps {
  type: "date" | "month" | "year";
  renderer: DropdownDatePickerOptionRenderer[];
}

export default class DropdownDatePickerOption extends Component<
  DropdownDatePickerOptionProps, {}
> {
  render() {
    return <>
      {
        this.props.renderer.map((v, i) => <option
          key={`${i}_dr_${this.props.type}`}
          value={v.value}
        >
          {v.title}
        </option>)
      }
    </>
  }
}