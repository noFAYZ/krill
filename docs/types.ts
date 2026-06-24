export interface PropDoc {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export interface ExampleDoc {
  title: string;
  code: string;
  /** A real component (not a plain function) so its hooks get their own Fiber node */
  Component: React.FC;
  description?: string;
}

export interface ComponentDoc {
  /** URL-safe slug, also used as the React key in the sidebar/search index */
  slug: string;
  title: string;
  category: string;
  description: string;
  importStatement: string;
  examples: ExampleDoc[];
  props: PropDoc[];
}
