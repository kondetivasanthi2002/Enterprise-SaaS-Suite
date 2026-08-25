export interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

export class ButtonComponent {
  public static render(props: ButtonProps): string {
    const variantClass = props.variant || "primary";
    const sizeClass = props.size || "md";
    const disabledAttr = props.disabled ? "disabled" : "";

    return `<button class="btn btn-${variantClass} btn-${sizeClass}" ${disabledAttr}>
      ${props.label}
    </button>`;
  }
}
