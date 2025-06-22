interface HighlightsTableProps {
  data?: unknown;
}

export const HighlightsTable = ({ data }: HighlightsTableProps) => {
  return (
    <div>
      <span>{JSON.stringify(data, null, 2)}</span>
    </div>
  );
};
