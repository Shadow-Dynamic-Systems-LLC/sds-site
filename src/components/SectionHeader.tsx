interface SectionHeaderProps {
  path: string;
  title: string;
}

export function SectionHeader({ path, title }: SectionHeaderProps) {
  return (
    <h2 className="section-header">
      <span className="section-path">{path}</span>
      <span className="section-title">{title}</span>
    </h2>
  );
}
