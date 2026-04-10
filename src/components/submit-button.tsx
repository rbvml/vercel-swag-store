"use client";

import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  pendingLabel?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export default function SubmitButton({
  children,
  pendingLabel,
  disabled,
  className,
}: Props) {
  const { pending } = useFormStatus();
  const isDisabled = disabled || pending;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={className}
    >
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}
