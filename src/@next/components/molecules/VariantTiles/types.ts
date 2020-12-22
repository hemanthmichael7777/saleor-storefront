import React from "react";
import { ISelectOption } from "@types";

export interface IProps {
  name: string;
  content?: React.ReactNode;
  value?: React.InputHTMLAttributes<any>["value"];
  label?: string;
  options: ISelectOption[];
  selectedOptions?: string[];
  disabledOptions?: string[];
  onSelect: (value: string) => void;
  disabled: boolean;
}
