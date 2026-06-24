export interface EmptyIllustrationAction {
  label: string;
  onClick: () => void;
  isHovered?: boolean;
  setIsHovered?: (isHovered: boolean) => void;
}

export interface EmptyIllustrationProps {
  subtitle: string;
  title: string;
  action?: EmptyIllustrationAction;
  /** Custom visual rendered above the title/subtitle; defaults to a generic skeleton list illustration */
  illustration?: React.ReactNode;
}
