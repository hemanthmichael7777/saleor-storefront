import React from "react";
import { ITileOption } from "@types";

export interface IProps {
  name: string;
  content?: React.ReactNode;
  value?: React.InputHTMLAttributes<any>["value"];
  label?: string;
  options: ITileOption[];
  selectedOptions?: string[];
  disabledOptions?: string[];
  onSelect: (value: string) => void;
  disabled: boolean;
  tSize?: string;
}
