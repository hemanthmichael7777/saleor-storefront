export interface IProps {
    children: React.ReactNode;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    onHover?: () => void;
    tSize?: string;
}